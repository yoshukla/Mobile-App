import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, AppState, Appearance, Keyboard, Platform } from 'react-native';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { Colors } from '../assets/Utils/Color';

var styles = BuildStyleOverwrite(Styles);

export default class CustomCalanderSelection extends Component {
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
                    {this.props.labelName != undefined && <Text style={[styles['text_color_black'], styles['font_size_14_Regular'],
                    styles['top_5'], { paddingLeft: 5 }]}>{this.props.labelName}{this.props.IsRequired}</Text>}
                    <View style={[styles['flex_direction_row'], styles['width_100%'], styles['centerItems']]}>
                        <TouchableOpacity
                            style={[styles['width_100%'], styles['flex_direction_row'], styles['height_40'],
                            styles['top_5'], styles['border_width_1'], styles['border_radius_6'], { borderColor: Colors.lightish_grey }]} onPress={() => { this.props.onFocus() }}>
                            <TextInput
                                style={[styles['font_size_14_Regular'], styles["text_color_mid_grey"],
                                styles['padding_left_10'], (Platform.OS == 'ios' && styles['top_5']), styles['width_90%']]}
                                value={this.props.value}
                                placeholder={this.props.placeholder}
                                placeholderTextColor={Colors.darkgrey}
                                defaultValue={this.props.defaultValue}
                                editable={this.props.editable}
                                multiline={true}
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

                            <Image
                                style={[styles['align_self_center'], styles['tint_color_red'], styles['width_height_20'], { right: (Platform.OS == 'android') ? 15  : 10, bottom: (Platform.OS == 'android') && 2 }]}
                                source={require('../assets/images/ic_date.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


}