const Register = ({ navigation }) => {
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
  
    const dispatch = useDispatch()
    const errorMsg = useSelector((state) => state.users.errorMessage)
  
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
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
  
          <Image style={[{marginTop: 15}]} source={require("../assets/blackWhiteLogo.png")}/>
  
          <Text style={styles.heading}>Register</Text>
  
          <View style={styles.grouping}>
            <Text style={styles.text}>
              Your name:
            </Text>
              <TextInput
                style={styles.inputFields}
                value={name}
                onChangeText={setName}
                textContentType="name"
              />
          </View>
          <View style={styles.grouping}>
            <Text>
              Your email address:
            </Text>
            <TextInput
              style={styles.inputFields}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              textContentType="emailAddress"
            />
          </View>
  
          <View style={styles.grouping}>
            <View style={[{flexDirection: "row"}]}>
  
              <Text>
                Your password:
              </Text>
              <Pressable onPress={handlePassVisibility}>
                <MaterialCommunityIcons name={icon} size={22} color="#9F4146"/>
              </Pressable>
  
            </View>
              <TextInput
                style={styles.inputFields}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={passVisibility}
                autoComplete="off"
                textContentType="password"
                autoCapitalize="none"
              />
            
          </View>
  
          <View style={styles.grouping}>
          <View style={[{flexDirection: "row"}]}>
  
            <Text>
              Confirm password:
            </Text>
            <Pressable onPress={handleConfirmPass}>
              <MaterialCommunityIcons name={icon} size={22} color="#9F4146"/>
            </Pressable>
  
            </View>
            <TextInput
              style={styles.inputFields}
              autoComplete="off"
              onChangeText={setConfirmPass}
              secureTextEntry={showConfirmPass}
              textContentType="password"
              autoCapitalize="none"
            />
          </View>
          {passError && <Text style={styles.error}> Passwords do not match!</Text>}
          {emptyField && <Text style={styles.error}> All fields must be filled!</Text>}
  
          <TouchableOpacity onPress={registerHandler}>
            
            <View style={[styles.button, { backgroundColor: "#9F4146"}]}>
              <Text style={[{color: "#fff",}]}>Complete registration</Text>
            </View>
  
          </TouchableOpacity>
        </View>
        
      </View>
    );
};