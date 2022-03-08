import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ChatScreen from "./Screens/ChatScreen";
import Splash from "./Screens/Splash";
import UploadScreen from "./Screens/UploadScreen";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.Screen    name="UploadScreen" component={UploadScreen} /> */}

      <Stack.Screen    name="Splash" component={Splash} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
