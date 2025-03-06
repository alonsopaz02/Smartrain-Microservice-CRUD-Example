# Smartrain CRUD using Microservices example

This repository contains both the backend and frontend for the project.

## 📂 Project Structure
```
/project-root
│── /backend
│── /frontend
```

## 🛠 Prerequisites

### Backend:
- Java 17
- MySQL Database
- Maven

### Frontend:
- Node.js (recommended: latest LTS version)
- NPM or Yarn
- Vite

---

## 🚀 How to Run the Backend

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo/backend
   ```

2. **Configure the database connection:**
   - Navigate to each microservice's `application.properties` file.
   - Update the MySQL connection settings:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:{YOUR_MYSQL_PORT}/{DATABASE_NAME}
     spring.datasource.username=your-username
     spring.datasource.password=your-password
     ```
   - Replace `{YOUR_MYSQL_PORT}`, `{DATABASE_NAME}`, `your-username`, and `your-password` accordingly.

3. **Build and run each microservice:**
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```
   - Repeat for all microservices inside the `backend` folder.

---

## 🌐 How to Run the Frontend

1. **Navigate to the frontend folder:**
   ```sh
   cd ../frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```
   or using Yarn:
   ```sh
   yarn install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   or using Yarn:
   ```sh
   yarn dev
   ```

4. The frontend should now be accessible at:
   ```
   http://localhost:5173
   ```
   (or another port if specified in your Vite configuration)

---

## 🤝 Contributing

Feel free to contribute by opening issues or submitting pull requests.

