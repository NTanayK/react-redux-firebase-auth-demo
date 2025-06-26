# 🧠 React Redux Auth Demo (Classic Redux → RTK + Firebase Login)

This project demonstrates a transition from classic Redux to Redux Toolkit (RTK), along with Google Sign-In using Firebase Authentication.

---

## 🚀 Features

- ✅ Classic Redux login/register (retained for learning comparison)
- ✅ Modern Redux Toolkit with `createAsyncThunk`, slices
- ✅ Persistent auth with `localStorage` + Redux
- ✅ Firebase Google Authentication integration
- ✅ Clean file structure for frontend and backend
- ✅ Secure Django backend API for verifying Firebase ID tokens
- ✅ Environment-based separation (`.env` ignored)

---

## 🔧 Stack

- **Frontend**: React + Redux Toolkit + Tailwind CSS + Firebase
- **Backend**: Django REST Framework + Firebase Admin SDK
- **Auth**: JWT (custom backend tokens), Google Sign-In via Firebase

---

## 📂 Folder Structure

Ecommerce/
├── backend/
│ ├── accounts/ # Django app for auth
│ ├── secrets/ # 🔒 Firebase Admin Key (ignored)
│ ├── manage.py
│ └── venv/ # 🔒 Virtual environment (ignored)
├── frontend/
│ ├── src/
│ │ ├── features/ # Redux Toolkit slices
│ │ ├── firebase.js # Firebase config
│ │ └── components/ # GoogleLoginButton etc.
│ └── public/
├── .gitignore
└── README.md

---

## 📚 Learning Timeline

### ✅ Phase 1: Classic Redux Setup
- Manual reducers and action constants
- Handled user login/register flow

### ✅ Phase 2: Migration to Redux Toolkit
- Introduced `createSlice`, `createAsyncThunk`
- Simplified boilerplate and async flow

### ✅ Phase 3: Google Login with Firebase
- Configured Firebase project
- Enabled Google provider
- Used `signInWithPopup`, retrieved ID token
- Sent to Django backend for user creation + token generation

---

## 🛡️ Security

- `.env` files and Firebase admin credentials are gitignored
- Custom backend JWT used instead of Firebase client SDK persistence
- Avoids storing sensitive data in public repositories

---


🔐 Firebase Setup
Create Firebase project

Enable Google provider

Generate admin SDK JSON key → save in backend/secrets/

Add path in firebase_config.py

💡 Future Ideas
🔐 Add Facebook/GitHub providers

🧪 Unit testing for auth reducers

📦 Convert to monorepo with TurboRepo



## 🛠️ Setup Instructions

### 📦 Frontend (Standalone)

```bash
cd frontend
npm install
npm run dev

### 📦 Backend (Standalone)

cd backend
python -m venv venv
venv\Scripts\activate  # on Windows
pip install -r requirements.txt
python manage.py runserver

⚡ Unified Dev Setup (Root with concurrently)
npm run dev
This runs concurrently to start:

Frontend (cd frontend && npm run dev)

Backend (cd backend && call venv\\Scripts\\activate && python manage.py runserver)

 "scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "concurrently \"cd backend && call venv\\Scripts\\activate && python manage.py runserver\" \"cd frontend && npm run dev\""
  },



