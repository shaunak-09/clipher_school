import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import "./landingpage.css"
function Landingpage(props) {
    const handleclick=()=>{
      props.setloginsignup(true)
    }
    const handleclick1=()=>{
      localStorage.removeItem("user_info");
      sessionStorage.removeItem("logstat");
    }
    const handleSubmit=()=>{

    }
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [gitlink, setGitlink] = useState("")
    const [about, setAbout] = useState("")
    const [password, setPassword] = useState("")
    const [fblink, setFblink] = useState("")
    const [weblink, setWeblink] = useState("")
    const [linkedlink, setLinkedlink] = useState("")
    const [highed, setHighed] = useState("")
    const [interests, setInterests] = useState([])
    const [currpos, setCurrpos] = useState("")
    // var username,gitlink,email,about,password,fblink,weblink,linkedlink,highed,interests,currpos;
    useEffect(()=>{
        if(sessionStorage.getItem("logstat")==1)
       
      {
        const token=JSON.parse(localStorage.getItem("user_info")).token
        // console.log(token);
        axios.get("http://localhost:5000/api/profile/",{headers:{'x-access-token':token}})
      .then((res)=>{
        console.log(res.data);
         setUsername(res.data.username);
        //  console.log(username);
         setEmail(res.data.email);
        //  about=res.data.about
        
         setPassword(res.data.password)
         setGitlink(res.data.links[0].Github)
         setFblink(res.data.links[0].Facebook)
         setWeblink(res.data.links[0].Website)
         setLinkedlink(res.data.links[0].linkedlink)
         setHighed(res.data.profinf[0].highed)
         setCurrpos (res.data.profinf[0].currpos)
         setInterests(res.data.interests)
        //  console.log(interests);


      })
      .catch((err)=>{
        console.log(err.response.data);
      })

    }
    console.log(username); 
      
    },[])
  return (
    <div className="flex flex-col">
        
        <ToastContainer />
        {JSON.parse(sessionStorage.getItem("logstat"))==1 ? 
        (
        <>
        <button className="p-3 bg-blue-500  top-2 z-20  right-3 absolute font-bold" onClick={handleclick1}>logout</button>
       {/* {console.log(username)} */}
        <div className="w-[100%] bg-gray-800 p-4 top-0  flex flex-col ">
            {/* {console.log(username)} */}
            <p className="text-orange-300 px-3 text-2xl font-extrabold">Hello, {username}</p>
            <p className="px-2 text-orange-600 ">{email}</p>
         </div>
         <form className="flex flex-col p-5 justify-center items-center text-justify">
            <div className="flex flex-row inputfield">
            <label>Name:</label>
            <input className='px-3 mx-2 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' type="text"name="name" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>
            <div className="flex flex-row inputfield">
            <label>Email:</label>
            <input className='px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' type="text"name="email" value={email} onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>
            <div className="flex flex-row inputfield">
            <label>Password:</label>
            <input className='px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' type="password"name="password" value={password} onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>
            {/* <div className="flex flex-row inputfield">
            <label>Password</label>
            <input className='px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' value={password}/>
            </div> */}
            <div className="flex flex-row inputfield">
                <label>About</label>
                <textarea name="about" className='px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' value={about} onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>
            <div className="flex flex-col inputfield">
               <p className="text-xl font-bold py-4">Links</p>
               <div className="flex flx-row my-2">
                <label>Github:</label>
                <input className='px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' type="text"name="gitlink" value={gitlink} onChange={(e)=>{setUsername(e.target.value)}} />
               </div>
               <div className="flex flx-row my-2">
                <label>Facebook:</label>
                <input className='px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' type="text" name="fblink" value={fblink} onChange={(e)=>{setUsername(e.target.value)}} />
               </div>
               <div className="flex flx-row my-3">
                <label>Website:</label>
                <input className='px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' type="text" name="weblink" value={weblink} onChange={(e)=>{setUsername(e.target.value)}} />
               </div>
               <div className="flex flx-row my-3">
                <label>Linkedin:</label>
                <input className='px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' type="text" name="linkedlink" value={linkedlink} onChange={(e)=>{setUsername(e.target.value)}}/>
               </div>

            </div>
            <div className="flex flex-col">
              <p className="text-xl font-bold py-4">Professional information</p>  
              <div className="flex flex-row inputfield">
                <label>Highest education</label>
                <select className='px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' name="highed" value={highed} onChange={(e)=>{setUsername(e.target.value)}}>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="graduation">Graduation</option>
                    <option value="postgraduation">Post Graduation</option>
                </select>
              </div>
              <div className="flex flex-row inputfield">
                <label>What do you do currently?</label>
                <select className='px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg' name="currpos" value={currpos} onChange={(e)=>{setUsername(e.target.value)}}>
                  <option  value="schooling">Schooling</option>
                  <option  value="college student">Collegestudent</option>
                  <option  value="schooling">Schooling</option>
                  <option  value="schooling">Schooling</option>
                </select>
              </div>   
            </div>
            <div className="flex flex-col inputfield">
            <p className="text-xl font-bold py-3">Interests</p>
            <div className="flex flex-row inputfield">
              {/* {console.log(interests)} */}
              {
              interests.length!=0 && (interests).map((item)=>(
                <p className='pr-3'>{item}</p>
              ))}
            </div>

            </div>
            
            
            <button type="submit" className="p-4 bg-orange-300 rounded-xl font-black text-lg my-3" onClick={handleSubmit}>SUBMIT</button>
         </form>
        </>
        ): 
        (
        <>
        <button class="p-3 bg-blue-500 left-10 top-2" onClick={handleclick}>signup</button>
        <h1 class="flex flex-col justify-center items-center">Pls login first</h1>
         
        </>
        )}
         

    </div>
    
  )
}

export default Landingpage