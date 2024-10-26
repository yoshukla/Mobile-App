import { Dimensions, Image, Platform, ScrollView, StatusBar, Text, View, TouchableOpacity, Alert, Modal, Button, ImageBackground, FlatList } from "react-native";
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { strings } from '../strings/strings';
import CustomButtonGradient from "../Components/CustomButtonGradient";
import { useNavigation } from "@react-navigation/native";
import BackgroundWrapper from "../Components/BackgroundWrapper";
import { useState } from "react";


var styles = BuildStyleOverwrite(Styles);

const languageData = [
    { id: 'en', name: 'English', nativeName: 'English' },
    { id: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
];


const LanguageChange = () => {

    const navigation = useNavigation();
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const renderLanguageItem = ({ item }) => {

        return (
            <TouchableOpacity style={[styles['margin_10']]}
                onPress={() => {
                    console.log("item", item)
                    setSelectedLanguage(item.id)
                }}
            >

                <ImageBackground
                    source={selectedLanguage === item.id ? require('../assets/images/medilog/btn_img_ic.png') :
                        require('../assets/images/medilog/ic_white_bg.png')}
                    style={[styles['width_height_120'], { opacity: 0.9 }]}
                    imageStyle={[styles['border_radius_8']]}>

                    <Image
                        source={require('../assets/images/medilog/ic_tick_circle_white.png')}
                        style={{ width: 20, height: 20, alignSelf: 'flex-end', marginEnd: 10, marginTop: 10 }}
                    />
                    <View style={[styles['centerItems'], styles['margin_top_8']]}>
                        <Text style={[selectedLanguage === item.id ? styles['text_color_white'] : styles['text_color_black'], styles['font_size_13_semibold']]}>{item.nativeName}</Text>
                        <Text style={[selectedLanguage === item.id ? styles['text_color_white'] : styles['text_color_black'], styles['font_size_8_regular'], styles['margin_top_3']]}>{item.name}</Text>
                    </View>
                </ImageBackground>

            </TouchableOpacity>
        )


    };

    return (
        <View style={[styles['full_screen']]}>
            <BackgroundWrapper>
                <View style={[styles['full_screen'], { position: 'absolute' }]}>
                    {Platform.OS === 'android' && <StatusBar backgroundColor="#EFF6FF" barStyle='dark-content' />}
                    <View style={[styles['full_screen'], styles['alignItems_center']]}>

                        <Text style={[styles['font_size_24_bold'], styles['text_color_black'], { fontWeight: "700", marginTop:30 }]}>Choose Language</Text>
                        <Text style={[styles['font_size_14_bold'], styles['text_color_black'], { fontWeight: "700", marginTop:20 }]}>choose your preferred language</Text>


                        {/* FlatList to display language options */}
                        <FlatList
                            data={languageData}
                            horizontal
                            keyExtractor={(item) => item.id}
                            renderItem={renderLanguageItem}
                            showsHorizontalScrollIndicator={false} // Hide the scroll bar for better UI
                        />


                        <CustomButtonGradient
                            title={strings.proceed}
                            btnWidth={'90%'}
                            btnHeight={45}
                            onPress={() => {
                                    navigation.navigate('LandingScreen')
                            }}
                        />

                    </View>


                </View>
            </BackgroundWrapper>
        </View>

    )


}

export default LanguageChange;