# Auth-App: Secure Authentication & Post Management API  
Auth-App is a **Node.js & Express.js** backend application for user authentication and post management. It features **JWT-based authentication**, **MongoDB integration**, **password hashing**, and **email verification**.  

## 🚀 Features  
✅ Secure **JWT Authentication** (Signup, Login, Logout)  
✅ **MongoDB Atlas** database connection with **Mongoose**  
✅ **Bcrypt.js** for password hashing  
✅ **Email verification** using **Nodemailer**  
✅ Middleware-based **route protection**  
✅ **CRUD operations** for posts  

## 📂 Project Structure  
📁 auth-App 
  ┣ 📂 routers # Route definitions 
  ┣ 📂 controllers # Logic for authentication & posts 
  ┣ 📂 middlewares # Identification & validation middlewares 
  ┣ 📂 models # Mongoose schemas 
  ┣ 📂 utils # Utility functions (hashing, etc.) 
  ┣ 📜 index.js # Express server setup 
  ┣ 📜 .env # Environment variables 
  ┣ 📜 package.json # Dependencies & scripts 
  ┣ 📜 .gitignore # Ignore sensitive files


## ⚡ Quick Start  
To run this project locally, follow these steps:  
git clone https://github.com/0ahmed0ghoul/auth-app.git
cd auth-app
npm install
npm run dev

📌 Environment Variables
Create a .env file in the root directory and add the following:
PORT=8000
MONGO_URI=your_mongo_uri
TOKEN_SECRET=your_secret
NODE_CODE_SENDING_EMAIL_ADDRESS=your_email
NODE_CODE_SENDING_EMAIL_PASSWORD=your_email_password
HMAC_VERIFICATION_CODE_SECRET=your_secret

✅ Tech Stack
Node.js + Express.js
MongoDB + Mongoose
JWT Authentication
Bcrypt.js for secure password storage
Joi for validation
Nodemailer for email verification

🔗 Contributions & Issues
Feel free to fork, open issues, and contribute! 🎉
