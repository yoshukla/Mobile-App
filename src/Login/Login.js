import { Dimensions, Image, Platform, ScrollView, StatusBar, Text, View, TouchableOpacity, Alert } from "react-native";
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { strings } from '../strings/strings';
import CustomTextInput from "../Components/CustomTextInput";
import { useState } from "react";
import CustomButtonGradient from "../Components/CustomButtonGradient";
import { useNavigation } from "@react-navigation/native";
import InputComponent from "../Components/InputComponent";
import BackgroundWrapper from "../Components/BackgroundWrapper";

var styles = BuildStyleOverwrite(Styles);

const Login = () => {

    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const clickOnSignIn = () => {
        if (emailId == "") {
            Alert.alert("Enter EmailId")
        }
        else if (password == "") {
            Alert.alert("Please enter Password")
        }
        else {
            setEmailId(emailId)
            setPassword(password)
            navigation.navigate('Dashboard')
        }
    }

    const navigatetoForgotpwd = () => {
        // navigation.navigate('ForgotPassword')
        navigation.navigate('OTPInputScreen')
    }


    const navigateToSignUp = () => {
        navigation.navigate('SignUpNew')
    }


    return (
        <BackgroundWrapper>
            <View style={[styles['full_screen']]}>
                {Platform.OS === 'android' && <StatusBar backgroundColor="#EFF6FF" barStyle='dark-content' />}

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>

                    <View style={[{ marginTop: Dimensions.get('window').height / 12 }]}>

                        <View style={[styles['alignItems_center']]}>
                            <Image source={require('../assets/images/medilog/ic_medilog_splash.png')}
                                resizeMode='contain'
                                style={{ width: 230, height: 185 }} />
                        </View>

                        <View style={[styles['margin_left_20']]}>
                            <Text style={[styles['font_size_24_bold'], styles['text_color_black'], styles['text_align_left']]}>{strings.welcomemedilog}</Text>
                            <Text style={[styles['font_size_12_Regular'], styles['text_color_black'], styles['text_align_left'], styles['margin_top_10']]}>{strings.signintoyouraccount}</Text>
                        </View>

                        <View style={[styles['margin_top_30'], styles['width_90%'], styles['align_self_center']]}>
                            <InputComponent
                                labelName={"Email"}
                                icon={require('../assets/images/medilog/ic_email.png')}
                                placeholder={'MediLog ID'}
                                keyboardType={'default'}
                                value={emailId}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setEmailId(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />
                            <InputComponent
                                marginTop={20}
                                labelName={"Password"}
                                icon={require('../assets/images/medilog/ic_password.png')}
                                placeholder="Enter Password"
                                keyboardType={'default'}
                                value={password}
                                secureTextEntry={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setPassword(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />
                            {/* <CustomTextInput
                                labelName={strings.email}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.email}
                                value={emailId}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setEmailId(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />

                            <CustomTextInput
                                labelName={strings.password}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.password}
                                value={password}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setPassword(text)
                                }}
                                onEndEditing={event => {

                                }}
                            /> */}
                        </View>

                        <View
                            style={{
                                flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center',
                                width: '95%', marginTop: 20
                            }}>
                            <TouchableOpacity style={{ flexDirection: 'row', paddingStart: 15 }}>
                                <Image
                                    source={require('../assets/images/medilog/ic_checkbox.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                                <Text style={{ color: '#000000', paddingStart: 8 }}>Remember me</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={navigatetoForgotpwd}>
                                <Text style={{ color: '#3b82f6', textDecorationLine: 'underline', marginEnd: 15 }}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles['margin_top_30']]}>
                            <CustomButtonGradient
                                title={strings.signIn}
                                btnWidth={'90%'}
                                onPress={clickOnSignIn}
                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 50,}}>
                            <Text style={{ color: '#000000' }}>Don’t have an account? </Text>
                            <TouchableOpacity onPress={navigateToSignUp}>
                                <Text style={{ color: '#2A1295', fontWeight: 'bold' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                </ScrollView>

            </View>
        </BackgroundWrapper>
    )


}

export default Login;