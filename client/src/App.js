import { useEffect, useState } from 'react';
import './App.css';
import Landingpage from './components/landingpage/landingpage';
import Modal from './components/Login/components/Modal';

function App() {
  const [loginsignup, setLoginsignup] = useState(false)
  const toggleLoginModal = () => {
    setLoginsignup(!loginsignup);
  };
  useEffect(()=>{
    if(localStorage.getItem("logstat")==null)
    localStorage.setItem("logstat",0)
  },[])
  
  
  return (
    <div className="App">
      
     <Landingpage setloginsignup={toggleLoginModal}/> 

     {
      loginsignup && <Modal setOpenModal={toggleLoginModal}/>
     }
    </div>
  );
}

export default App;
