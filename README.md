# 📝 Task Tracker App

A full-stack task and project management application where users can register, create projects, and manage tasks within those projects. Includes features like task status updates, creation and completion dates, and user authentication.

## 🚀 Features

- 🔐 User Authentication (Login & Signup)
- 🧱 CRUD operations for Projects
- ✅ Task Management: Add, Edit, Delete, View
- 📆 Track task creation and completion dates
- 📊 View tasks grouped by project
- ⚙️ Real-time feedback with alerts
- 💻 Fully responsive frontend

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router DOM
- CSS (optional)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/task-tracker-app.git
cd task-tracker-app
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

4. **Environment Setup**
Create a `.env` file in the `server` directory:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

5. **Run the Application**
Open two terminal tabs:
- **Backend**
```bash
cd server
npm start
```
- **Frontend**
```bash
cd client
npm start
```

## 🧪 Sample Credentials (for demo/testing)
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

## 📷 Screenshots
_Add your screenshots here to demonstrate functionality._

## 📂 Project Structure
```
task-tracker-app/
├── client/      # React frontend
├── server/      # Express backend
└── README.md
```

## ✅ Future Improvements
- Add file attachments to tasks
- Implement notifications or reminders
- Allow assigning tasks to multiple users

## 🧑‍💻 Author

- Mukesh Patel(https://github.com/mukeshpatel07)

## 📃 License

This project is licensed under the MIT License.

