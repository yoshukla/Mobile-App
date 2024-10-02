import { Dimensions, Image, Platform, ScrollView, StatusBar, Text, View, TouchableOpacity, Alert } from "react-native";
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { strings } from '../strings/strings';
import CustomTextInput from "../Components/CustomTextInput";
import { useState } from "react";
import CustomButtonGradient from "../Components/CustomButtonGradient";
import { useNavigation } from "@react-navigation/native";
import InputComponent from "../Components/InputComponent";
import BackgroundWrapper from "../Components/BackgroundWrapper";
import CustomListViewModal from "../Modals/CustomListViewModal";
import CustomDropDown from "../Components/CustomDropDown";

var styles = BuildStyleOverwrite(Styles);
const cityTownArray =
    [{
        id: 1,
        name: "Hyderabad",
        stateId: 1
    },
    {
        id: 2,
        name: "Seconderabad",
        stateId: 1
    },
    {
        id: 3,
        name: "chennai",
        stateId: 2
    }];
const stateArray =
    [{
        id: 1,
        name: "Telangana"
    },
    {
        id: 2,
        name: "Tamilnadu"
    }];
const genderArray =
    [{
        id: 1,
        name: "Male"
    },
    {
        id: 2,
        name: "Female"
    }];
const bloodGroupArray =
    [{
        id: 1,
        name: "A+"
    },
    {
        id: 2,
        name: "AB+"
    }];


const SignUpNew = () => {
    const [emailId, setEmailId] = useState('')
    const [fullName, setFullName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('')
    const [selectedCityTown, setSelectedCityTownName] = useState(null)
    const [selectedCityTownId, setSelectedCityTownId] = useState('')
    const [selectedState, setSelectedState] = useState(null)
    const [selectedStateId, setSelectedStateId] = useState('')
    const [selectedGenderName, setSelectedGenderName] = useState(null)
    const [selectedGenderId, setSelectedGenderId] = useState('')
    const [selectedBloodGroupName, setSelectedBloodGroupName] = useState(null)
    const [selectedBloodGroupId, setSelectedBloodGroupId] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [dropDownData, setdropDownData] = useState();
    const [showDropDowns, setShowDropDowns] = useState(false)
    const [dropDownType, setDropDownType] = useState("");
    const [selectedDropDownItem, setSelectedDropDownItem] = useState("")

    const changeDropDownData = (dropDownData, type, selectedItem) => {
        if (dropDownData.length == 0) {
            Alert.alert(strings.no_data_available)
        }
        else {
            setShowDropDowns(true);
            setdropDownData(dropDownData);
            setDropDownType(type);
            setSelectedDropDownItem(selectedItem);
        }
    }

    const onSelectedState = async (item) => {
        setSelectedState(item.name)
        setSelectedStateId(item.id);
        setShowDropDowns(false);
    }


    const onSelectedCityTown = async (item) => {
        setSelectedCityTownName(item.name)
        setSelectedCityTownId(item.id);
        setShowDropDowns(false);
    }

    const onSelectedGender = async (item) => {
        setSelectedGenderName(item.name)
        setSelectedGenderId(item.id);
        setShowDropDowns(false);
    }
    const onSelectedBloodGroup = async (item) => {
        setSelectedBloodGroupName(item.name)
        setSelectedBloodGroupId(item.id);
        setShowDropDowns(false);
    }

    const navigation = useNavigation();
    const clickOnSignIn = () => {
        if (emailId == "") {
            Alert.alert("Enter EmailId")
        }
        else if (fullName == "") {
            Alert.alert("Please enter fullName")
        }
        else if (mobileNumber == "") {
            Alert.alert("Please enter mobile Number")
        } else if (emergencyContactNumber == "") {
            Alert.alert("Please enter Emergency Contact Number")

        } else if (password == "") {
            Alert.alert("Please enter password")

        } else if (confirmPassword == "") {
            Alert.alert("Please enter confirm Password")
        } else if (password != confirmPassword) {
            Alert.alert("Password does not match, please enter correct password")
        }
        else {
            setEmailId(emailId)
            setFullName(fullName)
            setMobileNumber(mobileNumber)
            setEmergencyContactNumber(emergencyContactNumber)
            setPassword(password)
            setConfirmPassword(confirmPassword)
            navigation.navigate('Dashboard')
        }
    }
    return (
        <BackgroundWrapper>
            <View style={[styles['full_screen']]}>
                {Platform.OS === 'android' && <StatusBar backgroundColor="#EFF6FF" barStyle='dark-content' />}

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>

                    <View style={[{ marginTop: Dimensions.get('window').height / 12 }]}>

                        <View style={[styles['alignItems_center']]}>
                            <Image source={require('../assets/images/medilog/ic_medilog_splash.png')}
                                resizeMode='contain'
                                style={{ width: 230, height: 185 }} />
                        </View>

                        <View style={[styles['margin_left_20']]}>
                            <Text style={[styles['font_size_24_bold'], styles['text_color_black'], styles['text_align_left']]}>{strings.welcomemedilog}</Text>
                            <Text style={[styles['font_size_12_Regular'], styles['text_color_black'], styles['text_align_left'], styles['margin_top_10']]}>{strings.signintoyouraccount}</Text>
                        </View>

                        <View style={[styles['margin_top_30'], styles['width_90%'], styles['align_self_center']]}>

                            <CustomTextInput
                                labelName={strings.fullName}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.fullName}
                                value={fullName}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setFullName(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />
                            <CustomTextInput
                                labelName={strings.email}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.email}
                                value={emailId}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setEmailId(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />

                            <CustomTextInput
                                labelName={strings.mobile_number}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.mobile_number}
                                value={mobileNumber}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setMobileNumber(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />
                            <CustomTextInput
                                labelName={strings.emergencyContactNumber}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.emergencyContactNumber}
                                value={emergencyContactNumber}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setEmergencyContactNumber(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />
                            <CustomDropDown
                                labelName={strings.cityTown}
                                value={selectedCityTown != null ? selectedCityTown : strings.select}
                                rightSideImg={require('../assets/images/medilog/down_arrow_ic.png')}
                                onFocus={() => {
                                    changeDropDownData(cityTownArray, strings.cityTown, selectedCityTown)
                                }}
                                onEndEditing={() => {

                                }}
                            />

                            <CustomDropDown
                                labelName={strings.state}
                                value={selectedState != null ? selectedState : strings.select}
                                rightSideImg={require('../assets/images/medilog/down_arrow_ic.png')}
                                onFocus={() => {
                                    changeDropDownData(stateArray, strings.state, selectedState)
                                }}
                                onEndEditing={() => {

                                }}
                            />

                            <CustomDropDown
                                labelName={strings.gender}
                                value={selectedGenderName != null ? selectedGenderName : strings.select}
                                rightSideImg={require('../assets/images/medilog/down_arrow_ic.png')}
                                onFocus={() => {
                                    changeDropDownData(genderArray, strings.gender, selectedGenderName)
                                }}
                                onEndEditing={() => {

                                }}
                            />
                            <CustomDropDown
                                labelName={strings.bloodGroup}
                                value={selectedBloodGroupName != null ? selectedBloodGroupName : strings.select}
                                rightSideImg={require('../assets/images/medilog/down_arrow_ic.png')}
                                onFocus={() => {
                                    changeDropDownData(bloodGroupArray, strings.bloodGroup, selectedBloodGroupName)
                                }}
                                onEndEditing={() => {

                                }}
                            />

                            <CustomTextInput
                                labelName={strings.password}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.password}
                                value={fullName}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setPassword(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />

                            <CustomTextInput
                                labelName={strings.confirmPassword}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.confirmPassword}
                                value={fullName}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setConfirmPassword(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10 }}>
                                    <Image
                                    source={require('../assets/images/medilog/ic_checkbox.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                                <Text style={{ color: '#000000' }}>{strings.bysigningupyouagreetoour} </Text>
                                <Text style={{ color: '#EB7805' }}>{strings.termsConditions} </Text>
                                <Text style={{ color: '#000000' }}>{strings.and} </Text>
                                <Text style={{ color: '#EB7805' }}>{strings.privacyPolicy} </Text>
                            </View>
                        </View>

                        <View style={[styles['margin_top_30']]}>
                            <CustomButtonGradient
                                title={strings.createAccount}
                                btnWidth={'90%'}
                                onPress={clickOnSignIn}
                            />
                        </View>

                    </View>

                </ScrollView>
                {
                    showDropDowns &&
                    <CustomListViewModal
                        dropDownType={dropDownType}
                        listItems={dropDownData}
                        selectedItem={selectedDropDownItem}
                        onSelectedState={(item) => onSelectedState(item)}
                        onSelectedCityTown={(item) => onSelectedCityTown(item)}
                        onSelectedGender={(item) => onSelectedGender(item)}
                        onSelectedBloodGroup={(item) => onSelectedBloodGroup(item)}
                        closeModal={() => setShowDropDowns(false)} />
                }

            </View>
        </BackgroundWrapper>
    )
}

export default SignUpNew;