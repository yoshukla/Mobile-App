import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Image } from 'react-native';
import { Styles } from '../assets/style/styles';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Colors } from '../assets/Utils/Color';

var styles = BuildStyleOverwrite(Styles);

const InputComponent = ({ labelName, icon, placeholder,keyboardType, value, onFocus,onChangeText, onEndEditing, marginTop, secureTextEntry }) => {

  return (
    <View style={{marginTop:marginTop}}>
      <View removeClippedSubviews={true}>
        {/* Label */}
        <View
          style={[
            styles['zindex_9999'],
            styles['absolute_position'],
            styles['margin_left_15'],
            { backgroundColor: '#fffdfc', opacity: 1 }, // Remove opacity on the background
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[
              styles['text_color_light_grey'],
              styles['margin_top_minus_10'],
              styles['font_size_13_semibold'],
              styles['padding_5'],
              
            ]}
          >
            {labelName}
          </Text>
        </View>

        {/* Input Field */}
        <View
          style={[
            styles['flex_direction_row'],
            styles['width_100%'],
            styles['centerItems'],
            styles['top_5'],
            styles['border_width_1'],
            styles['border_color_light_grey'],
            styles['border_radius_6'],
            { justifyContent: 'space-around', elevation: Platform.OS == 'android' ? -2 : 0, height:45 },
          ]}
        >

        <Image style={{width:15, height:15, marginStart:10}}
            source={icon}
            resizeMode='contain'
            
        />
          <TextInput
            style={[
              styles['text_color_black'],
              styles['font_size_14_Regular'],
              styles['padding_horizontal_5'],
              { width: '95%', height: 40, paddingStart: 15 },
            ]}
            defaultValue={''}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor={Colors.darkgrey}
            underlineColorAndroid="transparent"
            onFocus={() => {onFocus()}}
            onChangeText={(text) => {onChangeText(text)}}
            onEndEditing={(text) => {onEndEditing(text)}}
          />
        </View>
      </View>
    </View>
  );
};

export default InputComponent;
