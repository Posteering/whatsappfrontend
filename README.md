# VIOLET Vendor Dashboard

The vendor-facing React dashboard for the **VIOLET WhatsApp AI** platform.

The backend is already live at  
`https://whatsappbackend-production-9254.up.railway.app`

You do **not** need to run a backend yourself. Just fork this, deploy it, and log in.

---

## How to Log In

You need two things — both come from the VIOLET platform when your vendor account is created via WhatsApp:

| Field | Where to find it |
|---|---|
| **Vendor ID** | Sent to you by the VIOLET admin after registration |
| **WhatsApp Phone Number** | The phone number you used to register with VIOLET |

> If you haven't registered yet, message the VIOLET WhatsApp bot to get started.

---

## Deploy to Vercel (Recommended — 3 minutes)

1. Fork this repo on GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your fork
3. Set the **Root Directory** to `frontend`
4. During setup, add this **Environment Variable**:

   | Name | Value |
   |---|---|
   | `VITE_API_BASE` | `https://whatsappbackend-production-9254.up.railway.app/api/v1` |

5. Click **Deploy**. Done.

---

## Deploy to Netlify

1. Fork this repo
2. Go to [netlify.com](https://netlify.com) → **Add new site** → import from GitHub
3. Set **Base directory**: `frontend`  
   Set **Build command**: `npm run build`  
   Set **Publish directory**: `frontend/dist`
4. Under **Environment variables**, add:

   | Key | Value |
   |---|---|
   | `VITE_API_BASE` | `https://whatsappbackend-production-9254.up.railway.app/api/v1` |

5. Click **Deploy**. Done.

---

## Run Locally

```bash
git clone https://github.com/your-fork/violet-bot.git
cd violet-bot/frontend

cp .env.example .env
# VITE_API_BASE is already set to the live backend — no changes needed

npm install
npm run dev
```

Open `http://localhost:5173` and log in with your Vendor ID and phone number.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Icons | React Icons |
| State | React Hooks + localStorage |
| API | Fetch (via `authService.js`) |
