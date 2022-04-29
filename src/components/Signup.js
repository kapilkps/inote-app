import React from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [signup, setSignup] = React.useState({});
    const {name,email,password,cpassword} =signup;
    const history = useNavigate();
    const action = async (obj) => {
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });
        const token = await response.json();
        localStorage.setItem('token', token.authToken);
        history('/');
    }
    const handleChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password===cpassword){
            action({name,email,password});
        }else{
            alert('confirm password is incorrect');
        }
        
    }
    React.useEffect(() => {
        if(localStorage.getItem('token')){
          history('/');
        }
      }, [])
    return (
        <div>
            <div className="container">
                <h3 className='my-3'>Signup</h3>
                <form id='form' onSubmit={handleSubmit} method="post" >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="name" name='name' onChange={handleChange} placeholder="User name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={handleChange} placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={handleChange} rows="3" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={handleChange} rows="3" />
                    </div>
                    <button className='btn btn-success' type="submit">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup