const express = require("express");
const router = express.Router();
const { database, serializeData } = require("../database/database");

router.get("/tasks", (request, response) => {
  try {
    database.all(`SELECT * FROM tasks`, [], (error, tasks) => {
      if (error) {
        console.error(error);
      } else {
        response.status(200).json({
          tasks: serializeData(tasks)
        });
      }
    });
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).json(error);
  }
});

router.get("/tasks/:id", ({ params }, response) => {
  try {
    database.get(
      `SELECT * FROM tasks WHERE id = ?`,
      [params.id],
      (error, task) => {
        if (error) {
          console.error(error);
        } else {
          response.status(200).json({
            task: serializeData(task)
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).json(error);
  }
});

router.post("/tasks", ({ body }, response) => {
  try {
    const sql = "INSERT INTO tasks (name, completed) VALUES (?,?)";
    const params = [body.task.name, body.task.completed];

    database.run(sql, params, error => {
      if (error) {
        response.status(error.status || 500).json({ error });
        return;
      }

      database.get(
        "SELECT * FROM tasks ORDER BY id DESC LIMIT 1",
        (error, task) => {
          if (error) {
            response.status(error.status || 500).json({ error });
            return;
          }
          response.json({
            task
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).json(error);
  }
});

router.put("/tasks/:id", ({ params, body }, response) => {
  try {
    const completed = body.task.completed ? 1 : 0;
    const sql = `UPDATE tasks set
           name = COALESCE(?,name),
           completed = COALESCE(?,completed)
           WHERE id = ?`;

    database.run(sql, [body.task.name, completed, params.id], (error, task) => {
      if (error) {
        console.error(error);
        response.status(error.status || 500).json({ error });
        return;
      }
      response.json({
        task
      });
    });
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).json(error);
  }
});

router.delete("/tasks/:id", ({ params }, response) => {
  try {
    const sql = "DELETE FROM tasks WHERE id = ?";

    database.run(sql, [params.id], function(error, task) {
      if (error) {
        response.status(error.status || 500).json({ error });
        return;
      }
      response.json({
        task
      });
    });
  } catch (error) {
    console.error(error);
    response.status(error.status || 500).json(error);
  }
});

module.exports = router;
