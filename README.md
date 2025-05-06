# JobConnect Admin Panel

## 🔍 Overview

JobConnect is a MERN stack internship/job application management portal that allows users to:

- Create, edit, and delete job listings
- View and filter job reports based on date range, company, location, and work model
- Dynamically retrieve dropdown options from the database
- Analyze job trends through summary statistics (average salary, work model distribution)

## 📦 Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB (with Mongoose ORM and native queries)
- **Deployment:** Google Cloud Platform (App Engine + Firebase Hosting)

## 🌐 Live URLs

- **Frontend:** [Firebase Hosted App](https://your-firebase-project.web.app)
- **Backend API:** [App Engine API](https://cs348-458507.uc.r.appspot.com)

## 📊 Features

### Requirement 1: Data Management
- Interface to add, edit, delete job entries
- Admin-style dashboard for managing internship listings

### Requirement 2: Reporting
- Filter by company, date, location, and work model
- Display total listings, average salary, and work model distribution

### Dynamic UI
- Work Model dropdown is populated live from MongoDB

### Indexes
- Optimized with indexes on: `Date`, `Company`, `Location`, `Work Model`

## 🧠 Course Concepts Implemented

- ✅ Mongoose ORM for basic CRUD operations
- ✅ Native MongoDB queries (prepared-style) for report generation
- ✅ Indexes on frequently queried fields
- ✅ Dynamic UI from live DB data
- ✅ Deployment to GCP (extra credit)
- ✅ Discussion of isolation level and concurrency included in final demo

## 📁 Folder Structure

```
/client        # React frontend
/server        # Express backend
  ├── routes
  ├── controllers
  ├── models
  └── app.yaml  # GCP deployment config
```

## 🚀 Deployment Notes

- Backend: Deployed to **Google Cloud App Engine (Flexible Environment)**
- Frontend: Deployed to **Firebase Hosting**
- MongoDB: Connected via **MongoDB Atlas**

## 📄 Setup Instructions

```bash
# Backend
cd server
npm install
node index.js

# Frontend
cd client
npm install
npm start
```

---

## 👨‍💻 Author

Aryaman Sharma  
CS348 Project – Spring 2025  
Purdue University