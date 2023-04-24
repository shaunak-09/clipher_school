import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./landingpage.css";
import CryptoJS from "crypto-js";
function Landingpage(props) {
  // const [logstat,setlogstat]=useState()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gitlink, setGitlink] = useState("");
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [fblink, setFblink] = useState("");
  const [weblink, setWeblink] = useState("");
  const [linkedlink, setLinkedlink] = useState("");
  const [highed, setHighed] = useState("");
  const [interests, setInterests] = useState([]);
  const [currpos, setCurrpos] = useState("");
  const secretPass = "Clipherschool";
  // var username,gitlink,email,about,password,fblink,weblink,linkedlink,highed,interests,currpos;
  useEffect(() => {
    props.setLogstat(sessionStorage.getItem("logstat"));
    waitForElm(".submit")
      .then((el) => {
        el.disabled = true;
      })
      .catch((err) => console.log(err));
  
    waitForElm("textarea").then((el) => {
      el.disabled = true;
    });
   

    // document.querySelectorAll("select").forEach(item=>item.disabled=true)
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("logstat") == 1) {
      // console.log(1);
      const token = JSON.parse(localStorage.getItem("user_info")).token;
      // console.log(token);
      axios
        .get("http://localhost:5000/api/profile/", {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          // console.log(res.data);
          setUsername(res.data.username);
          //  console.log(username);
          setEmail(res.data.email);
          setAbout(res.data.about);
          const bytes = CryptoJS.AES.decrypt(res.data.password, secretPass);
          // console.log(bytes);
          const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          setPassword(data);
          setGitlink(res.data.links[0].Github);
          setFblink(res.data.links[0].Facebook);
          setWeblink(res.data.links[0].Website);
          setLinkedlink(res.data.links[0].linkedlink);
          setHighed(res.data.profinf[0].highed);
          setCurrpos(res.data.profinf[0].currpos);
          setInterests(res.data.interests);
          //  console.log(interests);
        })
        .catch((err) => {
          console.log(err);
        });
      //   console.log(document.querySelectorAll("input"));
      document.querySelectorAll("input").forEach((el)=>el.disabled=true)
      document.querySelectorAll("select").forEach((el)=>el.disabled=true)
      //  document.getElementsByClassName("submit")[0].style.opacity="0"
      //  document.getElementsByClassName("submit")[0].disabled=true
      //    document.getElementsByClassName("edit")[0].style.opacity=1;
    }
    // console.log(username);
  }, [props.logstat]);
  function waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }
  const handleclick = () => {
    props.setloginsignup(true);
  };
  const handleclick1 = () => {
    props.setLogstat(0);
    localStorage.removeItem("user_info");
    sessionStorage.removeItem("logstat");

    toast.success("Logged out successfully");
  };
  const handleSubmit = (e) => {
    // console.log(username, email, gitlink, about, fblink, currpos, highed);
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user_info")).token;
    axios
      .post(
        "http://localhost:5000/api/profile/",
        {
          username,
          email,
          password,
          about,
          links: {
            Linkedin: linkedlink,
            Github: gitlink,
            Facebook: fblink,
            Website: weblink,
          },
          profinf: {
            highed: highed,
            currpos: currpos,
          },
          interests,
        },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        // console.log(res.data);
        toast.success("Profile updated successfully");
        setUsername(res.data.username);
      
        setEmail(res.data.email);
        setAbout(res.data.about);
        const bytes = CryptoJS.AES.decrypt(res.data.password, secretPass);
        // console.log(bytes);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        setPassword(data);
        setGitlink(res.data.links[0].Github);
        setFblink(res.data.links[0].Facebook);
        setWeblink(res.data.links[0].Website);
        setLinkedlink(res.data.links[0].linkedlink);
        setHighed(res.data.profinf[0].highed);
        setCurrpos(res.data.profinf[0].currpos);
        setInterests(res.data.interests);
        document.getElementsByClassName("submit")[0].style.opacity = 0.6;
        document.getElementsByClassName("submit")[0].disabled = true;
        document.getElementsByClassName("edit")[0].disabled = false;
        document.getElementsByClassName("edit")[0].style.opacity = 1;
        const inputs = document.querySelectorAll("input");
        inputs.forEach((item) => {
          item.disabled = true;
        });
        document.querySelector("textarea").disabled = true;
        document
          .querySelectorAll("select")
          .forEach((item) => (item.disabled = true));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleedit = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((item) => {
      item.disabled = false;
    });
    document.querySelector("textarea").disabled = false;
    document
      .querySelectorAll("select")
      .forEach((item) => (item.disabled = false));
    document.getElementsByClassName("submit")[0].style.opacity = 1;
    document.getElementsByClassName("submit")[0].disabled = false;
    document.getElementsByClassName("edit")[0].disabled = true;
    document.getElementsByClassName("edit")[0].style.opacity = 0.6;
  };
  return (
    <div className="flex flex-col">
      <ToastContainer />
      {props.logstat == 1 ? (
        <>
          <button
            className="p-3 bg-blue-500  top-2 z-20  right-3 absolute font-bold rounded-xl"
            onClick={handleclick1}
          >
            LOGOUT
          </button>
       
          <div className="w-[100%] bg-gray-800 p-4 top-0  flex flex-col ">
         
            <p className="text-orange-300 px-3 text-2xl font-extrabold">
              Hello, {username}
            </p>
            <p className="px-2 text-orange-600 ">{email}</p>
          </div>

          <form className="flex flex-col p-5 justify-center items-center text-justify">
            <button
              className="edit p-3 bg-orange-300 rounded-xl font-black text-lg my-3"
              onClick={handleedit}
            >
              EDIT
            </button>
            <div className="flex flex-row inputfield">
              <label>Name:</label>
              <input
                className="px-3 mx-2 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg"
                type="text"
                name="name"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-row inputfield">
              <label>Email:</label>
              <input
                className="px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg"
                type="text"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-row inputfield">
              <label>Password:</label>
              <input
                className="px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
           
            <div className="flex flex-row inputfield">
              <label>About</label>
              <textarea
                name="about"
                className="px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg"
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col inputfield">
              <p className="text-xl font-bold py-4">Links</p>
              <div className="flex flx-row my-2">
                <label>Github:</label>
                <input
                  className="px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg"
                  type="text"
                  name="gitlink"
                  value={gitlink}
                  onChange={(e) => {
                    setGitlink(e.target.value);
                  }}
                />
              </div>
              <div className="flex flx-row my-2">
                <label>Facebook:</label>
                <input
                  className="px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg"
                  type="text"
                  name="fblink"
                  value={fblink}
                  onChange={(e) => {
                    setFblink(e.target.value);
                  }}
                />
              </div>
              <div className="flex flx-row my-3">
                <label>Website:</label>
                <input
                  className="px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg"
                  type="text"
                  name="weblink"
                  value={weblink}
                  onChange={(e) => {
                    setWeblink(e.target.value);
                  }}
                />
              </div>
              <div className="flex flx-row my-3">
                <label>Linkedin:</label>
                <input
                  className="px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg"
                  type="text"
                  name="linkedlink"
                  value={linkedlink}
                  onChange={(e) => {
                    setLinkedlink(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-bold py-4">Professional information</p>
              <div className="flex flex-row inputfield">
                <label>Highest education</label>
                <select
                  className="px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg"
                  name="highed"
                  value={highed}
                  onChange={(e) => {
                    setHighed(e.target.value);
                  }}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="graduation">Graduation</option>
                  <option value="postgraduation">Post Graduation</option>
                </select>
              </div>
              <div className="flex flex-row inputfield">
                <label>What do you do currently?</label>
                <select
                  className="px-3 py-1 bg-gray-200 border-2 border-gray-400 rounded-lg"
                  name="currpos"
                  value={currpos}
                  onChange={(e) => {
                    setCurrpos(e.target.value);
                  }}
                >
                  <option value="schooling">Schooling</option>
                  <option value="college student">College student</option>
                  <option value="job">Job</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col inputfield">
              <p className="text-xl font-bold py-3">Interests</p>
              <div className="flex flex-row inputfield">
                {/* {console.log(interests)} */}
                {interests.length != 0 &&
                  interests.map((item) => <p className="pr-3">{item}</p>)}
              </div>
            </div>

            <button
              type="submit"
              className="p-4 bg-orange-300 rounded-xl font-black text-lg my-3 submit opacity-50"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              SUBMIT
            </button>
            {/* {document.getElementsByClassName("submit")[0].disabled=true} */}
          </form>
        </>
      ) : (
        <>
          <button
            class="p-3 bg-blue-500 left-10 top-2 absolute font-bold rounded-xl"
            onClick={handleclick}
          >
            SIGNUP
          </button>
          <div className="bg-gray-600 h-[100vh]">
            <h1 class="flex  justify-center  text-orange-200 text-3xl font-black ">
              Pls login first
            </h1>
          </div>
        </>
      )}
    </div>
  );
}

export default Landingpage;
