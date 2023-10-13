import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../User/Contexts/userContext';

function Logout() {
    const {setLoggedIn} = useAuth();
    const navigate = useNavigate();
    
    const handleLogOut = () => {
        axios.get('http://localhost:8081/user/logout')
            .then(res => {
                localStorage.removeItem('authToken');
                setLoggedIn(false);
                navigate('/')
            }).catch(err => console.log(err));
    }

    return (
        <div style={{ position: 'absolute', top: '2%' }}>
            <button style={{ border: 'none', color: 'red' }}
                type="button"
                className="btn btn-primary dropdown-toggle bg-dark"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <FaSignOutAlt /> Logout
            </button>
            <ul className="dropdown-menu">
                <li>
                    <a className="dropdown-item" onClick={handleLogOut} href="/">Logout</a>
                </li>
            </ul>
        </div>
    );
}
export default Logout
