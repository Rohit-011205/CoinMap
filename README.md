# 🚀 CoinMap – Full-Stack Crypto Portfolio Tracker & Analytics

CoinMap is a **full-stack MERN web application** that allows users to track cryptocurrency holdings, monitor live market prices, visualize portfolio performance using interactive charts, and analyze real-time portfolio analytics.

The application features **secure JWT-based authentication**, **CoinGecko market data integration with intelligent backend caching**, accurate **portfolio profit & loss tracking**, and a **responsive dashboard built with Tailwind CSS**.

After weeks of building, debugging, and strengthening my full-stack development skills, I’m excited to share **CoinMap** — a complete **Crypto Portfolio Tracker & Analytics Dashboard** designed to deliver clear insights and full control over personal crypto investments.

## 💡 Why CoinMap?

Many crypto investors track assets across multiple exchange dashboards, making it difficult to get a clear view of overall portfolio performance.

CoinMap solves this by providing a **single, personalized dashboard** where portfolio data is **securely stored in the user’s own database** and accessible anytime, anywhere.

There is **no dependency on exchanges**, and user data remains **private and fully controlled** by the application owner.

<img width="1919" height="910" alt="Screenshot 2025-12-27 103236" src="https://github.com/user-attachments/assets/59363a4c-c5e2-4729-8eae-82752fa4d8ea" />

<img width="1919" height="898" alt="Screenshot 2025-12-27 103253" src="https://github.com/user-attachments/assets/a5369819-84e6-423b-a8fb-a43ef3921706" />



## 🛠️ What Does CoinMap Offer?

✅ **Real-time Portfolio Dashboard**  
View total portfolio value, 24h change, and overall profit/loss at a glance.
<img width="1919" height="905" alt="Screenshot 2025-12-27 103631" src="https://github.com/user-attachments/assets/656af060-c59e-4348-b11f-2c098210f78b" />


✅ **Live Market Data**  
CoinGecko API integration with intelligent backend caching to prevent rate limits.
<img width="1916" height="915" alt="image" src="https://github.com/user-attachments/assets/ff8a2a02-c30e-4454-b03b-14fcb638b3d2" />


✅ **Interactive Charts & Visualizations**  
Line charts for portfolio value history and pie charts for asset allocation.

<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/829a09a3-e424-4e34-a219-2dfa0d051eb0" />


✅ **Holdings Management**  
Add, edit, and delete crypto positions with accurate average buy price tracking.
<img width="1919" height="916" alt="image" src="https://github.com/user-attachments/assets/57e778bb-d6e5-43ae-b09e-6835981bc2f8" />


✅ **P&L Calculations**  
Automatic unrealized profit/loss calculation per asset and for the entire portfolio.

✅ **Secure Authentication**  
JWT-based authentication with bcrypt password hashing and protected routes.
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/93331c14-7f12-4023-a6b4-5e4aeaedc599" />


✅ **Responsive Design**  
Mobile-first UI built with Tailwind CSS and Recharts for data visualization.

✅ **Explore Cryptocurrencies**  
Browse top 20+ cryptocurrencies by market cap with live price updates. And add it to portfolio
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/eef69d32-ff22-43c3-bafb-92fa30f19bc9" />
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/3bf7ae73-4a64-415c-9778-1f59104e556b" />



✅ **Real-time Price Refresh**  
Portfolio prices refresh automatically every 30 seconds using latest market data.

✅ **Smart Backend Caching**  +
+In-memory caching layer minimizes external API calls while keeping prices fresh.

✅ **Export to CSV**
Download your portfolio data as CSV file for analysis & tax records
<img width="1919" height="909" alt="image" src="https://github.com/user-attachments/assets/bf783333-2d03-4f9f-832a-84dfe6947cbf" />
<img width="1908" height="896" alt="image" src="https://github.com/user-attachments/assets/4805622a-5c49-4e3d-b045-536d585c69e0" />




## 🛠 Tech Stack & Tools Used

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- Recharts
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- Axios

### Authentication
- JWT-based authentication
- HTTP-only cookies for token storage
- Protected routes with middleware

### Market Data
- CoinGecko API
- Intelligent backend caching layer (60s) to prevent rate limits

### Database
- MongoDB Atlas


### Deployment & Hosting
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

### Email Service
- Nodemailer (with brevo SMTP)

## 📚 What I Learned & Applied

🔹 **Full-Stack Architecture**  
Designed a clear separation between frontend and backend, built stateless REST APIs, and implemented structured MongoDB schemas.

🔹 **Real-Time Data Integration**  
Integrated CoinGecko market data through a smart caching layer to power portfolio updates and live chart visualizations.

🔹 **Backend Optimization**  
Moved portfolio value and P&L calculations to the backend to reduce frontend complexity and improve performance.

🔹 **Caching Strategy**  
Implemented an in-memory caching mechanism to prevent API rate limits while keeping market data fresh.

🔹 **API Design & Error Handling**  
Built protected routes using JWT middleware, standardized API responses, and applied proper HTTP status codes.

🔹 **Security Practices**  
Implemented bcrypt password hashing, JWT authentication, HTTP-only cookies, and protected portfolio endpoints.

🔹 **Frontend Performance & UI**  
Used React hooks and Context API for state management, Recharts for efficient data visualization, and Tailwind CSS for responsive design.

🔹 **Deployment**  
Managed environment variables, handled production deployments, implemented logging, and optimized API behavior for hosted environments.

🔹 **User Experience**  
Focused on real-time price updates, instant P&L feedback, and a mobile-friendly dashboard layout.

---

This project significantly strengthened my confidence in building **end-to-end full-stack applications**, from database design and secure APIs to real-time data processing and responsive UI deployment.

## 🧩 Features Overview

### 👥 For Investors & Traders

#### 📊 Dashboard Overview
- Total portfolio value (USD)
- 24-hour change (amount & percentage)
- Total unrealized profit/loss
- Best performing asset
- Worst performing asset
- Total number of holdings

#### 📈 Portfolio Charts
- Line chart showing portfolio value over time  
  *(1D / 7D / 30D / All filters)*
- Pie chart representing asset allocation by percentage
- Interactive hover tooltips for detailed insights

#### 💼 Holdings Table
- Asset name with CoinGecko icon
- Quantity owned
- Average buy price
- Current market price (live updated)
- Unrealized profit/loss per holding
- Total invested value vs current value

#### 🌍 Market Trends
- Top 20 cryptocurrencies by market capitalization
- Live price with 24-hour change
- Market cap and volume data
- Quick add-to-holdings action

#### 🔄 Holdings Management
- Add new holdings (symbol, quantity, average buy price)
- Edit existing positions
- Delete holdings
- Automatic real-time price synchronization

#### 🔐 Secure Access
- User registration and login with JWT authentication
- Protected portfolio routes
- Persistent sessions using HTTP-only cookies
- Secure logout functionality


<img width="1917" height="906" alt="image" src="https://github.com/user-attachments/assets/6af8b259-46e5-4a08-927f-2b3a627cbca5" />


## ⚙️ Backend Architecture

| Layer           | Technologies                     | Purpose                                                   |
|-----------------|----------------------------------|-----------------------------------------------------------|
| Server          | Node.js, Express.js               | RESTful APIs, business logic, request handling             |
| Database        | MongoDB, Mongoose                 | User data, holdings, portfolio snapshots                   |
| Authentication  | JWT, bcrypt, HTTP-only Cookies    | Secure user access and password hashing                    |
| Market Data     | CoinGecko API, Caching Layer      | Live price fetching with rate-limit protection             |
| Calculations    | Backend Business Logic            | P&L calculations, portfolio value, asset allocation        |
| Error Handling  | Try/Catch, HTTP Status Codes      | Graceful failures and consistent API responses             |
| Deployment      | Render, MongoDB Atlas             | Production hosting and managed cloud database              |


### 🧠 Smart Caching Example

The backend caches CoinGecko API responses for 60 seconds to reduce external requests and prevent rate limits.

```js
// Cache CoinGecko data for 60 seconds
let cachedData = null;
let cacheTimestamp = null;

const CACHE_DURATION = 60 * 1000; // 60 seconds

if (cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
  return cachedData; // Return cached data if still fresh
}

// Otherwise, fetch fresh data from CoinGecko API
// cachedData = fetchedData;
// cacheTimestamp = Date.now();

```
## 💻 Frontend Architecture

| Category          | Technology                          |
|-------------------|--------------------------------------|
| Framework         | React.js + Vite                      |
| Styling           | Tailwind CSS (mobile-first)          |
| Charts & Graphs   | Recharts                             |
| Routing           | React Router DOM                     |
| HTTP Client       | Axios (custom API instance)          |
| State Management  | useState, useEffect, useContext      |
| Authentication   | JWT (via backend API)                 |
| Build & Deploy    | Vercel                               |


## 🚀 Deployment

**Live Demo:**  
(https://coinmap-provide.vercel.app/)

### Hosting & Infrastructure
- **Frontend:** Vercel (auto-deploy from GitHub)
- **Backend:** Render (auto-deploy from GitHub)
- **Database:** MongoDB Atlas (cloud-hosted)
- **Email Service:** Nodemailer + SMTP *(optional / future use)*

---

## 🤝 Contributing

Contributions are welcome and appreciated.

1. Fork the repository  
2. Create your feature branch  
   ```bash
   git checkout -b feature/price-alerts

## 📈 Future Features

- Price alerts with email notifications when a price crosses a defined threshold
- Transaction history with buy/sell tracking
- Multi-currency support (USD, INR, EUR, etc.)
- Advanced portfolio analytics (Sharpe ratio, correlation analysis)
- Watchlist feature with price targets
- Dark mode toggle
- Social sharing of portfolio statistics
- API rate-limit monitoring dashboard

---
##⚙️ Installation & Setup
-

Follow these steps to set up the project locally 👇

📥 Clone the Repository

git clone https://github.com/Rohit-011205/CoinMap.git
cd CoinMap

---
🛠 Backend Setup
-
cd backend
npm install

Create a .env file inside the backend folder:
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
NODE_ENV=development
CLIENT_URL=http://localhost:5173
COINGECKO_API_KEY=optional_api_key

Start the backend server:
npm run dev

--------------------------------
🎨 Frontend Setup
--------------------------------
cd ../frontend
npm install

Create a .env file inside the frontend folder:
VITE_API_URL=http://localhost:5000/api
VITE_CURRENCY=$

Run the frontend:
npm run dev

---
🌐 Open the App
---
Frontend: http://localhost:5173
Backend: http://localhost:5000

``
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
