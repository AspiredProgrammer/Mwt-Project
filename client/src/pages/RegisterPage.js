// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [icon, setIcon] = useState(FaRegEyeSlash);
    const [passVisibility, setPassVisibility] = useState(true);
    const [showConfirmPass, setShowConfirmPass] = useState(true)
  
    const [errors, setErrors]=useState([]);

    const[formData,setFormData]=useState({
      name:"",
      email:"",
      password:"",
      confirm_password:"",
    });
  
    // const dispatch = useDispatch()
    // const errorMsg = useSelector((state) => state.users.errorMessage)
  
    const handlePassVisibility = () => {
      if (icon === FaRegEyeSlash){
          setIcon(FaRegEye);
          setPassVisibility(!passVisibility);
      }else if (icon === FaRegEye){
          setIcon(FaRegEyeSlash);
          setPassVisibility(!passVisibility);
      }
    }
    const handleConfirmPass = () => {
      if (icon === FaRegEyeSlash){
        setIcon(FaRegEye);
        setShowConfirmPass(!showConfirmPass);
      }
      else if (icon === FaRegEye){
        setIcon(FaRegEyeSlash);
        setShowConfirmPass(!showConfirmPass);
      }
    }
  
    // const registerHandler = () => {
    //   if(name === "" || email === "" || password === "" || confirmPass === "" ){
    //     setEmptyField(!emptyField)
    //   }
    //   else if (password !== confirmPass){
    //     setEmptyField(false)
    //     setPassError(true)
    //   }
    //   else {
    //     setEmptyField(true)
    //     setPassError(false)
        
    //     let user = {name, email, password}
    //   //  console.log( dispatch(registerUser(user)))
  
    //     if(errorMsg != ""){
    //       setUserError(true)
    //       setEmptyField(false)
    //       setPassError(false)
    //     }
    //     else{
    //       setEmptyField(false)
    //       setPassError(false)
    //       setUserError(false)
    //       navigation.navigate("Home")
    //     }
    //   }
      
    // }

    const handleSubmit = async(e)=> {
      e.preventDefault();

      const fieldErrors=[];

      if(!formData.name){
        fieldErrors.push("Name is required")
      }
      if(!formData.email){
        fieldErrors.push("Email is required")
      }
      if(!formData.password){
        fieldErrors.push("Password is required")
      }
      if(!formData.confirm_password){
        fieldErrors.push("Confirm password is required")
      }

      if(fieldErrors.length>0){
        setErrors(fieldErrors.map((msg,index)=>({id:index, msg})));
        return;
      }

      try { 
        const response = await fetch("http://localhost:8000/user/register", { 
          method: "POST", 
          headers: { 
            "Content-Type": "application/json", 
          }, 
          body: JSON.stringify(formData), 
        }); 

        const data = await response.json(); 
        if (!response.ok) {  
          setErrors(data.errors || []); 
        } else { 
          
          console.log("User registered successfully"); 
          alert("registration successful"); 
          window.location.href = "/login"; 
        } 
      } catch (error) { 
        console.error("Error registering user:", error); 
      } 
    }; 
    
    const handleChange = (e) => { 
      setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value, 
      }); 
    };


    return (
      <div id="container">
        <div id="subcontainer">
  
          <img style={[{marginTop: 15}]} src="../assets/blackWhiteLogo.png" alt="logo"/>
  
          <div id="heading">Register</div>
  
          <div id="grouping">
            <label id="text" for="name">
              Your name:
            </label>
              <input
                name="name"
                id="inputFields"
                value={name}
                onChange={setName}
                type="name"
              />
          </div>
          <div id="grouping">
            <label id="text" for="email">
              Your email address:
            </label>
            <input
              name="email"
              id="inputFields"
              value={email}
              onChange={setEmail}
              type="email"
            />
          </div>
  
          <div id="grouping">
            <div style={[{flexDirection: "row"}]}>
  
              <div>
                Your password:
              </div>
  
            </div>
              <input
                id="inputFields"
                value={password}
                onChange={setPassword}
                securedivEntry={passVisibility}
                autoComplete="off"
                type="password"
                autoCapitalize="none"
              />
            
          </div>
  
          <div id="grouping">
          <div style={[{flexDirection: "row"}]}>
  
            <p>
              Confirm password:
            </p>
  
            </div>
            <input
              id="inputFields"
              autoComplete="off"
              onChangediv={setConfirmPass}
              type="password"
              autoCapitalize="none"
            />
          </div>
          {errors && <div id="error"> {}</div>}
  
          <button onClick={handleSubmit} style={[styles.button, { backgroundColor: "#9F4146"}]}>
            Complete registration
          
          </button>
        </div>
        
      </div>
    );
};
export default Register;