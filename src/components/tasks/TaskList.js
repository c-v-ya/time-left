import PropTypes from "prop-types";
import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import TaskAdd from "./TaskAdd";
import TaskItem from "./TaskItem";

function TaskList({ tasks }) {
  const todayDateStr = new Date().toDateString();

  const getDaysDiff = useCallback(
    (taskDate) => {
      const today = new Date(todayDateStr);

      return Math.ceil(Math.abs((today - taskDate) / (1000 * 60 * 60 * 24)));
    },
    [todayDateStr]
  );

  const hasYesterdayTasks = (_task) => getDaysDiff(new Date(_task.date)) === 1;
  const hasTodayTasks = (_task) => _task.date == todayDateStr;

  useEffect(() => {
    let relevantTasks = [];

    tasks.map((_task) => {
      const taskDate = new Date(_task.date);
      const daysDiff = getDaysDiff(taskDate);
      if (daysDiff < 2) relevantTasks.push(_task);
    });

    localStorage.setItem("tasks", JSON.stringify(relevantTasks));
  }, [tasks, getDaysDiff]);

  return (
    <Row>
      <Col sm={12} lg={7}>
        <Row>
          {tasks.some(hasTodayTasks) && (
            <Col sm={12} className="pb-4">
              <Card>
                <Card.Body>
                  <Card.Title as="h2">Today&apos;s tasks</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                  {tasks.map((_task) => {
                    if (hasTodayTasks(_task))
                      return (
                        <TaskItem task={_task} editable={true} key={_task.id} />
                      );
                  })}
                </ListGroup>
              </Card>
            </Col>
          )}
          {tasks.some(hasYesterdayTasks) && (
            <Col sm={12} className="pb-4">
              <Card>
                <Card.Body>
                  <Card.Title as="h2">Yesterday&apos;s tasks</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                  {tasks.map((_task) => {
                    if (hasYesterdayTasks(_task))
                      return <TaskItem task={_task} key={_task.id} />;
                  })}
                </ListGroup>
              </Card>
            </Col>
          )}
        </Row>
      </Col>
      <TaskAdd />
    </Row>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}

export default connect(mapStateToProps)(TaskList);
