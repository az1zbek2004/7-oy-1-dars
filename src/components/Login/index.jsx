import React, { useRef, useState } from 'react'
import { Alert } from '@mui/material';
import styles from './index.module.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

function Registr() {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [alert, setAlert] = useState('Error');
    const username = useRef();
    const password = useRef();

    function validate(username, password) {
        const test = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).some((item) => (item.username == username.current.value &&  item.password == password.current.value)) : false
       
        if (username.current.value.length < 4) {
            username.current.value = '';
            username.current.focus();
            setError(true);
            setAlert("Username length more than 4 letters ")
            return false;
        }

        
        if (password.current.value.length < 4) {
            password.current.value = '';
            password.current.focus();
            setError(true);
            setAlert("Password length more than 4 letters ")
            return false;
        }

        if (!test) {
            password.current.value = '';
            password.current.focus();
            setError(true);
            setAlert("Password or Login is incorrect!");
            return false;
        }

        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate(username, password);
        if (isValid) {
            setError(false);
            setError('');
            localStorage.setItem('token', JSON.stringify(Date.now()));
            localStorage.setItem('username', JSON.stringify(username.current.value))
            navigate('/')
        }
    }

  return (
    <div>
    <form onSubmit={handleSubmit} className={styles.form}>  
        <h1 className={styles.title}>Login</h1>
        {
            error && 
            <Alert sx={{marginBottom: '15px'}} severity="error">{alert}</Alert>
        }
   
        <div className="form-floating mb-3">
            <input ref={username} type="text" className="form-control" id="floatingInput" placeholder="Username" />
            <label htmlFor="floatingInput">Username</label>
        </div>
      
        <div className="form-floating mb-3">
            <input ref={password} type="password" className="form-control" id="floatingInput" placeholder="Password" />
            <label htmlFor="floatingInput">Password</label>
        </div>
    
        <button className='btn btn-primary w-100 mt-3 fs-5'>Login</button>
    </form>
    <span className={styles.span}>
        Don’t have an account?
        <NavLink className={styles.link} to="/registr">Sign Up</NavLink>
    </span>
</div>
  )
}

export default Registr