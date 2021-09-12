import "./login.css";
import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from "nanoid";

async function loginUser(credentials) {
    const fetchObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials, null, 2)
    }
    console.log(fetchObj);
    return fetch('http://localhost:3000/login', fetchObj)
            .then(response => response.json())
}

const Login = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            id: nanoid(),
            username,
            password
        });
        console.log(token);
        setToken(token);
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default Login;
