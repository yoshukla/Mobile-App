//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageBackground,
    Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');



// create a component
const LandingScreen = () => {
    const navigation = useNavigation();
    const navigateToLoginScreen = () => {
        // Alert.alert('Success', 'You have clicked on Terms and Conditions text.');
        // navigation.navigate("Login")
        navigation.navigate("LanguageChange")
    };
    const navigateToSignUpScreen = () => {
        // Alert.alert('Success', 'You have clicked on Privacy Policy text.');
        // navigation.navigate("SignUpNew")
        navigation.navigate("LanguageChange")
    };
    return (
        <ImageBackground
            source={require('../assets/images/medilog/onboard_ic.png')} // Replace with your background image path
            style={styles.container}
            resizeMode="cover"
        >
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/images/medilog/ic_medibank_logo.png')} // Replace with your logo image path
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
                <Image
                    source={require('../assets/images/medilog/ic_doctor_calendar_watch.png')} // Replace with your illustration path
                    style={styles.illustration}
                    resizeMode="contain"
                />
            </View>

            {/* Sign In text */}
            <View style={styles.textContainer}>
                <Text style={styles.signInText}>Sign In</Text>
                <Text style={styles.subText}>Easy and Fast way to sign in</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={()=> navigateToLoginScreen()}>
                    <Text style={styles.buttonText}>Sign In</Text>
                    {/* <Icon name="arrow-forward-circle-outline" size={24} color="#4B0082" /> */}
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}  onPress={()=> navigateToSignUpScreen()}>
                    <Text style={styles.buttonText}>New User</Text>
                    {/* <Icon name="arrow-forward-circle-outline" size={24} color="#4B0082" /> */}
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 10,
    },
    illustrationContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustration: {
        width: width * 0.7,
        height: width * 0.7,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    signInText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    subText: {
        fontSize: 14,
        color: '#D1D1D1',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 40,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: width * 0.35,
    },
    buttonText: {
        fontSize: 16,
        color: '#4B0082',
        fontWeight: 'bold',
        marginRight: 10,
    },
});

//make this component available to the app
export default LandingScreen;
