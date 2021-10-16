import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link, useHistory } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const TaskList = () => {
  const [tasks, setTasks] = useState(false);
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      console.log("getting tasks...");
      const { data } = await axios.get(`${apiUrl}/tasks`);
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

  const handleDelete = async id => {
    await axios.delete(`${apiUrl}/tasks/${id}`);
    history.push("/");
  };

  return (
    <Container className="h-100 p-4">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Task ID</th>
            <th />
            <th>Name</th>
            <th>Complete</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="col-3" />
              <td className="col-2" />
              <td className="col-4">
                <Spinner animation="border" variant="secondary" />
              </td>
              <td className="col-3" />
              <td className="col-3" />
            </tr>
          ) : tasks ? (
            tasks.map(({ id, name, completed }) => (
              <tr key={id}>
                <td className="col-3">{id}</td>
                <td className="col-2" />
                <td className="col-4">
                  <Link
                    to={`/task/${id}`}
                    className="btn btn-outline-secondary w-100"
                  >
                    {name}
                  </Link>
                </td>
                <td className="col-3">
                  {completed ? (
                    <Badge bg="success">True</Badge>
                  ) : (
                    <Badge bg="danger">False</Badge>
                  )}
                </td>
                <td className="col-3">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(id)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="col-3" />
              <td className="col-2" />
              <td className="col-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => setRetry(!retry)}
                >
                  Try Again
                </button>
              </td>
              <td className="col-3" />
              <td className="col-3" />
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TaskList;
