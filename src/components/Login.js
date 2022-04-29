import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [login, setLogin] = React.useState({email:'',password:''});
    const email = React.useRef(null);
    const history=useNavigate();
    const action=async (obj)=>{
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
          });
          const token=await response.json();
          localStorage.setItem('token',token.authToken);
          history('/');
    }
    const handleChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})         
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        action(login);
    }
    React.useEffect(() => {
        if(localStorage.getItem('token')){
          history('/');
        }
      }, [])
    return (
        <div>
            <div className="container">
                <h3 className='my-3'>Login</h3>
                <form id='form' onSubmit={handleSubmit} method="post" >
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={handleChange} ref={email} placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={handleChange} rows="3" />
                    </div>
                    <button className='btn btn-success' type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login