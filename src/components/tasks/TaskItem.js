import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { ListGroup, Button, Popover, Overlay } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import TaskEdit from "./TaskEdit";
import TaskDelete from "./TaskDelete";

export default function TaskItem({ task, editable }) {
  const [editModalShown, setEditModalShown] = useState(false);
  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [showClipboardTooltip, setShowClipboardTooltip] = useState(false);

  const showEditModal = () => setEditModalShown(true);
  const showDeleteModal = () => setDeleteModalShown(true);

  const hideClipboardTooltip = () => setShowClipboardTooltip(false);
  const unhideClipboardTooltip = () => setShowClipboardTooltip(true);

  const descriptionRef = useRef(null);
  const tooltipTarget = useRef(null);

  const copyToClipboard = () => {
    let range = document.createRange();
    range.selectNode(descriptionRef.current);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // select text
    document.execCommand("copy");

    window.getSelection().removeAllRanges(); // deselect
    unhideClipboardTooltip();

    setTimeout(() => {
      hideClipboardTooltip();
    }, 1300);
  };

  const taskDescription = (
    <span ref={tooltipTarget}>
      {" "}
      &mdash;{" "}
      <span ref={descriptionRef} className="pr-2">
        {task.description}
      </span>{" "}
      <FontAwesomeIcon
        icon={faCopy}
        style={{ cursor: "pointer" }}
        title="Copy description to clipboard"
        onClick={copyToClipboard}
      />
    </span>
  );

  const clipboardTooltip = (
    <Overlay
      target={tooltipTarget.current}
      show={showClipboardTooltip}
      placement="top"
      transition={true}
    >
      <Popover>
        <Popover.Content>Task description copied to clipboard!</Popover.Content>
      </Popover>
    </Overlay>
  );

  return (
    <ListGroup.Item
      key={task.number}
      className="justify-content-between align-items-start"
      style={{ display: "flex" }}
    >
      <div className="pr-2">
        #{task.number}
        {": "}
        <b>
          {task.hours > 0 && task.hours + "h"}{" "}
          {task.minutes > 0 && task.minutes + "m"}
        </b>
        {task.description && taskDescription}
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
      {showClipboardTooltip && clipboardTooltip}
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
