import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/classes/SplashScreen";
import Login from "./src/Login/Login";
import ForgotPassword from "./src/Login/ForgotPassword";  // test comment
import Dashboard from "./src/Login/Dashboard";
import SignUpNew from "./src/Login/SignUpNew";
import LanguagesList from "./src/Login/LanguagesList";


function NavStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
      <Stack.Screen name="Dashboard" component={Dashboard}/>
      <Stack.Screen name="SignUpNew" component={SignUpNew}/>
      <Stack.Screen name="LanguagesList" component={LanguagesList}/>
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