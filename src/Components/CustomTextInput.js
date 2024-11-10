import React from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { strings } from '../strings/strings';
import { Styles } from '../assets/style/styles';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Colors } from '../assets/Utils/Color';

var styles = BuildStyleOverwrite(Styles);

function CustomTextInput({ labelName, defaultValue, value,secureTextEntry, placeholder, editable, contextMenuHidden, maxLength, onFocus, onChangeText, onEndEditing, keyboardType, textFiledWidth, leftSpace, autoCapitalize }) {
    return (
        <View style={[styles['width_100%'], styles['margin_top_10'],]}>
            <Text
                style={[styles['font_size_14_Regular'], styles['text_color_black'], styles['margin_left_25']]}>{labelName}</Text>
            <View
                style={[styles['padding_left_8'], styles['border_radius_6'],styles['width_90%'], styles['border_width_1'],{ borderColor: Colors.lightish_grey, alignSelf: 'center', marginTop:5 }]}>
                <TextInput
                    style={[styles['text_color_black'],
                    styles['font_size_14_Regular'], styles['width_95%'],
                    { padding: 0, paddingLeft: 0, height: 40 }]}
                    defaultValue={defaultValue}
                    value={value}
                    secureTextEntry={secureTextEntry}
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


        </View>
    )
}
export default CustomTextInput;