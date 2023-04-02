import React, { useState } from 'react';
import firebaseApp from '../credentials';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebaseApp);

const LoginForm = ({ register, setRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (register) {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        else {
            await signInWithEmailAndPassword(auth, email, password);
        }

    }

    return (
        <div className='mt-5 ms-5'>
            <h1>{register ? 'sign up' : 'Log in'}</h1>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="email" className='form-label'>Email address</label>
                    <input autoComplete='current-username' required type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label className='form-label' htmlFor="password">Password</label>
                    <input autoComplete='current-password' required type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="my-1 btn btn-primary">Submit</button>
            </form>
            <div className='form-group'>
                <button onClick={() => setRegister((prev) => !prev)} className='btn btn-secondary mt-4 form-control'>
                    {register ? 'Already have an account? log in' : "Are not account? Sign up"}
                </button>

            </div>
        </div>
    );
}

export default LoginForm;