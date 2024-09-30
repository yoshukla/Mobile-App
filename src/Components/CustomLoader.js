import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  Dimensions,
  Image,
  // ActivityIndicator
} from 'react-native';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Styles } from '../assets/style/styles';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';

const { height, width } = Dimensions.get('window')
var styles = BuildStyleOverwrite(Styles);

export default class CustomLoader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: this.props.loading == undefined ? false : this.props.loading,
      fill: this.props.fill == undefined ? 10 : this.props.fill,
      message: this.props.message == undefined ? "Loading..." : this.props.message,
      loaderImage: this.props.loaderImage == undefined ? require('../assets/images/vm_loader.gif') : this.props.loaderImage
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(props) {
    if (props.message != this.state.message) {
      this.setState({
        message: props.message
      })
    }
  }
  render() {
    return (
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        transparent={true}
        animationType='fade'
        visible={this.state.loading}
        onRequestClose={() => { console.log('close modal') }}>

        <View style={[styles['justify_content_center'], { backgroundColor: "#000000d6", position: "absolute", top: 0, bottom: 0, left: 0, right: 0, alignItems: "center" }]}>

          {/* <AnimatedCircularProgress
            size={170}
            width={7}
            fill={this.props.fill}
            tintColor="#00000000"
            tintTransparency={true}
            rotation={360}
            duration={this.state.duration}
          /> */}

          <Image source={this.props.loaderImage} style={[styles['justify_content_center'], styles['align_self_center'], styles['center_align_items'], { width: 150, height: 150, marginTop: -75 }]} resizeMode={'contain'} />

          <Text style={[styles['font_size_13_Regular'], styles['textAlignCenter'], styles['padding_left_10'], styles['top_10'], styles['text_color_white'], styles['text_input'], styles['top_30']]}>
            {this.state.message}
          </Text>

        </View>
      </Modal>

    )
  }
}

