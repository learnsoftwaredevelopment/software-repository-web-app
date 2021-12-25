import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DemoNotification = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This is a{' '}
            <strong>
              <u>demo</u>
            </strong>{' '}
            <b>SoftwareRepository</b> website with <b>sample data</b> included.
          </p>
          <p>
            The <b>SoftwareRepository Backend API</b> is hosted on a{' '}
            <b>
              <u>free instance</u>
            </b>{' '}
            of <b>Heroku</b> hence, It may take <u>around 10 seconds (Heroku estimate)</u> for the
            backend server to start up resulting in a possibly slight delay in
            sample data retrieved.
            <p className="text-muted">
              The backend server was originally hosted in a free instance of{' '}
              <b>Microsoft Azure</b> but the free limits was exceeded hence,
              Heroku is currently being used as an alternative host.
            </p>
            <p>Apologies for any inconvenienced caused if any. </p>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DemoNotification;
