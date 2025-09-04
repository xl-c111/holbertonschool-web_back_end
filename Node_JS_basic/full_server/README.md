# Full Server (Express + Babel)

This project implements a modular HTTP server using **Express.js** with ES6 syntax support via **Babel**.  
The server demonstrates a clean architecture by separating **controllers**, **routes**, and **utilities**.

It responds to three main endpoints:

- `/` → Homepage
- `/students` → List all students grouped by field
- `/students/:major` → List students by a specific major (CS or SWE only)

---

## 📂 File Structure

```
full_server/
│── controllers/
│   ├── AppController.js
│   └── StudentsController.js
│
│── routes/
│   └── index.js
│
│── utils.js
│── server.js
│── package.json
```

---

## 📄 File Explanations

### 1. `controllers/`

This folder contains **controllers**, which define the logic for handling HTTP requests.

- **`AppController.js`**
  - Defines the `AppController` class.
  - Contains one static method:
    - `getHomepage(req, res)` → Returns `200 OK` with message **"Hello Holberton School!"**.

- **`StudentsController.js`**
  - Defines the `StudentsController` class.
  - Contains two static methods:
    - `getAllStudents(req, res)`
      - Reads student data using `readDatabase`.
      - Responds with a formatted list of students grouped by field (CS, SWE, etc.).
      - If the database is unavailable → returns `500 Cannot load the database`.
    - `getAllStudentsByMajor(req, res)`
      - Reads student data for a specific `:major` (only **CS** or **SWE** allowed).
      - If invalid major → returns `500 Major parameter must be CS or SWE`.
      - If the database is unavailable → returns `500 Cannot load the database`.

---

### 2. `routes/`

This folder contains **route definitions** that link URLs to controller methods.

- **`index.js`**
  - Maps routes to controllers:
    - `/` → `AppController.getHomepage`
    - `/students` → `StudentsController.getAllStudents`
    - `/students/:major` → `StudentsController.getAllStudentsByMajor`

---

### 3. `utils.js`

- Defines a utility function `readDatabase(filePath)`.
- Responsibilities:
  - Reads the database CSV asynchronously.
  - Returns a `Promise`.
  - If successful → resolves to an object where keys are fields (`CS`, `SWE`) and values are arrays of student first names.
  - If error → rejects with `"Cannot load the database"`.

Example output of `readDatabase`:

```js
{
  CS: ['Johann', 'Arielle', 'Jonathan', 'Emmanuel', 'Guillaume', 'Katie'],
  SWE: ['Guillaume', 'Joseph', 'Paul', 'Tommy']
}
```

---

### 4. `server.js`

- Entry point of the application.
- Responsibilities:
  - Creates the **Express app**.
  - Uses routes defined in `routes/index.js`.
  - Starts the server on port **1245**.
  - Exports the app (`export default app;`) for testing.

---

### 5. `package.json`

- Defines project dependencies and scripts.
- Example `dev` script (to run with Babel + Nodemon):

```json
"scripts": {
  "dev": "nodemon --exec babel-node --presets babel-preset-env ./full_server/server.js ./database.csv"
}
```

---

## 🚀 Usage

### Start the server

```bash
npm run dev
```

### Test endpoints

```bash
curl localhost:1245
# → Hello Holberton School!

curl localhost:1245/students
# → This is the list of our students
#   Number of students in CS: 6. List: Johann, Arielle, Jonathan, Emmanuel, Guillaume, Katie
#   Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy

curl localhost:1245/students/CS
# → List: Johann, Arielle, Jonathan, Emmanuel, Guillaume, Katie

curl localhost:1245/students/French
# → Major parameter must be CS or SWE
```
