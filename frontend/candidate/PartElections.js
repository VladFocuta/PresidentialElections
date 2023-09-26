import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logout from '../Components/Logout'
import ElectionsValidation from './ElectionsValidation'

function PartElections() {
  const [values, setValues] = useState({
    City: '',
    Zip: '',
    PersonalIdentNumber: ''
  })
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [auth, setAuth] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(ElectionsValidation(values));
  }

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }

  const handleLogOut = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        navigate('/')
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Succes") {
          setAuth(true);
          const emailFromServer = res.data.email;
          setEmail(emailFromServer);
        } else {
          setAuth(false);
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  useEffect(() => {
    if (errors.City === "" && errors.Zip === "" && errors.PersonalIdentNumber === "") {
      const updatedValues = { ...values, email: email };
      axios.put('http://localhost:8081/user/personalInfo', updatedValues)
        .then(res => {
          if (res.data.Status === "Succes") {
          } else {
            alert("error updating personal infos");
          }
        })
        .catch(err => console.log(err));

      axios.put('http://localhost:8081/user/isCandidate', { email })
        .then(res => {
          if (res.data.updated) {
            handleLogOut();
          }
        })
        .catch(err => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, navigate, values, email]);

  return (
    <div>
      <Link className="bg-dark text-white p-2 mb-2 w-100" to="/" style={{ position: 'absolute', textDecoration: 'none' }}>
        <div className="elections-container">
          <strong>Elect</strong>ions
        </div>
      </Link>
      {
        auth ? (
          <div>
            <div style={{ position: 'absolute', right: '8%', top: '2%' }} > <Logout />
            </div>
            < div className='d-flex justify-content-center align-items-center bg-primary vh-100' style={{ maxHeight: '90%' }}>
              <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-up for Elections</h2>
                <form action="" onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor="City"><strong>City</strong></label>
                    <input type="text" placeholder='Enter City' name='City'
                      onChange={handleInput} className='form-control rounded-0' />
                    {errors.City && <span className='text-danger'>{errors.City}</span>}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="Zip"><strong>Zip</strong></label>
                    <input type="text" placeholder='Enter Zip' name='Zip'
                      onChange={handleInput} className='form-control rounded-0' />
                    {errors.Zip && <span className='text-danger'>{errors.Zip}</span>}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="PIN"><strong>Personal Identification Number</strong></label>
                    <input type="text" placeholder='Enter Personal Identification Number' name='PersonalIdentNumber'
                      onChange={handleInput} className='form-control rounded-0' />
                    {errors.PersonalIdentNumber && <span className='text-danger'>{errors.PersonalIdentNumber}</span>}
                  </div>
                  <button className='btn btn-primary w-100' >Submit</button>
                </form>
              </div>
            </div>
          </div>
        )
          : (
            <div style={{ position: 'absolute', top: '10%' }}>
              <h3>Login Now</h3>
              <Link to='/login' className='btn btn-primary'>Login</Link>
              <h3>You are not logged in</h3>
            </div>
          )
      }
    </div >
  );
}
export default PartElections
