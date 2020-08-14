import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { validateHours, validateMinutes } from "../../utils/validators";
import { updateTotalTime } from "../../redux/actions/time";

function TotalTime({ totalTime, updateTotalTime, tasks }) {
  const [canEdit, setCanEdit] = useState(true);

  const time = JSON.parse(localStorage.getItem("time")) || {
    hours: 8,
    minutes: 0,
  };

  useEffect(() => {
    let hours = 0;
    let minutes = 0;

    tasks.map((task) => {
      if (task.date === new Date().toDateString()) {
        hours += task.hours;
        minutes += task.minutes;
      }
    });

    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
    }

    if (minutes > time.minutes) {
      hours++;
    }

    minutes > 0 || hours > 0 ? setCanEdit(false) : setCanEdit(true);

    updateTotalTime({
      hours: time.hours - hours,
      minutes:
        time.minutes < minutes
          ? 60 - (minutes - time.minutes)
          : time.minutes - minutes,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const editTotalHours = (event) => {
    event.persist();
    const hours = validateHours(event);
    updateTotalTime({ ...totalTime, hours: hours });
    updateBaseTime({ _hours: hours });
  };

  const editTotalMinutes = (event) => {
    event.persist();
    const minutes = validateMinutes(event);
    updateTotalTime({ ...totalTime, minutes: minutes });
    updateBaseTime({ _minutes: minutes });
  };

  const updateBaseTime = ({ _hours, _minutes }) => {
    const baseHours = !isNaN(_hours) ? _hours : time.hours;
    const baseMinutes = !isNaN(_minutes) ? _minutes : time.minutes;
    localStorage.setItem(
      "time",
      JSON.stringify({ hours: baseHours, minutes: baseMinutes })
    );
  };

  return (
    <Row className="mb-4">
      <Col>
        <h1 className="text-right">Time Left</h1>
      </Col>

      <Col className="align-self-center">
        <Form as={Row}>
          <Col sm={6} lg={3}>
            <InputGroup className="mr-2">
              <FormControl
                id="hours-left"
                className={totalTime.hours < 0 ? "is-invalid" : ""}
                type="number"
                title="Total amount of hours to spend on tasks"
                min="0"
                max="24"
                step="1"
                value={totalTime.hours}
                onChange={editTotalHours}
                disabled={!canEdit}
              />
              <InputGroup.Append>
                <InputGroup.Text>h</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col sm={6} lg={3}>
            <InputGroup>
              <FormControl
                id="minutes-left"
                type="number"
                title="Total amount of minutes to spend on tasks"
                min="0"
                max="60"
                step="1"
                value={totalTime.minutes}
                onChange={editTotalMinutes}
                disabled={!canEdit}
              />
              <InputGroup.Append>
                <InputGroup.Text>m</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form>
      </Col>
    </Row>
  );
}

TotalTime.propTypes = {
  totalTime: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
  }).isRequired,
  updateTotalTime: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    totalTime: state.totalTime,
    tasks: state.tasks,
  };
}

const mapDispatchToProps = {
  updateTotalTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(TotalTime);
