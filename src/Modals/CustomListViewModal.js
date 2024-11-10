import { strings } from '../strings/strings';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, FlatList, AppState } from 'react-native';

var styles = BuildStyleOverwrite(Styles);



const CustomListViewModal = ({onSelectedState,onSelectedCityTown,onSelectedGender,onSelectedBloodGroup,onSelectedPatientName,  ...props}) => {
    // const { onSelectedState } = props; // Access onSelectedState from props
    const [listItems, setListItems] = useState(props.listItems);
    const [search, setSearch] = useState('');
    const [filteredList, setFilteredList] = useState(props.listItems);
    const [unFilteredDeputeeList, setUnFilteredDeputeeList] = useState(props.unFilteredDeputeeList);
    const [isActive, setIsActive] = useState(false);
    const [type, setType] = useState(props.dropDownType)

    // Handling app state changes
    useEffect(() => {
        console.log("props", type)
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active') {
                // Styles could be regenerated if necessary
                setIsActive(false);
            }
        };

        AppState.addEventListener('change', handleAppStateChange);

        // return () => {
        //     AppState.remo('change', handleAppStateChange);
        // };
    }, []);

    // Function to handle dropdown item press
    const onPressDropdownItem = (item, index) => {
        if (item.name === strings.no_data_available) {
            return;
        }
        if (type === strings.state) {
            onSelectedState(item);
        } else if(type === strings.cityTown){
            onSelectedCityTown(item);
        } else if(type === strings.gender){
            onSelectedGender(item);
        } else if(type === strings.bloodGroup){
            onSelectedBloodGroup(item);
        } else if(type === strings.patientName){
            onSelectedPatientName(item);
        }
    };

    // Rendering list item
    const renderListItem = (item, index) => (
        <TouchableOpacity key={index.toString()} onPress={() => onPressDropdownItem(item, index)}>
            <View style={[styles['width_100%'], styles['top_10']]}>
                {type !== strings.switch_role && (
                    <Text
                        style={[
                            styles['font_size_13_Regular'],
                            props.selectedItem === item.name ? styles['text_color_blue'] : styles['text_color_black'],
                            styles['text_input'],
                            styles['padding_5'],
                            item.name === strings.no_data_available ? styles['textAlignCenter'] : styles['text_align_left']
                        ]}
                        allowFontScaling={true}
                        numberOfLines={3}>
                        {type === strings.unit_size_uim ? item.shortDisplay : item.name}
                    </Text>
                )}
            </View>
            <View style={[styles['bg_light_grey_color'], styles['height_1'], styles['width_100%'], styles['centerItems'], styles['top_5']]} />
        </TouchableOpacity>
    );

    // Function to filter the list based on the search term
    const filterList = () => {
        let listItemsToFilter = type === strings.deputee_details ? unFilteredDeputeeList : listItems;
        let filteredArray = listItemsToFilter.filter(data => data.name.toLowerCase().includes(search.toLowerCase()));

        if (filteredArray.length === 0) {
            filteredArray = [{
                avaliable: 0,
                code: 0,
                id: 0,
                mainSiteId: 0,
                minimumStockShouldBe: 0,
                name: strings.no_data_available,
                parentCode: 0,
                storeLocationId: 0,
                subSiteId: 0,
                subStoreLocatioId: 0
            }];
        }

        setFilteredList(filteredArray);
    };

    // Trigger filtering on search change
    useEffect(() => {
        filterList();
    }, [search, listItems, unFilteredDeputeeList]);

    return (
        <Modal
            supportedOrientations={['portrait', 'landscape']}
            visible={props.visible}
            onRequestClose={props.onBackdropPress}
            animationType={'slide'}
            transparent={true}
            style={props.style}>
            <View style={[styles['width_100%'], styles['height_100%'], styles['transparent_black_bg'], styles['centerItems']]}>
                <View
                    style={[
                        styles['width_85%'],
                        styles['border_radius_normal'],
                        styles['padding_10'],
                        styles['margin_30'],
                        styles['max_height_80%'],
                        styles['bg_white'],
                        filteredList.length > 3 ? styles['height_300'] : styles['height_200']
                    ]}>
                    <View style={[styles['align_self_flex_end'], styles['top_5']]}>
                        <TouchableOpacity onPress={props.closeModal}>
                            <Image source={require('../assets/images/close.png')} style={[styles['width_height_25'], { tintColor: 'red' }]} />
                        </TouchableOpacity>
                    </View>

                    {filteredList.length > 0 ? (
                        <FlatList
                            data={filteredList}
                            style={[styles['width_100%'], styles['top_10']]}
                            renderItem={({ item, index }) => renderListItem(item, index)}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            nestedScrollEnabled
                        />
                    ) : (
                        <View>
                            <Text style={[styles['text_color_black'], styles['centerItems'], styles['margin_top_80'], { height: 40 }]}>
                                {strings.no_data_available}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default CustomListViewModal;
