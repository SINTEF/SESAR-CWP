# Brain (Team Assistant Brain) - Algorithm Documentation

## Overview

The Brain component calculates the **Autonomy Profile (AP)** for air traffic control operations based on multiple data sources. The AP value determines the level of automation, with two possible outputs: **AP1** (lower automation) or **AP2** (higher automation).

## Current Algorithm

### Step 1: Calculate Task Load (TL)

Task load is a composite metric normalized to **0-1**, averaging three factors:

```
TL = (numberOfFlights / maxNumberOfFlights
      + numberOfRequestsLast30s / maxNumberOfRequestsPer30s
      + numberOfConflicts / maxNumberOfConflicts) / 3
```

**Inputs:**
- `numberOfFlights`: Current aircraft count from `aircraftStore.aircrafts.size`
- `numberOfRequestsLast30s`: ⚠️ **NOT IMPLEMENTED** - Currently returns 0, future: will be provided by IIS or removed entirely
- `numberOfConflicts`: Sum of STCA, MTCD, and TCT conflicts

**Configuration (defaults):**
- `maxNumberOfFlights`: 100
- `maxNumberOfRequestsPer30s`: 10
- `maxNumberOfConflicts`: 20

### Step 2: Calculate Dynamic Weights

**Alpha (task load weight):**
```
alpha = 3 - beta - delta
```
This ensures task load always has influence (alpha ranges 1-3), with higher weight when WL and ISA reliability are low.

**Beta (agent reliability):**
```
beta = reliabilityAgent (from MQTT, range 0-1)
```

**Delta (ISA time decay):**
```
delta = max(0, 1 - ageInSeconds / 60)
where ageInSeconds = simulatorStore.timestamp - timestampISA
```
Linear decay from 1.0 (fresh) to 0.0 (60 seconds old).

**Gamma (urgency weight):**
```
gamma = 1.0 (fixed constant)
```

### Step 3: Compute AP

```
computedAP = alpha * TL + beta * WL + delta * ISA + gamma * urgency
```

**Inputs:**
- `TL`: Task load (0-1, from step 1)
- `WL`: Agent workload (0 or 1, from MQTT)
- `ISA`: ISA workload (normalized 0-1, raw value / 5)
- `urgency`: ⚠️ **NOT IMPLEMENTED** - Currently always 0

**Output:** Value in range **0-4**

### Step 4: Normalize AP

```
normalizedAP = computedAP / (3 + urgency)
```

**Output:** Value in range **0-1**

### Step 5: Threshold to Get Final AP

```
if normalizedAP > swapValue:
    reportedAP = 2
else:
    reportedAP = 1
```

**Configuration:**
- `swapValue`: Default 0.5 (configurable)

## Data Sources

### MQTT Topics

**TAS/{clientId}/WorkloadUpdate:**
- **Agent messages:** `{ workload: 0|1, reliability: 0-1, source: "Agent", timestamp }`
- **ISA messages:** `{ workload: 0-5, reliability: 0-1, source: "ISA", timestamp }`

### Local Stores

- **Flights:** `aircraftStore.aircrafts.size`
- **Conflicts:** `aircraftStore.stcaConflictIds + mtcdConflictIds + tctConflictIds`
- **Simulation time:** `simulatorStore.timestamp` (Unix timestamp in seconds)

## Missing Features

### 🚧 Not Yet Implemented

1. **Request Tracking (30-second window)**
   - **Status:** Placeholder returns 0
   - **Impact:** Task load calculation missing requests factor
   - **Future:** Will be provided by IIS or removed entirely

2. **Weather Urgency Detection**
   - **Status:** Always returns 0
   - **Impact:** Cannot trigger AP2 based on weather requests
   - **Implementation needed:** Team Assistant needs to support weather request type, then check `aircraftStore.teamAssistantRequest` for weather-type entries

## Key Algorithm Features

1. **Dynamic Alpha Weighting:** Task load weight increases (up to 3x) when workload/ISA reliability is low
2. **Composite Task Load:** Combines flights, requests, and conflicts for comprehensive assessment
3. **Time-Aware ISA:** ISA data decays over 60 seconds, reducing stale data influence
4. **Normalization:** All inputs and outputs are normalized for consistent scaling
5. **Configurable Threshold:** Swap value can be adjusted to fine-tune AP1/AP2 boundary
6. **Error Detection:** Displays error state when data is missing or stale

## Error Handling

The Brain system includes error detection via the `hasError` computed property, which returns `true` when:
- No Agent workload data has been received yet
- No ISA workload data has been received yet
- ISA data is completely stale (older than 60 seconds, delta = 0)

When an error is detected, the BrainIndicator displays a red "ERROR" badge instead of AP1/AP2.

## Components

- **BrainStore** (`/src/model/BrainStore.ts`): MobX store with all algorithm logic
- **BrainIndicator** (`BrainIndicator.tsx`): Small badge UI component showing "AP1", "AP2", or "ERROR" (red)

## Example Scenarios

### Scenario 1: High Traffic, No Workload Data
- Flights: 80/100 → TL factor = 0.8
- Requests: 0/10 → TL factor = 0.0
- Conflicts: 5/20 → TL factor = 0.25
- **TL = 0.35**
- Beta = 0 (no Agent data), Delta = 0 (no ISA data)
- Alpha = 3 - 0 - 0 = **3**
- ComputedAP = 3 * 0.35 = **1.05**
- NormalizedAP = 1.05 / 3 = **0.35**
- **Result: AP1** (below 0.5 threshold)

### Scenario 2: Moderate Traffic, High Workload
- TL = 0.4
- WL = 1, Beta = 0.9 (high Agent reliability)
- ISA = 0.8, Delta = 1.0 (fresh ISA data)
- Alpha = 3 - 0.9 - 1.0 = **1.1**
- ComputedAP = 1.1 * 0.4 + 0.9 * 1 + 1.0 * 0.8 = **2.14**
- NormalizedAP = 2.14 / 3 = **0.71**
- **Result: AP2** (above 0.5 threshold)

## Configuration

Default values can be adjusted via store actions:
- `brainStore.setMaxNumberOfFlights(value)`
- `brainStore.setMaxNumberOfRequestsPer30s(value)`
- `brainStore.setMaxNumberOfConflicts(value)`
- `brainStore.setSwapValue(value)` (0-1 range)

## References

- Implementation plan: `/workspaces/SESAR-CWP/brain-plan.md`
- Store implementation: `/workspaces/SESAR-CWP/src/model/BrainStore.ts`
