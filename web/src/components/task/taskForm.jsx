import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const apiUrl = process.env.REACT_APP_API_URL;

const TaskForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [task, setTask] = useState(false);

  useEffect(() => {
    const getTask = async () => {
      const { data } = await axios.get(`${apiUrl}/tasks/${id}`);

      if (data) {
        setTask(data.task);
      }
    };

    getTask();
  }, [id]);

  const handleSubmit = async event => {
    event.preventDefault();

    await axios.put(`${apiUrl}/tasks/${id}`, { task });
    history.push("/task");
  };

  return (
    <Container className="py-4">
      <h1>Edit Task</h1>
      {task ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="taskForm.name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a name for you task."
              value={task.name}
              onChange={({ target }) =>
                setTask({ ...task, name: target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="taskForm.completed">
            <Form.Label>Completed</Form.Label>
            <Form.Select
              value={task.completed}
              onChange={({ target }) => {
                const value = target.value === "true" ? true : false;

                setTask({ ...task, completed: value });
              }}
            >
              {["false", "true"].map(option => (
                <option key={option}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button className="mx-2" variant="secondary" type="submit">
            Submit
          </Button>
          {location.state?.create ? null : (
            <Button
              className="mx-2"
              variant="danger"
              type="button"
              onClick={() => history.push("/task")}
            >
              Cancel
            </Button>
          )}
        </Form>
      ) : (
        <Spinner animation="border" variant="secondary" />
      )}
    </Container>
  );
};

export default TaskForm;
