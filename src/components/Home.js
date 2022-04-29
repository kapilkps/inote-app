import React from 'react'
import { Notes } from './Notes'
import { Addnote } from './Addnote'
import { Alert } from './Alert'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const [alert, setAlert] = React.useState({type:'',msg:''});
    const history=useNavigate();
    const showAlert=(t='',m='')=>{
        setAlert({type:t,msg:m});
         setTimeout(()=>{
        setAlert({type:'',msg:''});
         },5000)
    }
    React.useEffect(() => {
      if(!localStorage.getItem('token')){
        history('/login');
      }
    }, [])
    
    return (
        <div>
            <div className="container my-4">
                <Alert data={alert}></Alert>
                <Addnote alert={showAlert}/>
                <Notes alert={showAlert} />
            </div>
        </div>
    )
}
