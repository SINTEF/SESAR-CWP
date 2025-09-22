# SESAR Controller Working Position

A React-based Air Traffic Control (ATC) Controller Working Position (CWP) application that visualizes and controls aircraft in real-time. This prototype is used for scientific research in controlled experiments.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variable (create .env.local file)
echo "VITE_MQTT_BROKER_URL=ws://localhost:9001/mqtt" > .env.local

# Start development server
npm start
```

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MQTT broker running (for real-time aircraft data)

## 🛠️ Development

### Available Scripts

```bash
npm start           # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run Biome linter
npm run typecheck   # TypeScript type checking
npm run protoc      # Update protobuf TypeScript files
```

### Environment Configuration

Create a `.env.local` file with:

```env
VITE_MQTT_BROKER_URL=ws://localhost:9001/mqtt  # For local development
# or
VITE_MQTT_BROKER_URL=ws://your-simulator-url/mqtt  # For remote simulator
```

### Local MQTT Broker

For development, you can use [Mosquitto](https://mosquitto.org/) as a local MQTT broker:

```bash
# Install Mosquitto (if not already installed)
brew install mosquitto  # macOS
sudo apt-get install mosquitto  # Debian/Ubuntu
```

You will have to edit the Mosquitto configuration to enable WebSocket support, enable anonymous access for localhost, and unleash the broker as the simulator sends many MQTT messages.

```conf
listener 1883 127.0.0.1
protocol mqtt

listener 9001 127.0.0.1
protocol websockets

max_inflight_messages 0
max_queued_messages 0

allow_anonymous true
```

Then you can start the broker:

```bash
mosquitto -c mosquitto.conf
```

## 🏗️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **State Management**: MobX
- **Map Rendering**: MapLibre GL (react-map-gl)
- **Real-time Communication**: MQTT + Protobuf
- **Styling**: Tailwind CSS + DaisyUI
- **Build Tool**: Vite
- **Code Quality**: Biome linter

## 📝 Code Quality

We use [Biome](https://biomejs.dev/) for linting:

```bash
npm run lint              # Check for issues
npm run lint -- --fix     # Auto-fix safe issues
```

VS Code Extension: Install `biomejs.biome` for IDE integration

## 📚 Documentation

- See [AGENTS.md](./AGENTS.md) for AI agent guidance and detailed architecture information
- Protobuf message definitions in `src/proto/`

## ⚠️ Important Notes

- This is a research prototype, not for production ATC use
