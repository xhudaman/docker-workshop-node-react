import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

const { REACT_APP_API_URL } = process.env;

const TaskList = () => {
  const [tasks, setTasks] = useState(false);
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      console.log("getting tasks...");
      const { data } = await axios.get(`${REACT_APP_API_URL}/tasks`);
      console.log(data);
      if (data.tasks) {
        setTasks(data.tasks);
        setLoading(false);
        return;
      }

      setLoading(false);
      return alert("Failed to load tasks!");
    };

    getTasks();
  }, [retry]);

  return (
    <Container className="h-100 p-4">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Name</th>
            <th>Complete</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="col-4" />
              <td className="col-4">
                <Spinner animation="border" variant="secondary" />
              </td>
              <td className="col-4" />
            </tr>
          ) : tasks ? (
            tasks.map(({ id, name, completed }) => (
              <tr key={id}>
                <td className="col-4">{id}</td>
                <td className="col-4">{name}</td>
                <td className="col-4">
                  {completed ? (
                    <Badge bg="success">True</Badge>
                  ) : (
                    <Badge bg="danger">False</Badge>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="col-4" />
              <td className="col-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => setRetry(!retry)}
                >
                  Try Again
                </button>
              </td>
              <td className="col-4" />
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TaskList;
