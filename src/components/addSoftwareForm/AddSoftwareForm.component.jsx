import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const AddSoftwareForm = () => {
  const [validated, setValidated] = useState(false);
  const [altSoftwareNames, setAltSoftwareNames] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return false;
    }

    setValidated(false);

    setIsLoading(true);
    const compiledObject = {};
    if (altSoftwareNames) {
      const altArray = altSoftwareNames.split('\n');
      compiledObject.alternativeNames = altArray;
    }
    setIsLoading(false);

    return true;
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Software Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Software Name"
              required
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="altSoftwareNames">
            <Form.Label>Alternative Software Name(s)</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter each Alternative Software Name on a new line."
              rows={5}
              value={altSoftwareNames}
              onChange={(event) => {
                setAltSoftwareNames(event.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Each input alternative software names must be on a new line.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Software Version</Form.Label>
            <Form.Control type="text" placeholder="Enter Software Version" />
            <Form.Text className="text-muted">
              Please input the latest version of the software.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Button disabled={isLoading} variant="primary" type="submit">
          {isLoading ? 'Adding Software' : 'Add Software'}
        </Button>
      </Form>
    </>
  );
};

export default AddSoftwareForm;
