import React from 'react';
import { Styles } from '../assets/style/styles';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

var styles = BuildStyleOverwrite(Styles);

const CustomButtonGradient = ({ title, onPress, btnWidth }) => {

    return (
        <TouchableOpacity onPress={onPress} style={{ borderRadius: 10, overflow: 'hidden', width: btnWidth, backgroundColor:'red', alignSelf:'center' }}>
            <ImageBackground
                source={require('../assets/images/btn_img_ic.png')}
                style={{ height: 45, alignItems: 'center', justifyContent: 'center',  }}
                imageStyle={{ borderRadius: 10 }}
            >
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

export default CustomButtonGradient;
