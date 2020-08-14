import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function About() {
  return (
    <Container className="pt-4">
      <Row style={{ height: "calc(100vh - 1.5rem)" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="blur">
            <Card.Body>
              <Card.Text as="div">
                <h1>About Time Left</h1>
                <p>
                  Hi! This is a simple app that let&apos;s you track time
                  you&apos;ve spent on a various tasks throught your day.
                </p>
                <p>
                  The app runs completely in your browser and everything is
                  stored on your side, there is no backend. So there are
                  downsides like you can&apos;t access same data from different
                  devices. And the tasks are stored only for the current and
                  previous day.
                </p>
                <p>
                  Also, this is my first live React project and there might be
                  bugs and/or issues. Feel free to submit them on{" "}
                  <a
                    href="https://github.com/c-v-ya/time-left"
                    target="blank"
                    title="GitHub project page"
                  >
                    <FontAwesomeIcon icon={faGithub} /> project&apos;s page
                  </a>
                  , along with any suggestions. And there is a{" "}
                  <a
                    href="https://dev.to/c_v_ya/simple-react-app-to-track-time-2il7/"
                    target="blank"
                    title="Blog post about the app on dev.to"
                  >
                    blog post
                  </a>{" "}
                  about how I made this app if you&apos;d like to read more.
                </p>
                <p>
                  The beautiful illustration in the background provided by{" "}
                  <a href="https://stories.freepik.com/work" target="blank">
                    Freepik Stories
                  </a>
                  .
                </p>
                <p>
                  <Link to="/" title="Back to the app">
                    <FontAwesomeIcon icon={faChevronLeft} /> Back to the app
                  </Link>
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
