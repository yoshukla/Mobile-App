import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, AppState, Appearance, Keyboard, Platform } from 'react-native';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { Colors } from '../assets/Utils/Color';

var styles = BuildStyleOverwrite(Styles);

export default class CustomBorderInputDropDown extends Component {
    constructor(props) {
        super(props)
        styles = BuildStyleOverwrite(Styles);


        AppState.addEventListener('change', this._handleAppStateChange);
        Appearance.addChangeListener(({ colorScheme }) => {
            if (global.isAndroid || global.colorScheme != colorScheme) {
                styles = BuildStyleOverwrite(Styles);

                this.setState({ isActive: false, colorScheme: Appearance.getColorScheme() })

            }
        });
    }
    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            styles = BuildStyleOverwrite(Styles);
            this.setState({
                isActive: false,
                colorScheme: Appearance.getColorScheme()
            });
        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <View style={[styles['centerItems'], this.props.width != undefined ? this.props.width : styles['width_93%'], { left: -3 }]}>
                <View style={[styles['margin_bottom_5']]}>
                    {this.props.labelName != undefined &&
                        // <Text style={[styles['text_color_black'], styles['font_size_14_semibold'], styles['margin_left_5'],
                        // styles['top_5']]}>{this.props.labelName}</Text>
                        <Text style={[styles['text_color_black'], styles['absolute_position'], styles['margin_top_minus_10'], styles['margin_left_15'], styles['font_size_11_semibold'], styles['zindex_9999'], styles['bg_white'], styles['padding_5']]}>{this.props.labelName}{this.props.IsRequired && <Text style={[styles['text_color_red']]}>{" " + "*"}</Text>}</Text>
                    }
                    <View style={[styles['flex_direction_row'], styles['width_99%']]}>
                        <TouchableOpacity
                            style={[styles['width_100%'], styles['flex_direction_row'], styles['button_height_45'], styles["bg_white"],
                            styles['top_5'], styles['border_width_1'], styles['border_radius_6'], styles['border_color_light_grey']]} onPress={() => { this.props.onFocus() }}>
                            <TextInput
                                style={[styles['font_size_14_Regular'], styles["text_color_black"],
                                styles['padding_left_10'], Platform.OS == 'ios' && styles['top_3'], styles['width_92%'], { color: Colors.mid_grey, padding: 0 }]}
                                value={this.props.value}
                                placeholder={this.props.placeholder}
                                placeholderTextColor={this.props.placeholderTextColor != undefined ? this.props.placeholderTextColor : "#B4B4B4"}
                                defaultValue={this.props.defaultValue}
                                editable={this.props.editable}
                                selection={{ start: 0, end: 0 }}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                multiline={false}
                                autoCorrect={false}
                                color={Colors.black}
                                showSoftInputOnFocus={false}
                                onFocus={() => {
                                    Keyboard.dismiss();
                                    this.props.onFocus();
                                }}
                                onEndEditing={(text) => {
                                    this.props.onEndEditing(text) != undefined && this.props.onEndEditing(text)
                                }}
                            ></TextInput>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles['right_10'], styles['align_items_flex_end'], styles['absolute_position'], styles['margin_top_22']]}>
                        <Image
                            style={[{ width: 14, height: (Platform.OS == 'android') ? 8 : 7 }]}
                            source={require('../assets/images/grayDownArrow.png')} />
                    </View>
                </View>
            </View>
        )
    }


}