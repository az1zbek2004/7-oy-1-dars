import React, { useRef, useState } from 'react'
import { Alert } from '@mui/material';
import styles from './style.module.css'
import { NavLink, useNavigate } from 'react-router-dom'

function Registr() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [alert, setAlert] = useState('Error');
    const name = useRef();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const repassword = useRef();

    function validate(name, username, email, password, repassword) {
        const test = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).some((item) => item.username == username.current.value) : false
        const mail = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).some((item) => item.email == email.current.value) : false
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (name.current.value.length < 4) {
            name.current.value = '';
            name.current.focus();
            setError(true);
            setAlert("Name length more than 4 letters ")
            return false;
        }
        if (username.current.value.length < 4) {
            username.current.value = '';
            username.current.focus();
            setError(true);
            setAlert("Username length more than 4 letters ")
            return false;
        }
        if (!email.current.value.match(validRegex)) {
            email.current.value = '';
            email.current.focus();
            setError(true);
            setAlert("Error email adress")
            return false;
        }
        if (password.current.value.length < 4) {
            password.current.value = '';
            password.current.focus();
            setError(true);
            setAlert("Password length more than 4 letters ")
            return false;
        }
        if (!repassword.current.value) {
            repassword.current.value = '';
            repassword.current.focus();
            setError(true);
            setAlert("Enter repassword!")
            return false;
        }
        if (password.current.value != repassword.current.value) {
            repassword.current.value = '';
            password.current.focus();
            setError(true);
            setAlert("Enter to return password!")
            return false;
        }
        if (test) {
            username.current.value = '';
            username.current.focus();
            setError(true);
            setAlert("This username already exists!")
            return false;
        }
        if (mail) {
            email.current.value = '';
            email.current.focus();
            setError(true);
            setAlert("This email already exists!")
            return false;
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validate(name, username, email, password, repassword);
        if (isValid) {
            setError(false);
            setError('');
            let user = {
                name: name.current.value,
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }

            let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
            users.push(user);

            localStorage.setItem('users', JSON.stringify(users));
            name.current.value = '';
            username.current.value = '';
            email.current.value = '';
            password.current.value = '';
            navigate('/login', { state: { username: user.username, password: user.password } })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>Sign up</h1>
                {
                    error &&
                    <Alert sx={{ marginBottom: '15px' }} severity="error">{alert}</Alert>
                }
                <div className="form-floating mb-3">
                    <input ref={name} type="text" className="form-control" id="floatingInput" placeholder="Name" />
                    <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input ref={username} type="text" className="form-control" id="floatingInput" placeholder="Username" />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input ref={email} type="email" className="form-control" id="floatingInput" placeholder="example@gmail.com" />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input ref={password} type="password" className="form-control" id="floatingInput" placeholder="Password" />
                    <label htmlFor="floatingInput">Password</label>
                </div>
                <div className="form-floating">
                    <input ref={repassword} type="password" className="form-control" id="floatingPassword" placeholder="Repassword" />
                    <label htmlFor="floatingPassword">Repassword</label>
                </div>
                <button className='btn btn-primary w-100 mt-3 fs-5'>Create an account</button>
            </form>
            <span className={styles.span}>
                Already have an account?
                <NavLink className={styles.link} to="/login">Login</NavLink>
            </span>
        </div>
    )
}

export default Registr