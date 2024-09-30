
import React, { PureComponent, Component, } from 'react';
import { View, Text, Modal, FlatList, Image, Platform, TouchableOpacity, AppState, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { strings } from '../strings/strings';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { Colors } from '../assets/Utils/Color';

var styles = BuildStyleOverwrite(Styles);

export default class CustomListViewModal extends Component {
    constructor(props) {
        super(props);
        console.log('the propsss', props)
        styles = BuildStyleOverwrite(Styles);
        AppState.addEventListener('change', this._handleAppStateChange);

        this.state = {
            listItems: this.props.listItems,
            search: "",
            filteredList: this.props.listItems,
            unFilteredDeputeeList: this.props.unFilteredDeputeeList,
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            styles = BuildStyleOverwrite(Styles);
            this.setState({
                isActive: false,
            });
        }
    }
    async componentDidMount() {

    }

    onPressDropdownItem(item, index) {
        if (item.name == strings.no_data_available) {
            return
        }
        if (this.props.dropDownType == strings.memberType) {
            this.props.onSelectedRole(item)
        }
        else if (this.props.dropDownType == strings.state) {
            this.props.onSelectedState(item)
        }
        else if (this.props.dropDownType == strings.district) {
            this.props.onSelectedDistrict(item)
        }
        else if (this.props.dropDownType == strings.tm) {
            this.props.onSelectedTM(item)
        }
        else if (this.props.dropDownType == strings.MDO) {
            this.props.onSelectedMDO(item)
        }
        else if (this.props.dropDownType == strings.selectCategory) {
            this.props.onSelectedCategory(item)
        }
        else if (this.props.dropDownType == strings.selectSubCategory) {
            this.props.onSelectedSubCategory(item)
        }
        else if (this.props.dropDownType == strings.season) {
            this.props.onSelectedSeason(item)
        }
        else if (this.props.dropDownType == strings.crop) {
            this.props.onSelectedCrop(item)
        }
        else if (this.props.dropDownType == strings.zone) {
            this.props.onSelectedZone(item)
        }
        else if (this.props.dropDownType == strings.selectRegion) {
            this.props.onSelectedRegion(item)
        }
        else if (this.props.dropDownType == strings.selectTerritory) {
            this.props.onSelectedTerritory(item)
        }
        else if (this.props.dropDownType == strings.selectHeadquarter) {
            this.props.onSelectedHeadquarter(item)
        }
        else if (this.props.dropDownType == strings.retailerName) {
            this.props.onSelectedRetailerName(item)
        }
        else if (this.props.dropDownType == strings.year) {
            this.props.onSelectedYear(item)
        }
        else if (this.props.dropDownType == strings.selectApproveReject) {
            this.props.onSelectedStatus(item)
        }
        else if (this.props.dropDownType == strings.selectRetailerType) {
            this.props.onSelectedRetailerType(item)
        }
        else if (this.props.dropDownType == strings.selectGender) {
            this.props.onSelectedGender(item)
        }

    }

    render_listItem(item, index) {
        return (
            <TouchableOpacity key={index.toString()} onPress={() => this.onPressDropdownItem(item, index)} >
                <View style={[styles['width_100%'], styles['top_10']]}>
                    {this.props.dropDownType != strings.switch_role && <Text style={[styles['font_size_13_Regular'], (this.props.selectedItem == item.name) ? styles['text_color_blue'] : styles['text_color_black'], styles['text_input'], styles['padding_5'], (item.name == strings.no_data_available ? styles['textAlignCenter'] : styles['text_align_left'])]} allowFontScaling={true} numberOfLines={3}>
                        {this.props.dropDownType == strings.unit_size_uim ? item.shortDisplay : item.name}
                    </Text>}
                </View>
                <View style={[styles['bg_light_grey_color'], styles['height_1'], styles['width_100%'], styles['centerItems'], styles['top_5']]}></View>

            </TouchableOpacity>
        )

    }
    filterList() {
        var listItems = this.props.dropDownType == strings.deputee_details ? this.state.unFilteredDeputeeList : this.state.listItems;
        var array = listItems.filter(data => data.name.toString().toLowerCase().includes(this.state.search.toLowerCase()));
        if (array.length == 0) {
            array = [{ "avaliable": 0, "code": 0, "id": 0, "mainSiteId": 0, "minimumStockShouldBe": 0, "name": strings.no_data_available, "parentCode": 0, "storeLocationId": 0, "subSiteId": 0, "subStoreLocatioId": 0 }]
        }
        this.setState({
            filteredList: array
        })
    }

    render() {
        return (
            <Modal
                supportedOrientations={['portrait', 'landscape']}
                visible={this.props.visible} onRequestClose={this.props.onBackdropPress} animationType={'slide'}
                transparent={true} style={this.props.style}>

                <View style={[styles['width_100%'], styles['height_100%'], styles['transparent_black_bg'], styles['centerItems']]}>
                    <View style={[styles['width_85%'], styles['border_radius_normal'], styles['padding_10'], styles['margin_30'], styles['max_height_80%'], styles['bg_white'], (this.state.filteredList != undefined && this.state.filteredList.length > 3 ? styles['height_300'] : styles['height_200'])]}>
                        {/* <View style={[styles['flex_direction_row'], styles['width_100%']]}>
                            <Text style={[styles['text_color_black'], styles['font_size_16_semibold'], styles['padding_5'], styles['width_95%'], styles['text_align_center']]}>
                                {strings.select}
                            </Text>
                        </View> */}

                        < View style={[styles['align_self_flex_end'], styles['top_5']]}>
                            <TouchableOpacity onPress={this.props.closeModal}>
                                <Image source={require('../assets/images/close.png')} style={[styles['width_height_25'], { tintColor: 'red' }]} />
                            </TouchableOpacity>
                        </View>
                        {/*                        

                        {/* {this.props.dropDownType != strings.switch_role &&
                            <View style={[styles['flex_direction_row'], styles['width_95%'], styles['bg_white'], styles['border_radius_normal'], styles['margin_10'], styles['button_height_45'], styles['border_width_1'], { borderColor: Colors.grey }]}>
                                <TextInput
                                    value={this.state.search}
                                    onChangeText={(search) => {
                                        this.setState({ search: search })
                                        setTimeout(() => {
                                            if (search == "") {
                                                this.setState({ search: '', filteredList: this.state.listItems })
                                            } else {
                                                this.filterList()
                                            }
                                        }, 200);
                                    }}
                                    color={Colors.black}
                                    placeholder={'Search'}
                                    style={[styles['padding_left_10'], styles['width_90%'], styles['font_size_14_Regular'], styles['text_color_black'], styles['button_height_45']]} />
                                <TouchableOpacity style={[styles['centerItems']]}
                                    onPress={() => {
                                        if (this.state.search != "") {
                                            Keyboard.dismiss()
                                        }
                                        this.setState({ search: '', filteredList: this.state.listItems })
                                    }}>
                                    <Image
                                        style={[styles['width_height_20'], styles['centerItems'], { tintColor: "#C0C1C1" }]}
                                        source={(this.state.search == '') ? require('../assets/images/search.png') : require('../assets/images/cancel.png')} />
                                </TouchableOpacity>

                            </View>} */}
                        {this.state.filteredList != undefined && this.state.filteredList.length > 0 ?
                            (
                                <FlatList
                                    data={this.state.filteredList}
                                    style={[styles['width_100%'], styles['top_10']]}
                                    renderItem={({ item, index }) =>
                                        this.render_listItem(item, index)
                                    }
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => { index.toString() }}
                                    nestedScrollEnabled>
                                </FlatList>
                            )
                            :
                            (
                                <View>
                                    <Text style={[styles['text_color_black'], styles['centerItems'], styles['margin_top_80'], { height: 40 }]}>{strings.no_data_available}</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}