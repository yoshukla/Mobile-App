import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {

    const navigation = useNavigation()
    useEffect(()=>{

        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'Login'
                }]
            })
        }, 3000);

    },[])

    return (
        <LinearGradient
            colors={['#4A148C', '#121696', '#8E24AA']} // gradient colors matching your border
            style={styles.container}
        >
            <View style={styles.contentWhite}>
                <View style={styles.content}>
                    <Image
                        source={require('../assets/images/medilog/ic_medilog_splash.png')} // your image path here
                        style={styles.logo}
                        resizeMode="center"
                    />
                    <Text style={styles.subtitle}>Revolutionizing Healthcare with centralized Electronic Health Records</Text>
                </View>
            </View>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    contentWhite: {
        width:'98%',
        height:'98%',
        backgroundColor: 'white'
    },
    content: {
        flex:1,
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems:'center',
        margin: 10
    },
    logo: {
        width: 350,  // adjust based on your logo size
        height: 210,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3F51B5',
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center'
    },
});

export default SplashScreen;
