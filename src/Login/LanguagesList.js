import { Dimensions, Image, Platform, ScrollView, StatusBar, Text, View, TouchableOpacity, StyleSheet, Alert, Modal, Button } from "react-native";
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { strings } from '../strings/strings';
import { useState } from "react";
import CustomButtonGradient from "../Components/CustomButtonGradient";
import { useNavigation } from "@react-navigation/native";
import InputComponent from "../Components/InputComponent";
import BackgroundWrapper from "../Components/BackgroundWrapper"
import CustomTextInput from "../Components/CustomTextInput";

var styles = BuildStyleOverwrite(Styles);

const LanguagesList = () => {
    const navigation = useNavigation();

    const clickOnProceed = () => {
    Alert.alert("Proceed clicked")
    }
    return(
        <BackgroundWrapper>
            <View style={[styles['full_screen']]}>
                {Platform.OS === 'android' && <StatusBar backgroundColor="#EFF6FF" barStyle='dark-content' />}

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>

                    <View style={[{ marginTop: Dimensions.get('window').height / 12 }]}>

                    <View style={{backgroundColor:'red'}} >
                        <Text > My Welcome TEXT</Text>
                    </View>

                    {/* <Text style={[styles['font_size_24_bold'], styles['text_color_black'], styles['text_align_left']]}>{strings.chooseLanguage}</Text> */}
                            

                        {/* <View style={[styles['alignItems_center']]}>
                            <Image source={require('../assets/images/medilog/ic_medilog_splash.png')}
                                resizeMode='contain'
                                style={{ width: 370, height: 185 }} />
                        </View> */}

                        {/* <View style={[styles['margin_left_20']]}>
                            <Text style={[styles['font_size_24_bold'], styles['text_color_black'], styles['text_align_left']]}>{strings.chooseLanguage}</Text>
                            <Text style={[styles['font_size_12_Regular'], styles['text_color_black'], styles['text_align_left'], styles['margin_top_10']]}>{strings.choosepreferredLanguage}</Text>
                        </View> */}

                        {/* <View style={[styles['margin_top_30']]}>
                            <CustomButtonGradient
                                title={strings.signIn}
                                btnWidth={'90%'}
                                onPress={clickOnProceed}
                            />
                        </View> */}

                    </View>

                </ScrollView>

            </View>
        </BackgroundWrapper>
    )
}

export default LanguagesList;