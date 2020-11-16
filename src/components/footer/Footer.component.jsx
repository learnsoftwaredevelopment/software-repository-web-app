import Container from 'react-bootstrap/Container';

const Footer = () => (
  <Container className="d-flex mt-auto justify-content-center p-2">
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
  </Container>
);
export default Footer;
