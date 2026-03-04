# 🛡️ GyroPrivacy App

[![Netlify Status](https://api.netlify.com/api/v1/badges/d289dc62-1819-4b68-80f0-8c205ad88df5/deploy-status)](https://gyro-privacy.netlify.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)

> **Live Demo:** [https://gyro-privacy.netlify.app/](https://gyro-privacy.netlify.app/)  
> *(Note: The privacy screen relies on device motion sensors, so for the full experience, please view the live demo on an iOS or Android device!)*

**GyroPrivacy** is a full-stack web application designed to replicate hardware-level privacy screen technology (similar to Samsung's Vision Booster) using pure JavaScript and the `DeviceOrientation` API. 

It dynamically obscures highly sensitive data (like bank balances and confidential briefings) whenever your mobile device is tilted away from a direct viewing angle, preventing shoulder-surfing in public spaces.

---

## ✨ Key Features

- **Hardware-Level Sensor Integration:** Utilizes the gyroscope `gamma` vector data via the HTML5 `DeviceOrientationEvent` API.
- **Dynamic Auto-Calibration:** The custom `useGyroscope` React hook automatically calibrates the "safe viewing angle" baseline when the user first holds the device, guaranteeing a custom fit for every user's natural grip.
- **Targeted Overlays:** Instead of a simple global blur, the app uses localized `SensitiveData` component wrappers that progressively black-out *only* the specific confidential text fields as the tilt angle increases.
- **JWT Authentication:** Features a secure backend built with Node.js and Express to issue JSON Web Tokens and protect the simulated Dashboard routes.
- **Serverless Architecture:** The Express backend has been refactored using `serverless-http` to run efficiently on Netlify Functions, eliminating the need for expensive 24/7 server hosting.
- **Premium UI/UX:** Built with a stunning dark-mode glassmorphism design system using raw CSS.

---

## 🛠️ Tech Stack

### Frontend
- **React.js 19** & **Vite**: Ultra-fast component rendering and development server.
- **Vanilla CSS3**: Beautiful gradients, glassmorphism filters, and smooth CSS transitions.
- **Device APIs**: HTML5 Device Orientation events to tap directly into hardware gyroscopes.

### Backend
- **Node.js** & **Express**: Lightweight REST API to handle authentication and secure data endpoints.
- **JSON Web Tokens (JWT)**: Stateless user authentication.
- **Netlify Serverless Functions**: Effortless, zero-maintenance backend hosting.

---

## 🚀 Running Locally

To run this application on your local network (so you can test it on your physical phone):

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krish1314/gyro-privacy.git
   cd gyro-privacy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the Vite Dev Server & Netlify Proxy**
   Because iOS requires secure contexts (HTTPS) to access motion sensors, the local environment uses `@vitejs/plugin-basic-ssl`.
   
   ```bash
   # Run the server and expose it to your local WiFi network
   npm run dev -- --host
   ```

4. **Test on your phone**
   - Find your Mac's local IP address in the terminal (e.g., `https://192.168.1.X:5173`)
   - Open that URL in Safari on your iPhone.
   - Accept the self-signed certificate warning (`Show Details` -> `Visit Website`).
   - Tap **"Enable Gyroscope"** and log in using the test credentials: `<demo / password123>`

---

## 👨‍💻 Author

Built as a proof-of-concept for exploring hardware sensor fusion within modern progressive web apps.
