const sqlite3 = require("sqlite3");

const database = new sqlite3.Database(
  "tasks.sqlite3",
  sqlite3.OPEN_READWRITE,
  err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the database successfully.");
  }
);

const serializeData = data => {
  if (data.length) {
    return data.map(task => ({
      ...task,
      completed: task.completed ? true : false
    }));
  }

  return { ...data, completed: data.completed ? true : false };
};

module.exports = { database, serializeData };
