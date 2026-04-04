# 🚀 CoinMap – Crypto Portfolio Tracker & Analytics

CoinMap is a full-stack MERN application that enables users to track cryptocurrency holdings, fetch live market data from CoinGecko, and compute portfolio analytics through a backend-driven calculation engine.

It combines secure authentication, optimized data fetching, and interactive visualizations to provide a centralized view of crypto investments.

<div align="center">
 
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blueviolet?style=for-the-badge)](https://coinmap-provide.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Rohit-011205/CoinMap)

</div>

---

## 💡 Problem

Tracking crypto across multiple platforms leads to:
- Fragmented portfolio visibility  
- No unified profit/loss tracking  
- Difficulty analyzing performance over time  

---

## ✅ Solution

CoinMap provides:
- A single portfolio dashboard  
- Backend-driven P&L and valuation engine  
- Near real-time updates using polling + caching  
- Independent tracking (no exchange dependency)  

---

# 📸 Screenshots

## 📊 Dashboard Overview
<img width="1919" src="https://github.com/user-attachments/assets/59363a4c-c5e2-4729-8eae-82752fa4d8ea" />
<img width="1919" src="https://github.com/user-attachments/assets/a5369819-84e6-423b-a8fb-a43ef3921706" />
<img width="1919" src="https://github.com/user-attachments/assets/30d4c3d5-b0b3-47a0-814d-d3f829cb64bb" />

---

## 📈 Charts & Analytics
<img width="1919" src="https://github.com/user-attachments/assets/829a09a3-e424-4e34-a219-2dfa0d051eb0" />

---

## 💼 Holdings Management
<img width="1919" src="https://github.com/user-attachments/assets/57e778bb-d6e5-43ae-b09e-6835981bc2f8" />

---

## 🌍 Market Exploration
<img width="1919" src="https://github.com/user-attachments/assets/eef69d32-ff22-43c3-bafb-92fa30f19bc9" />
<img width="1919" src="https://github.com/user-attachments/assets/3bf7ae73-4a64-415c-9778-1f59104e556b" />

---

## 🔐 Authentication
<img width="1919" src="https://github.com/user-attachments/assets/93331c14-7f12-4023-a6b4-5e4aeaedc599" />

---

## 📄 CSV Export
<img width="1919" src="https://github.com/user-attachments/assets/bf783333-2d03-4f9f-832a-84dfe6947cbf" />
<img width="1919" src="https://github.com/user-attachments/assets/4805622a-5c49-4e3d-b045-536d585c69e0" />

---

## ⚡ Key Features

- 📊 Portfolio valuation with profit/loss tracking  
- 📈 Interactive charts (Recharts)  
- 💼 Holdings CRUD with average price tracking  
- 🌍 Live market data integration  
- 🔐 JWT-based authentication (HTTP-only cookies)  
- 📄 CSV export for portfolio data  

---

## 🧠 Engineering Highlights

- Designed a backend-driven portfolio calculation engine to ensure consistency  
- Implemented polling-based updates (30s interval) for near real-time pricing  
- Built an in-memory caching layer (~60s TTL) to reduce API calls  
- Moved heavy computations from frontend to backend  
- Developed stateless authentication using JWT  
- Structured scalable MongoDB schemas  

---

## 🔄 Data Refresh Strategy

- Frontend polls backend every **30 seconds**  
- Backend caches market data for **~60 seconds**  
- Intermediate responses are served from cache  

**Outcome:**
- Reduced API calls  
- Stable performance  
- Near real-time experience  

---

## ⚡ Key Challenges Solved

- Handling API rate limits using caching  
- Maintaining consistent P&L calculations with changing prices  
- Reducing redundant API calls  
- Synchronizing frontend and backend data  

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Recharts
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcrypt

### Infrastructure
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas

---

## ⚙️ Backend Architecture

| Layer        | Purpose |
|--------------|--------|
| API Server   | Business logic & routing |
| Database     | User & portfolio data |
| Auth Layer   | JWT authentication |
| Market Layer | External API + caching |
| Calculation  | Portfolio valuation |

---

## 🚀 Future Improvements

- Price alerts (email notifications)  
- Transaction history (buy/sell tracking)  
- Multi-currency support  
- Advanced analytics (Sharpe ratio, correlation)  
- WebSocket-based real-time updates  

---

## ⚙️ Installation & Setup

### Clone Repository
```bash
git clone https://github.com/Rohit-011205/CoinMap.git
cd CoinMap
```
---
## 🛠 Backend Setup
```bash
cd backend
npm install
```
### Create a .env file inside the backend folder:
```bash
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
NODE_ENV=development
CLIENT_URL=http://localhost:5173
COINGECKO_API_KEY=optional_api_key

Start the backend server:
npm run dev
```
---
--------------------------------
## 🎨 Frontend Setup
--------------------------------
```bash
cd ../frontend
npm install

Create a .env file inside the frontend folder:

VITE_API_URL=http://localhost:5000/api
VITE_CURRENCY=$

Run the frontend:
npm run dev

```
---
## 📄 License

Copyright (c) 2025 Rohit Kadam

Permission is hereby granted, free of charge, to any person obtaining a copy  
of this software and associated documentation files (the "Software"), to deal  
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.

---

## 👨‍💻 Author

**Rohit Kadam**  
Full-Stack MERN Developer  
DSA Enthusiast | IoT & Sensors | Building Production-Ready Projects

- GitHub: https://github.com/Rohit-011205

---

🚀 **Ready to track your crypto portfolio like a pro?**  
Clone the repository, configure your `.env` files, and start building!
