import { Link } from 'react-router-dom'
import { useAuth } from './Contexts/userContext';

function Login() {
  const {errors, handleInput, handleSubmit} = useAuth();
    
  return (
    <div>
      <h2 className='d-flex justify-content-center bg-black' style={{ color: 'white', fontSize: '40px' }}>Elections</h2>
      <div className='d-flex justify-content-center align-items-center bg-black vh-100' style={{ marginTop: '-1%' }}>
        <div className='bg-light p-3 rounded w-25'>
          <h2>Sign-in</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="email"><strong>E-mail</strong></label>
              <input type="email" placeholder='Enter E-mail' name='email'
                onChange={handleInput} className='form-control rounded-0' />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor="password"><strong>Password</strong></label>
              <input type="password" placeholder='Enter Password' name='password'
                onChange={handleInput} className='form-control rounded-0' />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type="submit" className='btn btn-primary w-100'>Log in</button>
            <Link to="/signup" className='btn btn-default border w-100 bg-light'>Create Account</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login
