const express = require("express");
const router = express.Router();
const { database, serializeTasks } = require("../database/database");

router.get("/tasks", async function(req, res, next) {
  try {
    database.all(`SELECT * FROM tasks`, [], (error, tasks) => {
      if (error) {
        console.error(error);
      } else {
        res.status(200).send({
          tasks: serializeTasks(tasks)
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
