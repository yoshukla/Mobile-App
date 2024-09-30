import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, AppState, Appearance, Keyboard, Platform } from 'react-native';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { Colors } from '../assets/Utils/Color';

var styles = BuildStyleOverwrite(Styles);

export default class CustomInputDropDown extends Component {
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
            <View style={[styles['centerItems'], this.props.width != undefined ? this.props.width : styles['width_90%']]}>
                <View style={[styles['margin_bottom_5']]}>
                    {this.props.labelName != undefined && <Text style={[styles['text_color_black'], styles['font_size_14_Regular'], styles['left_2'], { marginLeft: 0 },
                    styles['top_5']]}>{this.props.labelName} {this.props.IsRequired && <Text style={[styles['text_color_red']]}>{" " + "*"}</Text>}</Text>}
                    <View style={[styles['flex_direction_row'], styles['width_100%']]}>
                        <TouchableOpacity
                            style={[styles['width_100%'], styles['flex_direction_row'], styles["bg_white"],
                            styles['top_10'], styles['border_width_1'], styles['border_radius_6'], { borderColor: Colors.lightish_grey, height: 45 }]} onPress={() => { this.props.onFocus() }}>
                            <TextInput
                                style={[styles['font_size_14_Regular'], styles["text_color_black"],
                                styles['padding_left_10'], styles['width_92%'], { color: Colors.mid_grey, padding: 0 }]}
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
                    <View style={[styles['right_10'], styles['align_items_flex_end'], styles['absolute_position'], styles['margin_top_45']]}>
                        <Image
                            style={[{ width: 14, height: (Platform.OS == 'android') ? 8 : 8 }]}
                            source={require('../assets/images/grayDownArrow.png')} />
                    </View>
                </View>
            </View>
        )
    }


}