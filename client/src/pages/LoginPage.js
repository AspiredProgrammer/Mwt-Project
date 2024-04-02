import { useState } from "react";
import "./src/styles.css"

const Login = ({ navigation }) => {  
    const errorMsg = useSelector((state) => state.users.errorMessage)
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayError, setDisplayError] = useState(false)
    
    const actionHandler = () => {
     let user = {email, password}
     
  
      if (errorMsg != ""){
          setDisplayError(true)
      }
      else {
        setDisplayError(false)
        navigation.navigate("Home")
      }
    }
  
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
                onChange={setEmail}
                type="url"
                required
              />
          </div>
          <div>
  
          <d id="text" style={[{flexDirection: "row"}]}>
              Enter your password:
          </div>
  
            <input
              id="inputFields"
              value={password}
              onChange={setPassword}
            />
            
          </div>
  
          {displayError && <div id="error">{errorMsg}</div>}
  
          <button id="button" style={{backgroundColor: "#C1666B", color: "#fff"}} onClick={actionHandler}>
              Sign in  
          </button>
            
  
          <div style={[{marginTop: 5}]}>
            Haven't registered? Register here!
          </div>
          <div onClick={() => navigation.navigate("Register")}>
            
            <div id="button" style={ {backgroundColor: "#9F4146"}}>
              <div style={[{color: "#fff"}]}>Create an account</div>
            </div>
  
          </div>
            <div>{email}, {password}</div>
        </div>
      </div>
    );
  };
  export default Login