import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View ,Image} from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage) 
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Chat");
        // ...
      } else {
        // User is signed out
        navigation.canGoBack() && navigation.popToTop();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
     <Image
                style={styles.logo}
                source={require('../assets/logo1.png')}
                
            />
      <Input
        placeholder="Enter your email"
        label="Email"
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        
        placeholder="Enter your password"
        label="Password"
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.mybutton}>
        <Button title="Sign In" onPress={signIn}
          buttonStyle={{
            backgroundColor: "#7ae1ae"
         }}  />
      </View>
      <View style={styles.mybutton}>
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop:20,
  },
  mybutton: {
    width: 200,
    margin: 10,
    
  
  },
  logo:{
    width:100,
    height:100,
    margin:20,

},
});
