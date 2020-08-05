import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { deleteTask } from "../../redux/actions/task";
import { connect } from "react-redux";

function TaskDelete({ task, deleteTask, modalShown, setModalShown }) {
  const handleClose = () => setModalShown(false);

  const handleSave = () => {
    deleteTask(task);
    handleClose();
  };

  return (
    <Modal show={modalShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete task {task.number}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Confrim deleting task {task.number}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

TaskDelete.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.string,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  modalShown: PropTypes.bool.isRequired,
  setModalShown: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  deleteTask,
};

export default connect(null, mapDispatchToProps)(TaskDelete);
