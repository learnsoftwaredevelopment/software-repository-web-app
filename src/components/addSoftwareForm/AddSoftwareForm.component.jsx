import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import isURL from 'validator/lib/isURL';
import { useNotification } from '../../contexts/notification/Notification.context';
import { useAuth } from '../../contexts/auth/Auth.context';

const AddSoftwareForm = () => {
  const [validated, setValidated] = useState(false);
  const [softwareName, setSoftwareName] = useState('');
  const [altSoftwareNames, setAltSoftwareNames] = useState('');
  const [softwareVersion, setSoftwareVersion] = useState('');
  const [softwareDescription, setSoftwareDescription] = useState('');
  const [softwareHomepage, setSoftwareHomepage] = useState('');
  const [softwarePlatform, setSoftwarePlatform] = useState('Windows');
  const [isActiveDevelopment, setIsActiveDevelopment] = useState(true);
  const [buildOn, setBuildOn] = useState('');
  const [developedBy, setDevelopedBy] = useState('');
  const [maintainedBy, setMaintainedBy] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { handleNotification } = useNotification();

  const { currentUser } = useAuth();

  const splitByNewLineToArray = (stringObject) => stringObject.split('\n');

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return false;
    }

    setValidated(false);

    setIsLoading(true);
    let compiledObject = {};

    if (altSoftwareNames) {
      const altArray = splitByNewLineToArray(altSoftwareNames);
      compiledObject.alternativeNames = altArray;
    }
    if (buildOn) {
      const buildOnArray = splitByNewLineToArray(buildOn);
      compiledObject.buildOn = buildOnArray;
    }
    if (softwareHomepage && !isURL(softwareHomepage)) {
      handleNotification(
        'The input Software Homepage is an invalid url. Please ensure the input Software Homepage url is valid.',
        'danger',
      );
      return false;
    }
    if (developedBy) {
      const developedByArray = splitByNewLineToArray(developedBy);
      compiledObject.developedBy = developedByArray;
    }
    if (maintainedBy) {
      const maintainedByArray = splitByNewLineToArray(maintainedBy);
      compiledObject.maintainedBy = maintainedByArray;
    }
    if (tags) {
      const tagsArray = splitByNewLineToArray(tags);
      compiledObject.meta = {
        ...compiledObject.meta,
        tags: tagsArray,
      };
    }

    try {
      setIsLoading(true);

      const softwareNameAvailability = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}search/software?q=${softwareName}`,
      );
      if (
        softwareNameAvailability.data.queryResponse.filter(
          (item) => item.name.toLowerCase() === softwareName.toLowerCase(),
        ).length > 0
      ) {
        handleNotification(
          'The software name is already in use. Please input a different software name.',
          'danger',
        );
        return false;
      }

      compiledObject = {
        ...compiledObject,
        name: softwareName,
        version: softwareVersion,
        description: softwareDescription,
        homePage: softwareHomepage,
        platform: softwarePlatform,
        isActiveDevelopment,
      };

      console.log(compiledObject);

      const retrievedIdToken = await currentUser.getIdToken();
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API}software`,
        compiledObject,
        {
          headers: {
            Authorization: `Bearer ${retrievedIdToken}`,
          },
        },
      );
      handleNotification('Software successfully added.', 'success');
      setSoftwareName('');
      setAltSoftwareNames('');
      setSoftwareVersion('');
      setSoftwareDescription('');
      setSoftwareHomepage('');
      setSoftwarePlatform('Windows');
      setIsActiveDevelopment(true);
      setBuildOn('');
      setDevelopedBy('');
      setMaintainedBy('');
      setTags('');
    } catch (err) {
      console.log(err);
      handleNotification('Addition of Software not successful.', 'danger');
    } finally {
      setIsLoading(false);
    }

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
              value={softwareName}
              onChange={(event) => {
                setSoftwareName(event.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please input the software name.
            </Form.Control.Feedback>
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
          <Form.Group as={Col} controlId="version">
            <Form.Label>Software Version</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Software Version"
              value={softwareVersion}
              onChange={(event) => {
                setSoftwareVersion(event.target.value);
              }}
              required
            />
            <Form.Text className="text-muted">
              Please input the latest version of the software.
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="description">
            <Form.Label>Software Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Software Description"
              rows={5}
              value={softwareDescription}
              onChange={(event) => {
                setSoftwareDescription(event.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please input the software description.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="homepage">
            <Form.Label>Software Homepage URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Software Homepage URL"
              value={softwareHomepage}
              onChange={(event) => {
                setSoftwareHomepage(event.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please input a valid url. An example: https://github.com/user/repo
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="platform">
            <Form.Label>Platform</Form.Label>
            <Form.Control
              as="select"
              value={softwarePlatform}
              onChange={(event) => {
                setSoftwarePlatform(event.target.value);
              }}
              required
            >
              <option>Windows</option>
              <option>Linux</option>
              <option>MacOS</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please select the software platform.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="isActiveDevelopment">
            <Form.Label>Active Development</Form.Label>
            <Form.Control
              as="select"
              value={isActiveDevelopment ? '1' : '0'}
              onChange={(event) => {
                setIsActiveDevelopment(Boolean(Number(event.target.value)));
              }}
              required
            >
              <option value="1">True</option>
              <option value="0">False</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please input the active development status.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="buildOn">
            <Form.Label>Build On</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={
                'Enter each input must be on a new line.\nAn example: \nPython\nNode.js\n'
              }
              rows={5}
              value={buildOn}
              onChange={(event) => {
                setBuildOn(event.target.value);
              }}
              required
            />
            <Form.Text className="text-muted">
              Each input must be on a new line.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please input the technologies which the software is build on.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="developedBy">
            <Form.Label>Developed By</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={
                'Enter each input must be on a new line.\nAn example: \nAlex\nBob\n'
              }
              rows={5}
              value={developedBy}
              onChange={(event) => {
                setDevelopedBy(event.target.value);
              }}
              required
            />
            <Form.Text className="text-muted">
              Each input must be on a new line.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please input the developer(s) of the software.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="maintainedBy">
            <Form.Label>Maintained By</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={
                'Enter each input must be on a new line.\nAn example: \nAlex\nBob\n'
              }
              rows={5}
              value={maintainedBy}
              onChange={(event) => {
                setMaintainedBy(event.target.value);
              }}
              required
            />
            <Form.Text className="text-muted">
              Each input must be on a new line.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please input the maintainer(s) of the software. The maintainer(s)
              can be same as the developer(s).
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="inputTags">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={
                'Enter each tag must be on a new line.\nAn example: \npython\ndevtools\n'
              }
              rows={5}
              value={tags}
              onChange={(event) => {
                setTags(event.target.value);
              }}
              required
            />
            <Form.Text className="text-muted">
              Each tag must be on a new line.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please input the tags for the software to be added.
            </Form.Control.Feedback>
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
