
# Full Stack Whois Lookup App

This project contains both a frontend (Angular) and backend (Node.js/Express) for performing Whois lookups.

---

## Prerequisites

- Node.js (v16 or later recommended)
- npm (comes with Node.js)
- Angular CLI (for frontend):
  ```
  npm install -g @angular/cli
  ```

---

## Backend Setup

1. Open a terminal and navigate to the `backend` directory:
	```
	cd backend
	```
2. Install dependencies:
	```
	npm install
	```
3. Create a `.env` file in the `backend` directory with your Whois API key:
	```env
	WHOIS_API_KEY=your_whoisxmlapi_key_here
	```
4. Start the backend server:
	```
	node index.js
	```
	The backend will run at `http://localhost:5000/` by default.

---

## Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
	```
	cd frontend
	```
2. Install dependencies:
	```
	npm install
	```
3. Start the Angular development server:
	```
	ng serve
	```
	The frontend will run at `http://localhost:4200/` by default.

---

## Usage

1. Open your browser and go to `http://localhost:4200/`.
2. Enter a domain name (e.g., `example.com`) and select the type of information you want to look up.
3. Click the **Lookup** button to see the results.

---

## Notes

- The frontend expects the backend to be running at `http://localhost:5000/`.
- This Whois API key has a maximum of 500 free requests per day.
