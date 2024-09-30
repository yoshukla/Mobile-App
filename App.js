import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./src/classes/Dashboard";
import SplashScreen from "./src/classes/SplashScreen";
import Login from "./src/Login/Login";
import ForgotPassword from "./src/Login/ForgotPassword";


function NavStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
    </Stack.Navigator>
  )
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  )
}




export default App;