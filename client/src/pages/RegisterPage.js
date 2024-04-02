import React, { useState } from "react";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [icon, setIcon] = useState("eye-off");
    const [passVisibility, setPassVisibility] = useState(true);
    const [showConfirmPass, setShowConfirmPass] = useState(true)
  
    const [passError, setPassError] = useState(false)
    const [emptyField, setEmptyField] = useState(false)
    const [userError, setUserError] = useState(false)
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
      if (icon == "eye-off"){
          setIcon("eye");
          setPassVisibility(!passVisibility);
      }else if (icon == "eye"){
          setIcon("eye-off");
          setPassVisibility(!passVisibility);
      }
    }
    const handleConfirmPass = () => {
      if (icon == "eye-off"){
        setIcon("eye");
        setShowConfirmPass(!showConfirmPass);
    }else if (icon == "eye"){
        setIcon("eye-off");
        setShowConfirmPass(!showConfirmPass);
    }
    }
  
    const registerHandler = () => {
      if(name == "" || email == "" || password == "" || confirmPass == "" ){
        setEmptyField(!emptyField)
      }
      else if (password != confirmPass){
        setEmptyField(false)
        setPassError(true)
      }
      else {
        setEmptyField(true)
        setPassError(false)
        
        let user = {name, email, password}
       console.log( dispatch(registerUser(user)))
  
        if(errorMsg != ""){
          setUserError(true)
          setEmptyField(false)
          setPassError(false)
        }
        else{
          setEmptyField(false)
          setPassError(false)
          setUserError(false)
          navigation.navigate("Home")
        }
      }
      
    }

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
      <div style={styles.container}>
        <div style={styles.subContainer}>
  
          <img style={[{marginTop: 15}]} source={require("../assets/blackWhiteLogo.png")}/>
  
          <div style={styles.heading}>Register</div>
  
          <div style={styles.grouping}>
            <div style={styles.div}>
              Your name:
            </div>
              <input
                style={styles.inputFields}
                value={name}
                onChangediv={setName}
                divContentType="name"
              />
          </div>
          <div style={styles.grouping}>
            <div>
              Your email address:
            </div>
            <input
              style={styles.inputFields}
              keyboardType="email-address"
              value={email}
              onChangediv={setEmail}
              divContentType="emailAddress"
            />
          </div>
  
          <div style={styles.grouping}>
            <div style={[{flexDirection: "row"}]}>
  
              <div>
                Your password:
              </div>
              <Pressable onPress={handlePassVisibility}>
                <MaterialCommunityIcons name={icon} size={22} color="#9F4146"/>
              </Pressable>
  
            </div>
              <input
                style={styles.inputFields}
                value={password}
                onChangediv={setPassword}
                securedivEntry={passVisibility}
                autoComplete="off"
                divContentType="password"
                autoCapitalize="none"
              />
            
          </div>
  
          <div style={styles.grouping}>
          <div style={[{flexDirection: "row"}]}>
  
            <div>
              Confirm password:
            </div>
            <Pressable onPress={handleConfirmPass}>
              <MaterialCommunityIcons name={icon} size={22} color="#9F4146"/>
            </Pressable>
  
            </div>
            <input
              style={styles.inputFields}
              autoComplete="off"
              onChangediv={setConfirmPass}
              securedivEntry={showConfirmPass}
              divContentType="password"
              autoCapitalize="none"
            />
          </div>
          {passError && <div style={styles.error}> Passwords do not match!</div>}
          {emptyField && <div style={styles.error}> All fields must be filled!</div>}
  
          <button onClick={registerHandler} style={[styles.button, { backgroundColor: "#9F4146"}]}>
          Complete registration
        
          </button>
        </div>
        
      </div>
    );
};
export default Register;