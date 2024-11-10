import { Dimensions, Image, Platform, ScrollView, StatusBar, Text, View, TouchableOpacity, StyleSheet, Alert, Modal, Button } from "react-native";
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
import CalendarInput from "../Components/CalendarInput";
import { Calendar } from "react-native-calendars";
import CustomAlert from "../Components/CustomAlert";
import { requestCameraAndStoragePermissions } from "../assets/Utils/permissions";
import { saveImageToFolder } from "../assets/Utils/Utility";
import ImagePicker from 'react-native-image-crop-picker';
import CustomPopupCamGalleryDoc from "../Modals/CustomPopupCamGalleryDoc";

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

    const [showAlert, setShowAlert] = useState(false)
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlertHeader, setShowAlertHeader] = useState(false)
    const [showAlertHeaderText, setShowAlertHeaderText] = useState(false)
    const [showAlertYesButton, setShowAlertYesButton] = useState(false)
    const [showAlertNoButton, setShowAlertNoButton] = useState(false)
    const [showAlertyesButtonText, setShowAlertyesButtonText] = useState(false)
    const [showAlertNoButtonText, setShowAlertNoButtonText] = useState(false)
    const [isPopupVisible, setPopupVisible] = useState(false);

    const [imageUri, setImageUri] = useState(null); // State to hold image URI
    const [isError, setIsError] = useState(false); // State to handle errors
    const [emailId, setEmailId] = useState('')
    const [fullName, setFullName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [emergencyContactNumber, setEmergencyContactNumber] = useState('')
    const [selectedCityTown, setSelectedCityTownName] = useState(null)
    const [selectedCityTownId, setSelectedCityTownId] = useState('')
    const [selectedState, setSelectedState] = useState(null)
    const [selectedStateId, setSelectedStateId] = useState('')
    const [selectedDate, setSelectedDate] = useState(''); // Store selected date
    const [isCalendarVisible, setCalendarVisible] = useState(false); // Calendar visibility state
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

    const showAlertWithMessage = (title, header, heaertext, message, yesBtn, noBtn, yesText, noText) => {
        setAlertTitle(title);
        setShowAlertHeader(header);
        setShowAlertHeaderText(heaertext)
        setAlertMessage(message);
        setShowAlertYesButton(yesBtn);
        setShowAlertNoButton(noBtn);
        setShowAlertyesButtonText(yesText);
        setShowAlertNoButtonText(noText);
        setShowAlert(true)
    }
    const handleCancelAlert = () => {
        setShowAlert(false)
    }

    const handlePermissions = async () => {
        const permissionsGranted = await requestCameraAndStoragePermissions();
        if (!permissionsGranted) {
            // Alert.alert('Permissions granted');
            // Proceed with camera or storage access
            setPopupVisible(true)
        } else {
            Alert.alert('Permissions denied');
        }
    };

    const openCamera = async () => {
        setPopupVisible(false)
        try {
            const image = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            });

            if (image != null) {
                console.log('Captured Image:', image);
                // Save the image to a specific folder
                const savedImagePath = await saveImageToFolder(image.path, 'Medilog');

                // Alert.alert('Success', `Image saved at: ${savedImagePath}`);
                setImageUri(savedImagePath); // Set the captured image URI
                setIsError(false); // Reset error state when a new image is captured
            }
        } catch (error) {
            console.error(error)
        }
    }

    const openGallery = async () => {
        setPopupVisible(false)
        const image = await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        });
        if (image != null) {
            console.log('Captured Image:', image);

            // Save the image to a specific folder
            const savedImagePath = await saveImageToFolder(image.path, 'Medilog');

            // Alert.alert('Success', `Image saved at: ${savedImagePath}`);
            setImageUri(savedImagePath); // Set the captured image URI
            setIsError(false); // Reset error state when a new image is captured
        }
    }

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
    // Function to handle date selection
    const handleDateSelect = (day) => {
        console.log("Selected Date ----> ", day)
        setSelectedDate(day.day + "-" + day.month + "-" + day.year); // Set the selected date
        setCalendarVisible(false); // Hide the calendar modal
    };

    // Function to handle TextInput focus and show calendar
    const handleFocus = () => {
        setCalendarVisible(true); // Show the calendar modal when TextInput is focused
    };

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
        // navigation.navigate('OTPInputScreen')
        if (fullName == "") {
            showAlertWithMessage(strings.alert, true, true, "Please enter fullName", false, true, strings.ok, strings.cancel)
        } else if (emailId == "") {
            showAlertWithMessage(strings.alert, true, true, "Enter EmailId", false, true, strings.ok, strings.cancel)
        } else if (mobileNumber == "") {
            showAlertWithMessage(strings.alert, true, true, "Please enter mobile Number", false, true, strings.ok, strings.cancel)
        } else if (mobileNumber.length < 10) {
            showAlertWithMessage(strings.alert, true, true, "Please enter valid mobile Number", false, true, strings.ok, strings.cancel)
        } else if (emergencyContactNumber == "") {
            showAlertWithMessage(strings.alert, true, true, "Please enter Emergency Contact Number", false, true, strings.ok, strings.cancel)
        } else if (emergencyContactNumber.length < 10) {
            showAlertWithMessage(strings.alert, true, true, "Please enter valid Emergency Contact Number", false, true, strings.ok, strings.cancel)
        } else if (mobileNumber == emergencyContactNumber) {
            showAlertWithMessage(strings.alert, true, true, "Mobile number and emergency contact number should not be same", false, true, strings.ok, strings.cancel)
        } else if (selectedCityTown == strings.select || selectedCityTown == '' || selectedCityTown == null) {
            showAlertWithMessage(strings.alert, true, true, "Please select City/Town", false, true, strings.ok, strings.cancel)
        } else if (selectedState == strings.select) {
            showAlertWithMessage(strings.alert, true, true, "Please select State", false, true, strings.ok, strings.cancel)
        } else if (selectedDate == '') {
            showAlertWithMessage(strings.alert, true, true, "Please select DOB", false, true, strings.ok, strings.cancel)
        } else if (selectedGenderName == strings.select) {
            showAlertWithMessage(strings.alert, true, true, "Please select gender", false, true, strings.ok, strings.cancel)
        } else if (selectedBloodGroupName == strings.select) {
            showAlertWithMessage(strings.alert, true, true, "Please select blood group", false, true, strings.ok, strings.cancel)
        } else if (password == "") {
            showAlertWithMessage(strings.alert, true, true, "Please enter password", false, true, strings.ok, strings.cancel)
        } else if (confirmPassword == "") {
            showAlertWithMessage(strings.alert, true, true, "Please enter confirm Password", false, true, strings.ok, strings.cancel)
        } else if (password != confirmPassword) {
            showAlertWithMessage(strings.alert, true, true, "Password does not match, please enter correct password", false, true, strings.ok, strings.cancel)
        }
        else {
            setEmailId(emailId)
            setFullName(fullName)
            setMobileNumber(mobileNumber)
            setEmergencyContactNumber(emergencyContactNumber)
            setPassword(password)
            setConfirmPassword(confirmPassword)
            navigation.navigate('OTPInputScreen')
        }
    }

    const termsConditionsClick = () => {
        Alert.alert('Success', 'You have clicked on Terms and Conditions text.');
    };
    const privacyPolicyClick = () => {
        Alert.alert('Success', 'You have clicked on Privacy Policy text.');
    };

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
                            <Text style={[styles['font_size_12_Regular'], styles['text_color_black'], styles['text_align_left'], styles['margin_top_10']]}>{strings.createAccount}</Text>
                        </View>

                        {/* Profile section */}
                        {imageUri == null &&
                            <View style={[styles['margin_left_20'], styles['margin_right_20'], styles['border_radius_6'], styles['width_90%'], styles['height_150'], styles['centerItems'], styles['border_width_1'], { borderColor: '#F3F2FF', backgroundColor: '#E5E3FF', marginTop: 5 }]}>

                                <TouchableOpacity style={[styles['width_height_80'], styles['centerItems'], { borderRadius: 50, borderColor: '#F3F2FF', backgroundColor: 'white', marginTop: 5 }]} onPress={() => handlePermissions()}>
                                    <Image
                                        source={require('../assets/images/medilog/ic_profile.png')}
                                        style={{ width: 20, height: 20, alignSelf: 'center' }}
                                    />
                                </TouchableOpacity>

                                <View style={[styles['centerItems'], styles['margin_top_8'], { flexDirection: 'row' }]}>
                                    <Text style={[styles['text_color_black'], styles['font_size_13_semibold'], styles['margin_right_10']]}>{strings.addPhoto}</Text>
                                    <Image
                                        source={require('../assets/images/medilog/ic_info.png')}
                                        style={{ width: 15, height: 15, alignSelf: 'center' }}
                                    />
                                </View>
                            </View>
                        }

                        {imageUri != null &&
                            <View style={[styles['margin_left_20'], styles['margin_right_20'], styles['border_radius_6'], styles['width_90%'], styles['height_150'], styles['centerItems'], styles['border_width_1'], { borderColor: '#F3F2FF', backgroundColor: '#E5E3FF', marginTop: 5 }]}>
                                {/* Display the image or a error if there's an error */}
                                <Image
                                    source={
                                        isError || !imageUri
                                            ? require('../assets/images/medilog/ic_profile.png') // Fallback image from project assets
                                            : { uri: imageUri } // Captured or selected image URI
                                    }
                                    style={{ width: 200, height: 80, resizeMode: 'cover' }}
                                    onError={() => setIsError(true)} // Handle image loading error
                                />
                            </View>
                        }

                        <View style={[styles['margin_top_10'], styles['width_100%'], styles['align_self_center']]}>
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
                                keyboardType='numeric'
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
                                keyboardType='numeric'
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


                            <CalendarInput
                                labelName={strings.dateofBirth}
                                value={selectedDate}
                                placeholder={strings.selectDate}
                                rightSideImg={require('../assets/images/medilog/ic_calendar.png')}
                                onFocus={() => {
                                    handleFocus()
                                }}
                                editable={false}
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
                                value={password}
                                secureTextEntry={true}
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
                                value={confirmPassword}
                                secureTextEntry={true}
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
                                marginTop: 10,
                                marginLeft: 25
                            }}>
                                <Image
                                    source={require('../assets/images/medilog/ic_checkbox.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                                <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', }}>
                                    <Text style={{ color: '#000000', fontSize: 14 }}>{strings.bysigningupyouagreetoour} </Text>
                                    <TouchableOpacity onPress={() => termsConditionsClick()}>
                                        <Text style={{ color: '#EB7805', fontSize: 14, textDecorationLine: 'underline' }}>{strings.termsConditions} </Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#000000', fontSize: 14 }}>{strings.and} </Text>
                                    <TouchableOpacity onPress={() => privacyPolicyClick()}>
                                        <Text style={{ color: '#EB7805', fontSize: 14, textDecorationLine: 'underline' }}>{strings.privacyPolicy} </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[styles['margin_top_30'],]}>
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
                {showAlert && (
                    <CustomAlert
                        onPressClose={() => { handleCancelAlert() }}
                        title={alertTitle}
                        showHeader={showAlertHeader}
                        showHeaderText={showAlertHeaderText}
                        message={alertMessage}
                        onPressOkButton={() => { handleOkAlert() }}
                        onPressNoButton={() => { handleCancelAlert() }}
                        showYesButton={showAlertYesButton}
                        showNoButton={showAlertNoButton}
                        yesButtonText={showAlertyesButtonText}
                        noButtonText={showAlertNoButtonText} />
                )}
                <CustomPopupCamGalleryDoc
                    visible={isPopupVisible}
                    onClose={""}
                    onSubmit={""}
                    showCenter={false}
                    style={[styles['flex_direction_row']]}
                >
                    {/* Pass dynamic content as children */}
                    <TouchableOpacity onPress={() => openCamera()}
                        style={[styles['flex_direction_column'], { width: '50%', alignItems: 'center', }]}>
                        <View style={[styles['border_radius_6'], styles['width_90%'], styles['height_80'], styles['centerItems'], styles['border_width_1'], { borderColor: '#ecf0f1', backgroundColor: '#ecf0f1', marginTop: 5 }]}>
                            <Image
                                source={require('../assets/images/medilog/ic_calendar.png')}
                                style={{ padding: 20, height: 30, width: 30 }}
                            />
                        </View>
                        <Text style={{ color: 'black', marginTop: 10 }}>{strings.camera}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles['flex_direction_column'], { width: '50%', alignItems: 'center' }]}
                        onPress={() => {
                            // Alert.alert('Reports')
                            openGallery()
                        }}
                    >
                        <View style={[styles['border_radius_6'], styles['width_90%'], styles['height_80'], styles['centerItems'], styles['border_width_1'], { borderColor: '#ecf0f1', backgroundColor: '#ecf0f1', marginTop: 5 }]}>
                            <Image
                                source={require('../assets/images/medilog/ic_calendar.png')}
                                style={{ padding: 20, height: 30, width: 30 }}
                            />
                        </View>
                        <Text style={{ color: 'black', marginTop: 10, }}>{strings.gallery}</Text>
                    </TouchableOpacity>
                </CustomPopupCamGalleryDoc>

                <Modal visible={isCalendarVisible} transparent={true} animationType="slide">
                    <View style={[styles['flex_1'], styles['justify_content_center'], styles['alignItems_center'],
                    { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                        <View style={[styles['bg_white'], styles['border_radius_10'], styles['padding_20'], styles['width_90%'],
                        styles['justify_content_center']]}>
                            <Calendar
                                onDayPress={handleDateSelect} // Handle date selection
                                markedDates={{
                                    [selectedDate]: { selected: true, marked: true }
                                }}
                            />
                            <Button title="Close" onPress={() => setCalendarVisible(false)} />
                        </View>
                    </View>
                </Modal>
            </View>
        </BackgroundWrapper>
    )
}

export default SignUpNew;