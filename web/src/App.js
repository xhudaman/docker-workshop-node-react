import React from "react";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import TaskList from "./components/task/index";
import TaskForm from "./components/task/taskForm";
import AddButton from "./components/addButton";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="secondary" variant="dark">
          <Container>
            <Navbar.Brand href="/">Todo App - Dockerize Me</Navbar.Brand>
            <AddButton />
          </Container>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Redirect to="/task" />
          </Route>
          <Route exact path="/task" component={TaskList} />
          <Route path="/task/:id">
            <TaskForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
