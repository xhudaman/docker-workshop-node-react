const express = require("express");
const router = express.Router();
const DatabaseClient = require("../database/database");

router.get("/tasks", async function(req, res, next) {
  try {
    const dbClient = DatabaseClient.dbClient();
    const db = dbClient.db;

    db.all(`SELECT * FROM tasks`, [], (error, tasks) => {
      if (error) {
        console.error(error);
      } else {
        res.status(200).send({
          tasks: dbClient.serializeTasks(tasks)
        });
      }
    });
    db.close();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
