# AI Agent Guide

This file provides guidance to AI agents when working with code in this repository.

## Development Commands

### Code Quality

- `npm run lint` - Run Biome linter (`npx @biomejs/biome lint`)
- `npm run typecheck` - TypeScript type checking (`tsc --noEmit`)
- `npm run check` - Run both linter and formatting checks
- `npm run check -- --fix` - Automatically fix linting and formatting issues
- `npm run check -- --fix --unsafe` - Automatically fix unsafe linting and formatting issues (do that on a clean git state)

## Architecture Overview

This is a React-based Air Traffic Control (ATC) Controller Working Position (CWP) application that visualizes and controls aircraft in real-time.

### Core Technologies

- **React 19** with TypeScript
- **MobX** for state management with observables
- **MapLibre GL** (via react-map-gl) for map rendering
- **MQTT** for real-time communication with simulators
- **Protobuf** for message serialization
- **Tailwind CSS v4** with DaisyUI components
- **Vite** as build tool

### State Management Architecture

The application uses MobX stores instantiated in `src/state.ts`:

- **SimulatorStore**: Manages simulation state, time, and playback.
- **AircraftStore**: Tracks all aircraft positions, states, and metadata.
- **AirspaceStore**: Manages volumetric airspace definitions and vertical boundaries.
- **SectorStore**: Manages detailed sector definitions and spatial indexing for point-in-sector lookups.
- **ConfigurationStore**: Handles sector configurations and time-based changes.
- **CWPStore**: UI state including filters, display options, selected aircraft, warning levels, and transient UI interactions (hover, popups).
- **RoleConfigurationStore**: Manages user roles and permissions.
- **FixStore**: Navigation fixes and waypoints data.
- **DistanceLineStore**: Basic distance measurement tools.
- **DatablockStore**: Manages custom datablocks and visual groupings for aircraft coordination (Agenda).
- **TrajectoryPredictionStore**: Calculates and stores predicted aircraft paths and potential conflicts.
- **MapViewportStore**: Manages map viewpoint, zoom levels, and viewport presets.
- **SepQdmStore**: Logic for Separation and Quick Distance Measurement tools.
- **PopupLinesStore**: Manages visual leader lines connecting aircraft markers to their respective popups.
- **AdminStore**: Manages administrative access and password protection for restricted features.

### Key Components Structure

- **Map Component** (`src/components/Map.tsx`): Main map view with aircraft, sectors, and overlays.
- **Aircraft Components**:
  - `AircraftMarker`: Visual representation on map.
  - `AircraftPopup`/`AircraftPopupContent`: Interactive popups for aircraft control.
  - `DraggablePopup`: Draggable interface elements.
- **Specialized Views**:
  - **Agenda** (`src/components/Agenda/`): Timeline visualization for sequencing and conflict management.
  - **Sector Side View** (`src/components/SectorSideView/`): Vertical profile visualization of the airspace and aircraft levels.
  - **Team Assistant** (`src/components/team-assistant/`): Coordination tools and specialized labels for multi-controller workflows.
  - **Conflict Detection Tools** (`src/components/conflict-detection-tools/`): STCA (Short-Term Conflict Alert) and TCT (Tactical Conflict Tool) visualizations.
- **Sector Components**: Polygon rendering for airspace sectors.
- **Control Panels**: Altitude filters, speed vectors, controller selection modals, and viewport presets.

### MQTT Communication

The app communicates with an ATC simulator via MQTT:

- Subscribers in `src/mqtt-client/subscribers.ts` handle incoming messages.
- Publishers in `src/mqtt-client/publishers.ts` send control commands.
- Topics defined in `src/mqtt-client/topics.ts`.
- Messages are serialized using Protobuf (see `src/proto/`).

## Code Style Guidelines

- Linting via Biome (config in `biome.json`)
- Use `biome-ignore` comments when necessary with explanations
- TypeScript strict mode enabled
- Prefer const assertions and explicit types
- Component files use `.tsx`, utilities use `.ts`

## Important Notes

- The protobuf files in `src/proto/` are generated - do not edit manually
- Use absolute imports from `src/` directory
- MobX observables require `observer` wrapper for React components
- Map interactions use MapLibre GL events

## Code Quality and Best Practices

- This project is a prototype used for scientific research in controlled experiments, and it's not intended to be used in real ATC environments.
- We follow best practices for code quality, but we don't over-engineer the solution.
- We adhere to the KISS concept (Keep It Simple, Stupid).
- Overall, the source code should be "good enough".
- However, we do care about high quality code and maintainability. It's about finding the right balance.
- Use the type system effectively, it's helpful. Avoid `any` or `unknown`.
- Use Tailwind CSS utility classes for styling.
- Prefer composition to inheritance.
- Favour immutability where possible.
- Document the "why".
- Run the linter and type checkers to ensure code quality.
- A few console.log statements are acceptable during development and debugging, don't remove them unless requested.
