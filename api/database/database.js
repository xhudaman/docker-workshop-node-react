const sqlite3 = require("sqlite3");

const database = new sqlite3.Database("./tasks.sqlite3", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the database successfully.");
});

const serializeTasks = tasks => {
  return tasks.map(task => ({
    ...task,
    completed: task.completed ? true : false
  }));
};
module.exports = { database, serializeTasks };
