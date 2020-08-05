import React, { useState } from "react";
import PropTypes from "prop-types";
import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import TaskEdit from "./TaskEdit";
import TaskDelete from "./TaskDelete";

export default function TaskItem({ task, editable }) {
  const [editModalShown, setEditModalShown] = useState(false);
  const [deleteModalShown, setDeleteModalShown] = useState(false);

  const showEditModal = () => setEditModalShown(true);
  const showDeleteModal = () => setDeleteModalShown(true);

  return (
    <ListGroup.Item
      key={task.number}
      className="justify-content-between align-items-center"
      style={{ display: "flex" }}
    >
      <div className="pr-2">
        #{task.number}
        {": "}
        <b>
          {task.hours > 0 && task.hours + "h"}{" "}
          {task.minutes > 0 && task.minutes + "m"}
        </b>
        {task.description && " \u2013 " + task.description}
      </div>
      {editable && (
        <div className="justify-content-between" style={{ display: "flex" }}>
          <Button
            variant="outline-info"
            title="Edit task"
            onClick={showEditModal}
            className="mr-2"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </Button>
          <Button
            variant="outline-danger"
            title="Delete task"
            onClick={showDeleteModal}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
          <TaskEdit
            task={task}
            modalShown={editModalShown}
            setModalShown={setEditModalShown}
          />
          <TaskDelete
            task={task}
            modalShown={deleteModalShown}
            setModalShown={setDeleteModalShown}
          />
        </div>
      )}
    </ListGroup.Item>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.string,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  editable: PropTypes.bool,
};
