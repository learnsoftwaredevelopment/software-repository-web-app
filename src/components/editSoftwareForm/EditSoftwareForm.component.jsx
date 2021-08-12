import _ from 'lodash';
import { useEffect, useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { AiOutlineTwitter } from 'react-icons/ai';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import isURL from 'validator/lib/isURL';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../contexts/notification/Notification.context';
import { useAuth } from '../../contexts/auth/Auth.context';
import {
  availablePricing,
  parseSoftwarePlatform,
  parseSoftwarePricing,
} from '../../utils/utils';
import { ALLOWED_VIDEO_HOST_WHITELIST } from '../../utils/config';

const EditSoftwareForm = () => {
  const { id } = useParams();

  const [validated, setValidated] = useState(false);
  const [initialSoftwareName, setInitialSoftwareName] = useState('');
  const [softwareName, setSoftwareName] = useState('');
  const [altSoftwareNames, setAltSoftwareNames] = useState('');
  const [softwareVersion, setSoftwareVersion] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [softwareVideoUrl, setSoftwareVideoUrl] = useState('');
  const [softwareDescription, setSoftwareDescription] = useState('');
  const [softwareHomepage, setSoftwareHomepage] = useState('');
  const [softwarePlatform, setSoftwarePlatform] = useState('Windows');
  const [isActiveDevelopment, setIsActiveDevelopment] = useState(true);
  const [pricing, setPricing] = useState('Free');
  const [buildOn, setBuildOn] = useState('');
  const [developedBy, setDevelopedBy] = useState('');
  const [maintainedBy, setMaintainedBy] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { handleNotification } = useNotification();

  const { currentUser } = useAuth();

  const splitByNewLineToArrayAndRemoveEmptyElement = (stringObject) => stringObject.split('\n').filter((item) => item);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return false;
    }

    setValidated(false);

    let compiledObject = {};

    if (altSoftwareNames) {
      const altArray = splitByNewLineToArrayAndRemoveEmptyElement(altSoftwareNames);
      compiledObject.alternativeNames = altArray;
    }
    if (
      softwareVideoUrl
      && !isURL(softwareVideoUrl, {
        protocols: ['http', 'https'],
        host_whitelist: ALLOWED_VIDEO_HOST_WHITELIST,
      })
    ) {
      handleNotification(
        'The input Software Video URL is an invalid url. Please ensure the input Software Video URL is valid. Note: Only youtube.com or vimeo.com video providers are supported. An example: https://vimeo.com/573268564',
        'danger',
      );
      return false;
    }
    if (buildOn) {
      const buildOnArray = splitByNewLineToArrayAndRemoveEmptyElement(buildOn);
      compiledObject.buildOn = buildOnArray;
    }
    if (
      softwareHomepage
      && !isURL(softwareHomepage, {
        protocols: ['http', 'https'],
      })
    ) {
      handleNotification(
        'The input Software Homepage is an invalid url. Please ensure the input Software Homepage url is valid.',
        'danger',
      );
      return false;
    }
    if (shortDescription.length === 0 || shortDescription.length > 100) {
      handleNotification(
        'Please input the software short description and ensure that it only contains between 1 to 100 (inclusive) characters.',
        'danger',
      );
      return false;
    }
    if (developedBy) {
      const developedByArray = splitByNewLineToArrayAndRemoveEmptyElement(developedBy);
      compiledObject.developedBy = developedByArray;
    }
    if (maintainedBy) {
      const maintainedByArray = splitByNewLineToArrayAndRemoveEmptyElement(maintainedBy);
      compiledObject.maintainedBy = maintainedByArray;
    }
    if (tags) {
      const tagsArray = splitByNewLineToArrayAndRemoveEmptyElement(tags);
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
        softwareName.toLowerCase() !== initialSoftwareName
        && softwareNameAvailability.data.queryResponse.filter(
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
        shortDescription,
        videoLink: softwareVideoUrl,
        description: softwareDescription,
        homePage: softwareHomepage,
        platform: softwarePlatform,
        isActiveDevelopment,
        pricing,
        twitterUsername,
      };

      console.log(compiledObject);

      const retrievedIdToken = await currentUser.getIdToken();
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_API}software/${id}`,
        compiledObject,
        {
          headers: {
            Authorization: `Bearer ${retrievedIdToken}`,
          },
        },
      );
      handleNotification('Software successfully edited.', 'success');
    } catch (err) {
      console.log(err);
      handleNotification('Edit Software not successful.', 'danger');
    } finally {
      setIsLoading(false);
    }

    return true;
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}software/${id}`)
      .then((response) => response.data)
      .then((data) => {
        setInitialSoftwareName(data.name);
        setSoftwareName(data.name);
        setAltSoftwareNames(data.alternativeNames.join('\n'));
        setSoftwareVersion(data.version);
        setShortDescription(data.shortDescription);
        setSoftwareVideoUrl(data.videoLink);
        setSoftwareDescription(data.description);
        setSoftwareHomepage(data.homePage);
        setSoftwarePlatform(parseSoftwarePlatform(data.platform));
        setIsActiveDevelopment(data.isActiveDevelopment);
        setPricing(parseSoftwarePricing(data.pricing));
        setBuildOn(data.buildOn.join('\n'));
        setDevelopedBy(data.developedBy.join('\n'));
        setMaintainedBy(data.maintainedBy.join('\n'));
        setTwitterUsername(data.twitterUsername);
        setTags(data.meta.tags.join('\n'));
      });
  }, [id]);

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
          <Form.Group as={Col} controlId="shortDescription">
            <Form.Label>Software Short Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Software Short Description"
              maxLength={100}
              rows={5}
              value={shortDescription}
              onChange={(event) => {
                setShortDescription(event.target.value);
              }}
              required
            />
            <Form.Text className="text-muted">
              The input software short description allowed maximum length is 100
              characters.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please input the software short description and ensure that it
              only contains between 1 to 100 (inclusive) characters.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="videoLink">
            <Form.Label>Software Video URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Software Video URL"
              value={softwareVideoUrl}
              onChange={(event) => {
                setSoftwareVideoUrl(event.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Note: Only youtube.com or vimeo.com video providers are supported.
              An example: https://vimeo.com/573268564
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please input a valid url. An example: https://github.com/user/repo
            </Form.Control.Feedback>
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
          <Form.Group as={Col} controlId="pricing">
            <Form.Label>Pricing</Form.Label>
            <Form.Control
              as="select"
              value={pricing}
              onChange={(event) => {
                setPricing(event.target.value);
              }}
              required
            >
              {Array.from(availablePricing).map((price, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <option key={index}>{_.startCase(price)}</option>
              ))}
            </Form.Control>
            <Form.Text className="text-muted">
              Please select the appropriate software pricing model that best
              matches the software.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please input the software pricing model.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="buildOn">
            <Form.Label>Build On</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={
                'Enter each input must be on a new line.\nAn example:\nPython\nNode.js\n'
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
          <Form.Group as={Col} controlId="twitterUsername">
            <Form.Label>Software Twitter Username</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <AiOutlineTwitter />
              </InputGroup.Text>
              <Form.Control placeholder="Enter Software Twitter Username" value={twitterUsername} onChange={(event) => setTwitterUsername(event.target.value)} />
            </InputGroup>
            <Form.Text className="text-muted">
              Please input the software Twitter username if any.
            </Form.Text>
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
          {isLoading ? 'Editing Software' : 'Edit Software'}
        </Button>
      </Form>
    </>
  );
};

export default EditSoftwareForm;
