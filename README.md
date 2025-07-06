# 🌱 EcoLift

EcoLift is a lightweight, eco-conscious ride-booking prototype built with React. It’s designed for quick testing in smaller cities — offering both economic and environmental benefits through features like basic ride requests and a future-ready carpooling model.

The app promotes green mobility by using low-emission vehicles and encouraging ride sharing. Drivers can pick up multiple passengers along the way — if the first rider agrees — reducing both traffic and cost.

---

## 🚀 How to Run the Project

To get the app up and running locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ecolift.git
cd ecolift
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app in your browser

Visit: `http://localhost:5173`

You’ll land on the login page where you can register as either a **passenger** or a **driver**.

---

## 📌 Assumptions Made

- The app uses **mocked login** — users only provide a name and email (no password).
- Users can be either a **passenger** or a **driver** — they cannot switch roles after signup.
- Each user can only have **one active ride** at any given time.
- **No real backend** is used — all data is stored in the browser using `localStorage`.
- Location input is **free-text only** (e.g., "Mall Road", "Airport") — there’s no map integration.
- Drivers are marked as **available or unavailable** automatically based on ride status.
- Carpooling logic is not implemented yet, but the concept is built into the app’s vision:
  - The first passenger must approve before others can join their ride.
  - The app will match passengers going in a similar direction.

---

## 💡 Improvements If I Had More Time

Given more time, here's what I would add:

- 🔁 **Implement carpooling logic** with live passenger matching and approval flow.
- 🌐 **Add a backend API** (e.g., Node.js or Firebase) for centralized data, authentication, and analytics.
- 🎨 **Polish the UI/UX** with smoother transitions, status badges, and responsive design.
- 🔒 **User authentication** using Firebase Auth or JWT tokens.
- 🗺️ **Map integration** for visualizing pickup/drop points and distance.
- 📊 **Admin dashboard** to monitor driver/passenger activity and ride history.
- 🚀 **Deploy the app publicly** using Vercel or Netlify, with environment config.
