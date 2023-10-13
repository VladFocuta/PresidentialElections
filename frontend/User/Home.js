import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import DescriptionField from './DescriptionField';
import Logout from '../Components/Logout';
import NavBar from '../Components/NavBar';
import { useAuth } from './Contexts/userContext';

function Home() {
  const {user, loggedIn} = useAuth();
  
  return (
    <div style={{ backgroundColor: 'rgb(97, 95, 95)' }}>
      <div>
        <NavBar />
        <div className="elections-container" style={{ fontSize: '30px', color: 'white' }}>
          <FaUser /><strong> Pro</strong>file
        </div>
        <Link to='/' style={{ fontSize: '30px', position: 'absolute', top: '0%', left: '10%', color: 'white' }}><FaHome /></Link>
        <div style={{ position: 'absolute', right: '9%', top: '1%' }}><Logout /> </div>
      </div>
      {
        loggedIn ?
          <div>
            <div className='mt-5' style={{ position: 'absolute', top: '20%', left: '1%' }}>
              <nav className="" style={{ backgroundColor: 'rgb(97, 95, 95)' }}>
                <div className="container-fluid" style={{ position: 'relative' }}>
                  <span className="navbar-brand mb-3 h1 " style={{ color: 'white', fontSize: '30px' }}>Wel</span><span className='h3' style={{ color: 'white' }}>come!</span>
                </div>
              </nav>
              <div className='d-flex align-items-center p-3 rounded bg-warning mb-2 mt-3' style={{ maxWidth: '100%', marginLeft: '0.1%' }}>
                <strong >Name: &nbsp;</strong>
                <span className='text-decoration-underline fw-semibold' style={{ color: 'black', fontSize: '20px' }}> {user.name}  </span>
              </div>
              <div className='d-flex align-items-center p-3 rounded bg-info ' style={{ maxWidth: '100%', marginLeft: '0.1%' }}>
                <strong>E-mail: &nbsp;</strong>
                <span className='text-decoration-underline fw-semibold mt-2' style={{ color: 'black', fontSize: '20px' }}> {user.email} </span>
              </div>
            </div>
            <div className="btn-group w-50 " style={{ maxWidth: '5%', top: '1%', position: 'absolute' }}>
              <button style={{ border: 'none', color: 'red' }}
                type="button"
                className="btn btn-primary dropdown-toggle bg-dark"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-cog"></i> Settings
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/UpdatePassword">Change password</a>
                </li>
                <li>
                  <a className="dropdown-item" href="/UpdateEmail">Change e-mail</a>
                </li>
              </ul>
            </div>
            <div>
              <DescriptionField />
            </div>
          </div>
          :
          <div>
            <h3 style={{ color: 'white' }}>You must log-in</h3>
            <Link to='/' className='btn btn-primary'>Login</Link>
          </div>
      }
    </div>
  );
}
export default Home
