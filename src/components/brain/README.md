# Brain (Team Assistant) - Algorithm Documentation

## Overview

Calculates **Autonomy Profile (AP)** for air traffic control: **AP1** (lower automation), **AP2** (higher automation), or **null** (no data).

## Algorithm

**Formula:**
```
computedAP = alpha * TL + beta * WL + delta * ISA + gamma * urgency
normalizedAP = computedAP / (3 + urgency)
AP = normalizedAP > swapValue ? 2 : 1
```

**Weights (dynamic):**
- `alpha = 3 - beta - delta` (task load weight, range 1-3)
- `beta = reliabilityAgent` (from MQTT, 0-1)
- `delta = max(0, 1 - age/300)` (ISA time decay, 5min window)
- `gamma = 1.0` (urgency weight, fixed)

**Inputs:**
- `TL` (task load): Average of flights/max, requests/max, conflicts/max
- `WL` (workload): Agent workload from MQTT (0 or 1)
- `ISA`: ISA workload from MQTT (raw value / 5, normalized to 0-1)
- `urgency`: Currently 0 (weather requests not implemented)

**Threshold:**
- `swapValue = 0.5` (configurable)

## Data Sources

**MQTT:** `TAS/{clientId}/WorkloadUpdate`
- Agent: `{ workload: 0|1, reliability: 0-1, source: "Agent", timestamp }`
- ISA: `{ workload: 0-5, reliability: 0-1, source: "ISA", timestamp }`

**Local:**
- Flights: `aircraftStore.aircrafts.size`
- Conflicts: STCA + MTCD + TCT counts
- Time: `simulatorStore.timestamp`

## Manual Override

Admin can manually set AP to 1 or 2, overriding calculation. Set to Auto to use computed value.

## Error Handling

Returns `null` when required MQTT data missing (Agent or ISA workload/reliability/timestamp). Manual override still works regardless of data availability.

## Components

- **BrainStore** ([BrainStore.ts](../../model/BrainStore.ts)): MobX store with algorithm
- **BrainIndicator** ([BrainIndicator.tsx](BrainIndicator.tsx)): Badge showing AP (green=1, blue=2, red=error)
- **BrainPanel** ([BrainPanel.tsx](BrainPanel.tsx)): Admin panel for manual control

## Not Yet Implemented

- Request tracking (30s window) - placeholder returns 0
- Weather urgency detection - placeholder returns 0
