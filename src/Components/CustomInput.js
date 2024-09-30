import React, { forwardRef } from 'react';
import { View, Text, TextInput, Image, Platform } from 'react-native';
import { strings } from '../strings/strings';
import { Styles } from '../assets/style/styles';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Colors } from '../assets/Utils/Color';


var styles = BuildStyleOverwrite(Styles);

const CustomInput = ({ labelName, defaultValue, value, placeholder, editable, contextMenuHidden, maxLength, onFocus, onChangeText, onEndEditing, keyboardType, textFiledWidth, leftSpace, autoCapitalize, IsRequired }) => {
    return (
        <View style={{}}>

            <TextInput
                style={[styles['text_color_black'],
                styles['font_size_14_Regular'], styles['padding_horizontal_5'],
                { width: labelName == strings.mobile_number ? "80%" : "95%", height: 40 }]}
                defaultValue={defaultValue}
                value={value}
                ref={ref ? ref : undefined}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor={Colors.darkgrey}
                underlineColorAndroid="transparent"
                editable={editable}
                contextMenuHidden={contextMenuHidden}
                multiline={false}
                autoCapitalize={autoCapitalize}
                onFocus={() => {
                    onFocus()
                }}
                onChangeText={(text) => {
                    onChangeText(text)
                }}
                onEndEditing={(text) => {
                    onEndEditing(text)
                }}
                maxLength={maxLength}
                allowFontScaling={true}>
            </TextInput>

        </View>
    );
};



export default CustomInput;
