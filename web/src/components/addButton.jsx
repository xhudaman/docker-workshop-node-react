import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;
const AddButton = () => {
  const history = useHistory();
  const task = {
    name: "",
    completed: false
  };

  const handleClick = async () => {
    const { data } = await axios.post(`${apiUrl}/tasks`, { task });

    if (data) {
      console.log(data);
      history.push({
        pathname: `/task/${data.task.id}`,
        state: { create: true }
      });
    }
  };

  return (
    <Button variant="outline-light" onClick={handleClick}>
      Add Task
    </Button>
  );
};

export default AddButton;
