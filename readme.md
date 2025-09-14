# Expense Tracker App

An end-to-end MERN stack application to track your expenses, visualize statistics, and manage your financial history. This project includes both a Node.js/Express backend and a React/Vite frontend.

## Features
- User authentication (sign up, login)
- Add, view, and delete expenses
- Filter expenses by date, category, and more
- Visualize data with charts (Bar, Pie, Donut, Line)
- Statistics dashboard for insights
- Responsive and modern UI

## Technologies Used
- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Folder Structure

```
Expense-Tracker - main/
├── backend/      # Node.js/Express API
├── frontend/     # React/Vite client
├── readme.md     # Project documentation
└── expense_tracker_todo.txt
```

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend folder:
	```powershell
	cd backend
	```
2. Install dependencies:
	```powershell
	npm install
	```
3. Configure your `.env` file with MongoDB URI and JWT secret.
4. Start the server:
	```powershell
	npm start
	```

### Frontend Setup
1. Navigate to the frontend folder:
	```powershell
	cd ../frontend
	```
2. Install dependencies:
	```powershell
	npm install
	```
3. Start the development server:
	```powershell
	npm run dev
	```

## Usage
1. Open the frontend in your browser (default: http://localhost:5173)
2. Register or log in
3. Add expenses, view history, and explore statistics

## Remaining Work
- Add advanced statistics and analytics
- Add options for delete and edit transactions
- Add more filter features for statistics 
- Improve UI with better color contrast and design
