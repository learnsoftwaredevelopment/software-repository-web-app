import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../contexts/auth/Auth.context';
import { useNotification } from '../../contexts/notification/Notification.context';

const ProfileSettings = () => {
  const { updateProfile, currentUser } = useAuth();
  const { handleNotification } = useNotification();

  const [validated, setValidated] = useState(false);
  const [avatarImageUrl, setAvatarImageUrl] = useState(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    // To be used in future when there are more fields available to update.
    const updateProfilePromises = [];

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return false;
    }

    const inputName = name.trim();

    if (
      (inputName && inputName !== currentUser.displayName)
      || (avatarImageUrl && avatarImageUrl !== currentUser.photoURL)
    ) {
      updateProfilePromises.push(updateProfile(inputName, avatarImageUrl));
    }

    try {
      setIsLoading(true);
      if (updateProfilePromises.length > 0) {
        await Promise.all(updateProfilePromises);
        handleNotification('Profile Settings successfully updated.', 'success');
      } else {
        handleNotification('No Profile Settings changes made.');
      }
    } catch (err) {
      console.log(err);
      handleNotification('Profile Settings update not successful.', 'danger');
    } finally {
      setIsLoading(false);
      setName('');
      setAvatarImageUrl(null);
      setValidated(false);
    }

    return true;
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile Settings</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" readOnly required />
              <Form.Control.Feedback type="invalid">
                Please input a valid username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => setName(event.target.value)}
                defaultValue={currentUser.displayName}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input your name.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                You can leave the name unchanged if you do not want to update
                the name.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="avatarImageUrl">
              <Form.Label>Avatar Image Url</Form.Label>
              <Form.Control
                type="url"
                onChange={(event) => setAvatarImageUrl(event.target.value)}
                defaultValue={currentUser.photoURL ? currentUser.photoURL : ''}
              />
              <Form.Control.Feedback type="invalid">
                Please input a valid image url.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                You can leave the url unchanged if you do not want to update the
                image url.
              </Form.Text>
            </Form.Group>

            <Button disabled={isLoading} variant="primary" type="submit">
              {isLoading ? 'Loading' : 'Submit'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProfileSettings;
