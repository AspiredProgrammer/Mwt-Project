// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { useState } from "react";
import "./src/styles.css"

const Login = ({ navigation }) => {  
    // const errorMsg = useSelector((state) => state.users.errorMessage)
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [displayError, setDisplayError] = useState(false)
    const [errors, setErrors] = useState()
    
    const actionHandler = async (e) => {
     e.preventDefault(); 
     try { 
      const response = await fetch("http://localhost:8000/user/login", { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json", 
        }, 
        body: JSON.stringify({ email, password }), 
      }); 
      if (!response.ok) { 
        const errorData = await response.json(); 
        if (errorData.errors) { 
          setErrors(errorData.errors.map((err) => err.msg)); 
        } else { 
          throw new Error(errorData.msg || "An error occurred"); 
        } 
        return; 
      } 
      const data = await response.json(); 
      const token = data.token; 
      localStorage.setItem("token", token); 
      console.log("Login successful"); 
      window.location.href = "/"; 
    } catch (error) { 
      setErrors(error.message); 
    } 
  };
  
    return (
      <div id="container">
        <div id="subContainer">
  
          <img style={[{marginTop: 15}]} src="./client/assets/e-Shop.png" alt="Logo"/>
  
          <div id="heading">Sign in</div>
  
          <div>
            <label id="text" for="email">
              Enter your email address:
            </label>
              <input
                name="email"
                id="inputFields"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
          </div>
          <div>
  
          <div id="text" style={[{flexDirection: "row"}]}>
              Enter your password:
          </div>
  
            <input
              id="inputFields"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            
          </div>
  
          {/* {displayError && <div id="error">{errorMsg}</div>} */}
  
          <button id="button" style={{backgroundColor: "#C1666B", color: "#fff"}} onClick={actionHandler}>
              Sign in  
          </button>
            
          <div style={[{marginTop: 5}]}>
            Haven't registered? Register here!
          </div>
          
          <button id="button" style={ {backgroundColor: "#9F4146", color: "#fff"}} onClick={() => navigation.navigate("Register")}>
            Create an account
          </button>

            <div>{email}, {password}</div>
        </div>
      </div>
    );
  };
  export default Login