import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { Colors } from '../assets/Utils/Color';
import CustomButton from './CustomButton';


var styles = BuildStyleOverwrite(Styles);

const CustomAlert = ({ onPressClose, title, showHeader, showHeaderText, message, onPressOkButton, onPressNoButton, showYesButton, showNoButton, yesButtonText, noButtonText, showCloseIcon }) => {
    return (
        <View style={[styles['full_screen'], styles['transparent_black_bg'], styles['centerItems'], styles['absolute_position'], { top: 0, right: 0, left: 0, bottom: 0 }]}>
            <View style={[styles['width_80%'], styles['align_self_center'], styles['bg_white'], styles['padding_10'], { borderRadius: 8 }]}>
                {showHeader && <View style={[styles['width_100%'], { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    {showHeaderText && (<Text style={[styles['width_100%'], styles['font_size_18_semibold'], styles['top_5'], { textAlign: 'center', color: Colors.black }]} >{title}</Text>)}
                    {showCloseIcon != undefined && <View style={[styles['width_100%'], styles['absolute_position'], { height: 30 }]}>
                        {showCloseIcon && <TouchableOpacity style={[styles['width_height_30'], { padding: 5, alignSelf: 'flex-end', marginRight: 10 }]} onPress={onPressClose}>
                            <Image style={[styles['height_100%'], styles['width_100%'], { padding: 5, alignSelf: 'flex-end', tintColor: 'red' }]} source={require('../assets/images/close.png')} />
                        </TouchableOpacity>}
                    </View>}
                </View>}

                <Text style={[styles['text_align_center'], styles['padding_left_10'], styles['top_20'], styles['text_color_black'], styles['font_size_14_Regular']]}>
                    {message}
                </Text>
                <View style={[styles['margin_top_20'], { flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between' }]}>
                    {showYesButton && <CustomButton title={yesButtonText} onPress={onPressOkButton} buttonBg={Colors.blue} btnWidth={showNoButton ? "45%" : '95%'} titleTextColor={Colors.white} />}
                    {showNoButton && <CustomButton title={noButtonText} onPress={onPressNoButton} buttonBg={Colors.red} btnWidth={showYesButton ? "45%" : '95%'} titleTextColor={Colors.white} />}
                </View>
            </View>
        </View>
    );
}

export default CustomAlert;