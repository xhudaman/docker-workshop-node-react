import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

const { REACT_APP_API_URL } = process.env;

const TaskList = () => {
  const [tasks, setTasks] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      console.log("getting tasks...");
      const { data } = await axios.get(`${REACT_APP_API_URL}/tasks`);
      console.log(data);
      if (data) {
        setTasks(data.tasks);
        return;
      }
      return alert("There was an error getting your tasks!");
    };

    getTasks();
  }, []);

  return (
    <Container className="h-100 p-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Name</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {tasks ? (
            tasks.map(({ id, name, completed }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{completed ? "true" : "false"}</td>
              </tr>
            ))
          ) : (
            <tr className="justify-content-center align-items-center">
              <Spinner animation="border" variant="secondary" />
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TaskList;
