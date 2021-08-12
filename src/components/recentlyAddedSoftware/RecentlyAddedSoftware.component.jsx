import axios from 'axios';
import _ from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState, useEffect } from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { parseSoftwarePlatform } from '../../utils/utils';

const RecentlyAddedSoftware = () => {
  const [softwareList, setSoftwareList] = useState([]);
  dayjs.extend(relativeTime);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}software/added/recent?count=5`)
      .then((response) => response.data)
      .then((data) => setSoftwareList(data));
  }, []);

  return (
    <>
      <Card>
        <Card.Header>Recently Added Software</Card.Header>
        <ListGroup variant="flush">
          {softwareList.map((software) => (
            <ListGroup.Item key={software.id}>
              <Link to={`/software/${software.id}`}>
                <h4>{_.startCase(software.name)}</h4>
              </Link>
              <p className="text-muted text-justify">
                {software.shortDescription}
              </p>
              {software.pricing ? (
                <h5>
                  <Badge
                    variant={
                      software.pricing.toLowerCase().includes('free')
                        ? 'success'
                        : 'primary'
                    }
                    disabled
                  >
                    {_.startCase(software.pricing)}
                  </Badge>{' '}
                  <Badge variant="info">
                    {`Platform: ${parseSoftwarePlatform(software.platform)}`}
                  </Badge>
                </h5>
              ) : null}
              <p className="text-muted">
                Added {dayjs(software.createdAt).fromNow()}
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  );
};

export default RecentlyAddedSoftware;
