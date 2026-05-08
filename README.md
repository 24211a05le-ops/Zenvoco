# Zenvoco

**Zenvoco** is an AI-powered communication analysis platform designed to help students refine their speaking and communication skills. By leveraging Google Gemini (GenAI) and AssemblyAI (Speech-to-Text), Zenvoco provides real-time feedback, performance metrics, and personalized practice modes to build fearless communication.

[![Frontend – Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://zenvoco.vercel.app)
[![Backend – FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://zenvoco.onrender.com/docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎙️ **Real-time Speech Analysis** | Audio transcription and metrics extraction via AssemblyAI (WPM, fluency, lexical diversity) |
| 🤖 **GenAI Feedback** | Personalized coaching powered by Google Gemini with a weighted Confidence Index formula |
| 📊 **Progress Dashboard** | Interactive Chart.js graphs tracking confidence score trends across sessions |
| 🎓 **Viva Simulation** | Multi-question AI mock interview with per-question and aggregate scoring |
| 📖 **Learn Mode** | Guided frameworks for self-introductions, interviews (STAR), presentations, and vivas |
| 🎧 **Listen & Observe** | Audio examples with transcripts and technique breakdowns |
| 🎯 **Daily Tasks & Streaks** | Gamified daily speaking challenges with streak tracking |
| 🌓 **Dark/Light Mode** | Premium responsive UI with Tailwind CSS and class-based theme toggle |
| 🔒 **Secure Auth** | JWT authentication with PBKDF2-HMAC-SHA256 password hashing (bcrypt legacy support) |
| 👤 **User Profiles** | Editable profiles with purpose, level, and feedback submission |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [React](https://reactjs.org/) | 19.2 | UI framework |
| [Vite](https://vitejs.dev/) | 7.3 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Utility-first styling |
| [Chart.js](https://www.chartjs.org/) + react-chartjs-2 | 4.5 / 5.3 | Data visualization |
| [React Router](https://reactrouter.com/) | 7.13 | Client-side routing |
| [Axios](https://axios-http.com/) | 1.13 | HTTP client |
| [Lucide React](https://lucide.dev/) | 1.8 | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | latest | REST API framework |
| [Motor](https://motor.readthedocs.io/) | latest | Async MongoDB driver |
| [MongoDB Atlas](https://www.mongodb.com/) | — | Cloud database |
| [Google Gemini](https://ai.google.dev/) | 0.8.6 | Generative AI speech evaluation |
| [AssemblyAI](https://www.assemblyai.com/) | 0.58 | Speech-to-text transcription |
| [python-jose](https://github.com/mpdavis/python-jose) | latest | JWT token handling |
| [passlib](https://passlib.readthedocs.io/) | latest | Password hashing (PBKDF2) |


---

## 📁 Project Structure

```
Zenvoco/
├── README.md
├── zenvoco-backend/
│   ├── main.py                  # FastAPI app entry point, CORS & middleware
│   ├── database.py              # MongoDB connection & collection definitions
│   ├── requirements.txt         # Python dependencies
│   ├── config/
│   │   └── settings.py          # Environment variable loader
│   ├── auth/
│   │   └── jwt_handler.py       # JWT creation, verification & password hashing
│   ├── models/
│   │   └── schemas.py           # Pydantic request/response models
│   ├── schemas/
│   │   ├── user_schema.py       # User-specific schemas
│   │   └── practice_schema.py   # Practice & analysis schemas
│   ├── routes/
│   │   ├── auth_routes.py       # /auth/register, /auth/login
│   │   ├── practice_routes.py   # /practice/start, /practice/submit
│   │   ├── speech_routes.py     # /speech/analyze (one-off analysis)
│   │   ├── dashboard_routes.py  # /dashboard/user, /dashboard/platform/stats
│   │   ├── progress_routes.py   # /progress/, /progress/graph (SVG)
│   │   ├── user_routes.py       # /user/profile (GET/PUT), /user/feedback
│   │   └── task_routes.py       # /tasks/today, /tasks/submit
│   ├── services/
│   │   ├── speech_service.py    # AssemblyAI transcription + Gemini AI feedback pipeline
│   │   └── progress_graph_service.py  # Server-side SVG graph generator
│   └── utils/
│       └── helpers.py           # Utility placeholder
│
└── zenvoco-frontend/
    ├── index.html               # HTML entry point
    ├── package.json             # Node.js dependencies
    ├── vite.config.js           # Vite configuration
    ├── tailwind.config.js       # Tailwind CSS config (Outfit font, dark mode)
    ├── vercel.json              # Vercel SPA rewrite rules
    ├── public/
    │   ├── logo.png             # App logo
    │   └── audio/               # Listen Mode example audio files
    └── src/
        ├── main.jsx             # React entry (BrowserRouter + ThemeProvider)
        ├── App.jsx              # Route definitions (15 routes)
        ├── index.css            # Global styles
        ├── api/
        │   └── api.js           # Axios instance with JWT & Live Server Key interceptors
        ├── context/
        │   └── ThemeContext.jsx  # Dark/light mode context provider
        ├── components/
        │   ├── Navbar.jsx       # Welcome page navigation bar
        │   ├── AudioInput.jsx   # Reusable mic-record + file-upload component
        │   ├── ThemeToggle.jsx  # Sun/moon theme toggle button
        │   └── ProtectedRoute.jsx  # JWT-based route guard
        ├── layout/
        │   └── DashboardLayout.jsx  # Sidebar layout for authenticated pages
        └── pages/
            ├── Welcome.jsx      # Landing page (11 sections, dynamic stats)
            ├── Login.jsx        # User login
            ├── Register.jsx     # User registration + auto-login
            ├── Onboarding.jsx   # Purpose & level selection (post-registration)
            ├── DailyCheckIn.jsx # Post-login activity selector
            ├── Dashboard.jsx    # Overview with stats, chart & history
            ├── LearnMode.jsx    # Guided learning frameworks (4 topics)
            ├── ListenMode.jsx   # Audio examples with transcripts
            ├── GuidedPractice.jsx  # Topic-based practice with AI analysis
            ├── DailyTask.jsx    # Daily speaking challenges with streak
            ├── VivaSimulation.jsx  # 4-question AI mock interview
            ├── SpeechResult.jsx # Detailed 8-metric analysis result
            ├── Progress.jsx     # Chart.js confidence timeline + history table
            ├── Profile.jsx      # Profile editor + feedback form + logout
            └── Results.jsx      # Compact 3-metric result view
```

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                 │
│  Vercel  ←→  Axios HTTP Client  ←→  JWT Auth + Live Key     │
└───────────────────────────┬─────────────────────────────────┘
                            │ REST API
┌───────────────────────────▼─────────────────────────────────┐
│                   BACKEND (FastAPI + Uvicorn)                │
│  Render.com  ←→  CORS Middleware  ←→  Live Server Key Guard  │
├──────────────┬───────────────────┬──────────────────────────┤
│   Auth       │   Practice        │   Dashboard / Progress   │
│  (JWT+PBKDF2)│  (Audio Pipeline) │  (MongoDB Aggregation)   │
└──────┬───────┴─────────┬─────────┴──────────┬───────────────┘
       │                 │                    │
       ▼                 ▼                    ▼
   MongoDB         AssemblyAI            Google Gemini
   (Motor)         (STT + WPM)          (GenAI Feedback)
```

### AI Pipeline (Speech Analysis Flow)

1. **Audio Upload** → User records/uploads audio via `AudioInput` component
2. **Transcription** → AssemblyAI converts speech to text, extracts WPM, confidence, duration
3. **Lexical Analysis** → Backend calculates lexical diversity (unique/total word ratio)
4. **Fluency Score** → Computed from WPM against ideal range (130–160 WPM)
5. **GenAI Evaluation** → Google Gemini analyzes coherence, vocabulary, engagement, stability
6. **Confidence Index** → Weighted formula: `CI = 0.214F + 0.214P + 0.214V + 0.143C + 0.143S + 0.071E`
7. **Result Storage** → Scores saved to `progress`, `speech_analysis`, and `practice_sessions` collections

---

## 🗄️ Database Collections

| Collection | Purpose |
|---|---|
| `users` | User accounts (name, email, hashed password, purpose, level) |
| `practice_sessions` | Practice session records (topic, transcript, AI feedback, confidence) |
| `speech_analysis` | Granular speech metrics (clarity, filler words, pace, grammar) |
| `progress` | Per-session confidence timeline data for charts |
| `daily_tasks` | Curated daily challenge prompts |
| `feedbacks` | User-submitted feedback and ratings |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **Python** v3.9+
- **MongoDB Atlas** account (free tier works)
- **API Keys**: [AssemblyAI](https://www.assemblyai.com/), [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/24211a05le-ops/Zenvoco.git
cd Zenvoco
```

### 2. Backend Setup

```bash
cd zenvoco-backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `zenvoco-backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_ALGORITHM=HS256
GEMINI_API_KEY=your_google_gemini_key
ASSEMBLYAI_API_KEY=your_assemblyai_key
LIVE_SERVER_API_KEY=your_live_server_key
```

### 3. Frontend Setup

```bash
cd ../zenvoco-frontend
npm install
```

### 4. Run the Application

```bash
# Terminal 1 — Backend (from zenvoco-backend/)
uvicorn main:app --reload

# Terminal 2 — Frontend (from zenvoco-frontend/)
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API Docs**: http://localhost:8000/docs

---

## 🌐 Deployment

| Component | Platform | URL |
|---|---|---|
| Frontend | Vercel | [zenvoco.vercel.app](https://zenvoco.vercel.app) |
| Backend | Render | [zenvoco.onrender.com](https://zenvoco.onrender.com/docs) |
| Database | MongoDB Atlas | Cloud-hosted |

---

## 📈 Communication Metrics

The platform tracks **8 key indicators** using a weighted Confidence Index formula:

| # | Metric | Symbol | Weight | Source |
|---|---|---|---|---|
| 1 | **Confidence Score** | CI | Composite | Weighted formula |
| 2 | **Speech Clarity / Fluency** | F | 0.214 | AssemblyAI WPM |
| 3 | **Pronunciation** | P | 0.214 | AssemblyAI confidence |
| 4 | **Vocabulary / Grammar** | V | 0.214 | Lexical diversity + Gemini |
| 5 | **Content Clarity / Coherence** | C | 0.143 | Gemini evaluation |
| 6 | **Pace / Stability** | S | 0.143 | Gemini evaluation |
| 7 | **Expression / Engagement** | E | 0.071 | Gemini evaluation |
| 8 | **Filler Words** | — | Count | Regex detection |

---

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and receive JWT |

### Practice & Speech
| Method | Endpoint | Description |
|---|---|---|
| POST | `/practice/start` | Create practice session |
| POST | `/practice/submit` | Upload audio for full AI analysis |
| POST | `/speech/analyze` | One-off audio analysis (no session tracking) |

### Dashboard & Progress
| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard/user` | User metrics + history preview |
| GET | `/dashboard/platform/stats` | Public platform statistics |
| GET | `/dashboard/feedbacks` | Latest user feedbacks |
| GET | `/progress/` | Confidence score timeline |
| GET | `/progress/graph` | SVG progress graph |

### User & Tasks
| Method | Endpoint | Description |
|---|---|---|
| GET | `/user/profile` | Get user profile |
| PUT | `/user/profile` | Update profile (name, email, password, purpose, level) |
| POST | `/user/feedback` | Submit feedback with rating |
| GET | `/tasks/today` | Get today's daily task |

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

Developed with ❤️ by [VEGI RAJU ANIL VARMA](https://github.com/24211a05le-ops)
[Y Aishanvi](https://github.com/Aishanvi)
[V Ankitha]()
[V Tanushri sai]()

