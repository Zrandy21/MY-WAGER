# MY WAGER

Full-stack betting platform built with Django (backend) and React + Tailwind CSS (frontend).

## Features
- ✅ Custom bets with friends
- ✅ Group betting, chat, history
- ✅ Stripe integration for Venmo, Apple Pay, Cash App, PayPal
- ✅ Admin dashboard with analytics and exports
- ✅ JWT Auth + optional 2FA
- ✅ Responsive UI with toast notifications

## Setup

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. Create a `.env` file from `.env.example`
4. `python manage.py migrate && python manage.py runserver`

### Frontend
1. `cd frontend`
2. `npm install`
3. Create a `.env` from `.env.example`
4. `npm run dev`

## Deployment
- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Render](https://render.com/), [Railway](https://railway.app/)