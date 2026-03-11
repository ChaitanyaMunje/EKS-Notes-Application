const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


async function initDB() {
  try {
    await pool.query("SELECT 1");
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Tasks table ready");
  } catch (err) {
    console.error("DB init error:", err);
  }
}

// const pool = new Pool({
//   host: "localhost",
//   database: "tasksdb",
//   port: 5432
// });

// below one is required when using in postgress docker image. if we are using local postgress db then username and password can be ignored. 
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT
// });

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "mypassword",
  database: process.env.DB_NAME || "tasksdb",
  port: process.env.DB_PORT || 5432
});


app.get("/api/tasks", async (req, res) => {
  try {

    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "No data found"
      });
    }

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.status(201).json({
      message: "Task created",
      task: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
});
app.listen(3500, async () => {
    await initDB();
  console.log("Backend running on port 3500");
});