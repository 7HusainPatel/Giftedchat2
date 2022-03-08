import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState('');

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
       
        user
          .updateProfile({
            displayName: name,
            photoURL: imageURL? imageURL: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F799%2F987%2Fpng-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png&imgrefurl=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Davatar&tbnid=yOtkbrQuOOYhTM&vet=12ahUKEwj6p-OBg_L1AhVOFLcAHUF7DcoQMyhCegQIARA_..i&docid=vKernhaiNJ00BM&w=900&h=512&itg=1&q=user%20images%20avtrar.jpg&hl=en&ved=2ahUKEwj6p-OBg_L1AhVOFLcAHUF7DcoQMyhCegQIARA_"
          })
          .then(() => {
            // Update successful
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        // ...
        navigation.replace('Chat')
      })
      .catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  
  };

  return (
    <View style={styles.container}>
    
      <Input
        placeholder="Enter your name"
        label="Name"
        leftIcon={{ type: "material", name: "badge" }}
        value={name}
        onChangeText={(text) => setName(text)}
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
      <Input
        placeholder="Enter your image Url"
        label="Profile Picture"
        leftIcon={{ type: "material", name: "face" }}
        value={imageURL}
        onChangeText={(text) => setImageURL(text)}
      />

      <View style={styles.mybutton}>
        <Button title="Register" onPress={register} />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop:50,
  },
  mybutton: {
    width: 200,
    margin: 10,
  },
});
