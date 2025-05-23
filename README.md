# 💸 Project Cost Tracker 
(https://project-cost-tracker-karkhana.netlify.app/login)

A minimal ReactJs responsive web app for tracking project expenses, built with **Redux**, **Chakra UI**, **Firebase (Auth + Firestore)**, **localStorage** persistence and **cost sorting** .

---

## 📁 Folder Structure

```
project-cost-tracker/
├── public/                 # Static assets
├── src/                    # Application source code
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page-level components
│   ├── redux/              # Redux store, slices, actions
│   ├── firebase/           # Firebase config and services
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
│   └── store.js 
├── index.html              # HTML template
├── package.json            # Project metadata and scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

---

## 📊 Data Structure

### Items Table
- **Name**: e.g., `"Laptop"`, `"Monitor"`
- **Cost**: Numeric value

### Other Costs Table
- **Description**: e.g., `"Shipping"`, `"Tax"`
- **Amount**: Numeric value

---

## ✨ Features

- Add, edit, and delete items and other costs
- Display total project cost (items + other costs)
- State management with Redux
- UI built using Chakra UI
- Data storage in Firebase Firestore
- Firebase Authentication for user management
- Persist data with `localStorage`
- Add cost filters and sorting options

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/TechKumarNitish/project-cost-tracker-karkhana-1-round-internship-assignement.git
cd project-cost-tracker-karkhana-1-round-internship-assignement
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a `.env` file in the root directory and add:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start the Development Server

```bash
npm run dev
```

App runs at: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Technologies Used

- React
- Vite
- Redux Toolkit
- Chakra UI
- Firebase (Auth + Firestore)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- Inspired by Karkhana's internship assignment  
- Developed by [TechKumarNitish](https://github.com/TechKumarNitish)
