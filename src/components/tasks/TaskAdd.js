import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Form, FormGroup, Button, Card } from "react-bootstrap";
import { validateHours, validateMinutes } from "../../utils/validators";
import { addTask } from "../../redux/actions/task";

const INITIAL_TASK = {
  id: "",
  number: "",
  hours: 0,
  minutes: 0,
  description: "",
  date: "",
};

function TaskAdd({ addTask }) {
  const [task, setTask] = useState({ ...INITIAL_TASK });

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "hours") value = validateHours(event);
    if (name === "minutes") value = validateMinutes(event);
    setTask({ ...task, [name]: value });
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    const date = new Date().toDateString();
    const _task = {
      id: Math.random().toString(36).substr(2, 9),
      date: date,
      number: task.number,
      hours: task.hours,
      minutes: task.minutes,
      description: task.description,
    };

    await addTask(_task);

    setTask({ ...INITIAL_TASK });
  };

  return (
    <Col sm={12} lg={5}>
      <Card>
        <Card.Body>
          <Card.Title as="h3" className="text-center">
            Add task
          </Card.Title>
          <Form onSubmit={handleAdd}>
            <Card.Text as="div">
              <FormGroup as={Row}>
                <Form.Label column sm="4" htmlFor="task-number">
                  Task number
                </Form.Label>
                <Col>
                  <Form.Control
                    id="task-number"
                    type="text"
                    name="number"
                    title="Task number"
                    value={task.number}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Form.Label column sm="4" htmlFor="task-hours">
                  Task hours
                </Form.Label>
                <Col>
                  <Form.Control
                    id="task-hours"
                    type="number"
                    title="Task hours"
                    min="0"
                    max="24"
                    step="1"
                    name="hours"
                    value={task.hours}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Hours must be in range 0 - 24!
                  </Form.Control.Feedback>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Form.Label column sm="4" htmlFor="task-minutes">
                  Task minutes
                </Form.Label>
                <Col>
                  <Form.Control
                    id="task-minutes"
                    type="number"
                    title="Task minutes"
                    min="0"
                    max="60"
                    step="1"
                    name="minutes"
                    value={task.minutes}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Minutes must be in range 0 - 60!
                  </Form.Control.Feedback>
                </Col>
              </FormGroup>
              <FormGroup as={Row}>
                <Form.Label column sm="4" htmlFor="task-description">
                  Task description
                </Form.Label>
                <Col>
                  <Form.Control
                    as="textarea"
                    style={{ height: "10em" }}
                    id="task-description"
                    type="text"
                    title="Task description"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
            </Card.Text>
            <FormGroup as={Row}>
              <Col sm={{ span: 6, offset: 3 }}>
                <Button
                  type="sumbit"
                  variant="outline-success"
                  title="Add task"
                  block
                >
                  +
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}

TaskAdd.propTypes = {
  addTask: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addTask,
};

export default connect(null, mapDispatchToProps)(TaskAdd);
