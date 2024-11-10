import React from 'react';
import { View, Text, TextInput, Platform, Image, TouchableOpacity, Keyboard } from 'react-native';
import { strings } from '../strings/strings';
import { Styles } from '../assets/style/styles';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Colors } from '../assets/Utils/Color';

var styles = BuildStyleOverwrite(Styles);


const CalendarInput = ({ labelName, value, placeholder, defaultValue, editable, placeholderTextColor, rightSideImg, onFocus, onEndEditing }) => {

    return (

        <View style={[styles['margin_bottom_5'], styles['margin_top_10']]}>
            <Text style={[styles['text_color_black'], styles['font_size_14_Regular'], styles['margin_left_25']]}>{labelName}</Text>
            <View style={[styles['flex_direction_row'], styles['margin_top_5'], styles['align_self_center']]}>
                <TouchableOpacity
                    style={[styles['width_90%'], styles['flex_direction_row'], styles["bg_white"],
                    styles['border_width_1'], styles['border_radius_6'], styles['height_45'], styles['border_color_lightish_grey']]} onPress={() => { onFocus() }}>
                    <TextInput
                        style={[styles['font_size_14_Regular'], styles["text_color_black"],
                        styles['padding_left_10'], styles['width_90%']]}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor != undefined ? placeholderTextColor : "#B4B4B4"}
                        defaultValue={defaultValue}
                        editable={editable}
                        selection={{ start: 0, end: 0 }}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        multiline={false}
                        autoCorrect={false}
                        color={Colors.black}
                        showSoftInputOnFocus={false}
                        onFocus={() => {
                            Keyboard.dismiss();
                            onFocus();
                        }}
                        onEndEditing={(text) => {
                            onEndEditing(text) != undefined && onEndEditing(text)
                        }}
                    ></TextInput>
                    <View style={[styles['align_self_center']]}>
                        <Image
                            style={[{ width: 20, height: 20 }]}
                            source={rightSideImg} />
                    </View>
                </TouchableOpacity>

            </View>

        </View>

    )
}


export default CalendarInput;