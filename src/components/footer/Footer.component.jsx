import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => (
  <Container>
    <Row className="justify-content-center text-center">
      <Col>
        <p className="d-inline text-muted pr-2 pl-2">
          © {new Date().getFullYear()} Software Repository |
        </p>
        <p className="d-inline text-muted">JonathanLeeWH ❤️ |</p>
        <a
          href="https://github.com/JonathanLeeWH"
          target="_blank"
          rel="noopener noreferrer"
          className="d-inline pl-2"
        >
          GitHub
        </a>
      </Col>
    </Row>
  </Container>
);
export default Footer;
