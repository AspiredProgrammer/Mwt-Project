const Login = ({ navigation }) => {
    const [icon, setIcon] = useState("eye-off");
    const [passVisibility, setPassVisibility] = useState(true);
  
    const dispatch = useDispatch()
    const errorMsg = useSelector((state) => state.users.errorMessage)
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayError, setDisplayError] = useState(false)
    
    const handlePassVisibility = () => {
      if (icon == "eye-off"){
          setIcon("eye");
          setPassVisibility(!passVisibility);
      }else if (icon == "eye"){
          setIcon("eye-off");
          setPassVisibility(!passVisibility);
      }
    }
  
    const actionHandler = () => {
     let user = {email, password}
     dispatch(login(user))
  
      if (errorMsg != ""){
          setDisplayError(true)
      }
      else {
        setDisplayError(false)
        navigation.navigate("Home")
      }
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
  
          <Image style={[{marginTop: 15}]} source={require("../assets/blackWhiteLogo.png")}/>
  
          <Text style={styles.heading}>Sign in</Text>
  
          <View>
            <Text style={styles.text}>
              Enter your email address:
            </Text>
              <TextInput
                style={styles.inputFields}
                value={email}
                onChangeText={setEmail}
                textContentType="emailAddress"
              />
          </View>
          <View>
  
            <View style={[{flexDirection: "row"}, styles.text]}>
              <Text>
                Enter your password:
              </Text>
  
              <Pressable onPress={handlePassVisibility} style={[{alignSelf: "center"}]}>
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
  
          {displayError && <Text style={styles.error}>{errorMsg}</Text>}
  
          <TouchableOpacity onPress={actionHandler}>
            
            <View style={[styles.button, {backgroundColor:"#C1666B"}]}>
              <Text style={[{color: "#fff"}]}>Sign in</Text>
            </View>
  
          </TouchableOpacity>
            
  
          <Text style={[{marginTop: 5}]}>
            Haven't registered? Register here!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            
            <View style={[styles.button, { backgroundColor: "#9F4146"}]}>
              <Text style={[{color: "#fff"}]}>Create an account</Text>
            </View>
  
          </TouchableOpacity>
            <Text>{email}, {password}</Text>
        </View>
      </View>
    );
  };