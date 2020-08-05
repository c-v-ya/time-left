import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Button, Form, FormGroup, Row, Col } from "react-bootstrap";
import { validateHours, validateMinutes } from "../../utils/validators";
import { editTask } from "../../redux/actions/task";

function TaskEdit({ task, editTask, modalShown, setModalShown }) {
  const [_task, setTaskEdit] = useState(task);

  const handleClose = () => setModalShown(false);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "hours") value = validateHours(event);
    if (name === "minutes") value = validateMinutes(event);

    setTaskEdit({ ..._task, [name]: value });
  };

  const handleSave = (event) => {
    event.preventDefault();
    editTask(_task);
    handleClose();
  };

  return (
    <Modal show={modalShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit task {_task.number}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSave}>
        <Modal.Body>
          <FormGroup as={Row}>
            <Form.Label column sm="4" htmlFor="task-number">
              Number
            </Form.Label>
            <Col>
              <Form.Control
                id="task-number"
                type="text"
                title="Task number"
                name="number"
                value={_task.number}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Form.Label column sm="4" htmlFor="task-hours">
              Hours
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
                value={_task.hours}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Form.Label column sm="4" htmlFor="task-minutes">
              Minutes
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
                value={_task.minutes}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Form.Label column sm="4" htmlFor="task-description">
              Description
            </Form.Label>
            <Col>
              <Form.Control
                as="textarea"
                style={{ height: "10em" }}
                id="task-description"
                type="text"
                title="Task description"
                name="description"
                value={_task.description}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

TaskEdit.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.string,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  editTask: PropTypes.func.isRequired,
  modalShown: PropTypes.bool.isRequired,
  setModalShown: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  editTask,
};

export default connect(null, mapDispatchToProps)(TaskEdit);
