const sqlite3 = require("sqlite3");
const dbFile = "./tasks.sqlite3";
class Database {
  constructor(databaseName) {
    this.db = new sqlite3.Database(databaseName, err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to the in-memory SQlite database.");
    });

    this.serializeTasks = tasks => {
      return tasks.map(task => ({
        ...task,
        completed: task.completed ? true : false
      }));
    };
  }
}

class DatabaseClient {
  constructor() {}

  static dbClient() {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new Database("tasks.sqlite3");

      return DatabaseClient.instance;
    }
  }
}
module.exports = DatabaseClient;
