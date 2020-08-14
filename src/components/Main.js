import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import TotalTime from "./time/TotalTime";
import TaskList from "./tasks/TaskList";

import "../../assets/css/main.css";

function Main() {
  return (
    <Container className="pt-4" style={{ minHeight: "100vh" }}>
      <TotalTime />
      <TaskList />
      <Row className="pt-4 pb-4">
        <Col className="text-right">
          <Link to="/about" title="About" className="text-info">
            <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
