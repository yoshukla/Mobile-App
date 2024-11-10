import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/classes/SplashScreen";
import Login from "./src/Login/Login";
import ForgotPassword from "./src/Login/ForgotPassword";  // test comment
import Dashboard from "./src/Login/Dashboard";
import SignUpNew from "./src/Login/SignUpNew";
import LandingScreen from "./src/classes/LandingScreen";
import LanguageChange from "./src/classes/LanguageChange";
import Records from "./src/classes/Records";
import NearBy from "./src/classes/NearBy";
import Profile from "./src/classes/Profile";
import Settings from "./src/classes/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HospitalReports from "./src/classes/HospitalReports";
import OTPInputScreen from "./src/classes/OTPInputScreen";
import UserProfile from "./src/classes/UserProfile";
import HospitalReportsForm from "./src/classes/HospitalReportsForm";


function BottomNavigator() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconUrl;

          if (route.name === 'Home') {
            iconUrl = require('./src/assets/images/medilog/ic_home_enabled.png');
          } else if (route.name === 'Records') {
            iconUrl = require('./src/assets/images/medilog/ic_records_disabled.png');
          } else if (route.name === 'NearBy') {
            iconUrl = require('./src/assets/images/medilog/ic_nearby_disabled.png');
          } else if (route.name === 'Profile') {
            iconUrl = require('./src/assets/images/medilog/ic_profile_disabled.png');
          } else if (route.name === 'Settings') {
            iconUrl = require('./src/assets/images/medilog/ic_settings_disabled.png');
          } else {
            // Set a default icon if none match
            iconUrl = require('./src/assets/images/medilog/ic_home_enabled.png'); // Use a default icon path
          }

          return <Image source={iconUrl} style={{ tintColor: focused ? '#6200ea' : '#aaa', width: 20, height: 25 }} />;
        },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#6200ea',
        tabBarInactiveTintColor: '#aaa',
      })}
    >
      <Tab.Screen name="Records" component={Records} />
      <Tab.Screen name="NearBy" component={NearBy} />
      {/* <Tab.Screen name="Home" component={Dashboard}/> */}
      <Tab.Screen name="Home" component={UserProfile}/>
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Profile" component={HospitalReports} /> */}
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

function NavStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LandingScreen" component={LandingScreen}/>
      <Stack.Screen name="LanguageChange" component={LanguageChange}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
      <Stack.Screen name="OTPInputScreen" component={OTPInputScreen}/>
      <Stack.Screen name="Dashboard" component={BottomNavigator}/>
      <Stack.Screen name="SignUpNew" component={SignUpNew}/>
      {/* <Stack.Screen name="Records" component={Records}/>
      <Stack.Screen name="NearBy" component={NearBy}/>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="Settings" component={Settings}/> */}
      <Stack.Screen name="HospitalReports" component={HospitalReports}/>
      <Stack.Screen name="HospitalReportsForm" component={HospitalReportsForm}/>
    </Stack.Navigator>
  )
}
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  )
}




export default App;