import { Card, Image } from 'react-bootstrap';
import { useAuth } from '../../contexts/auth/Auth.context';

const ProfileInformation = () => {
  const { currentUser, customClaims } = useAuth();
  return (
    <>
      <Card>
        <Card.Header>Profile Information</Card.Header>
        <div className="text-center">
          <Image
            className="mt-4 mb-4"
            src="https://plchldr.co/i/128x128?&bg=000000&fc=808080"
            width="128px"
            height="128px"
            roundedCircle
          />
        </div>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Username</th>
              <td>
                {!customClaims ? '' : customClaims.username}
              </td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{currentUser.email}</td>
            </tr>
            <tr>
              <th scope="row">Name</th>
              <td>{currentUser.displayName}</td>
            </tr>
            <tr>
              <th scope="row">Verified Email</th>
              <td>{currentUser.emailVerified ? 'Verified' : 'Not Verified'}</td>
            </tr>
            <tr>
              <th scope="row">Joined On</th>
              <td>{currentUser.metadata.creationTime}</td>
            </tr>
            <tr>
              <th scope="row">Last Login</th>
              <td>{currentUser.metadata.lastSignInTime}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default ProfileInformation;
