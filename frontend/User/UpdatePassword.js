import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaUser } from 'react-icons/fa';

function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Succes") {
          setAuth(true);
          setEmail(res.data.email)

        } else {
          setAuth(false)
        }
      })
      .catch(err => console.log(err))
  }, [navigate])

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:8081/user/updatePassword', { password, email })
      .then(res => {
        if (res.data.updated) {
          navigate('/login');
        } else {
          alert('Not updated');
        }
      })
  };

  return (
    <div>
      {
        auth ?
          <div>
              <div className="bg-dark text-white p-4 mb-2">
                <div className="elections-container" style={{ fontSize: '30px' }}>
                 
                  <Link to='/home' style={{ fontSize: '30px', position: 'absolute', left: '50%', color: 'white', textDecoration: 'none' }}> <FaUser /><strong>Pro</strong>file</Link>
                </div>
              </div>
           
            <span className="navbar-brand mb-3 h1" style={{ color: 'black', fontSize: '25px' }}>Change your password</span>
            <form onSubmit={handleSubmit}>
              <div className="input-group" style={{ maxWidth: '20%', marginLeft: '1%', marginTop: '5%' }}>
                <button type="submit" className="btn btn-warning">
                  <strong>Change password</strong>
                </button>
                <input
                  type="password"
                  className="form-control rounded bg-light"
                  placeholder="New password"
                  style={{ marginLeft: '1%' }}
                  onChange={event => setPassword(event.target.value)}
                />
              </div>
            </form>
          </div>
          :
          <div>
            <h3>Login Now</h3>
            <Link to='/login' className='btn btn-primary'>Login</Link>
          </div>
      }
    </div>
  )
}

export default UpdatePassword