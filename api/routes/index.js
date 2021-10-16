var express = require("express");
var router = express.Router();

router.get("/tasks", function(req, res, next) {
  setTimeout(() => {
    res.status(200).send({
      tasks: [
        {
          id: 1,
          name: "Dockerize a React app",
          completed: true
        },
        {
          id: 2,
          name: "Dockerize a Node/Express app",
          completed: true
        }
      ]
    });
  }, 3500);
});

module.exports = router;
