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
const patientNameArray =
    [{
        id: 1,
        name: "Prathap",
    },
    {
        id: 2,
        name: "Prathap2",
    },
    {
        id: 3,
        name: "Prathap3",
    }];


const HospitalReportsForm = () => {

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

    const [hospitalClinicName, setHospitalClinicName] = useState('')
    const [selectedDate, setSelectedDate] = useState(''); // Store selected date
    const [doctorName, setDoctorName] = useState('')
    const [procedure, setProcedure] = useState('')
    const [remarks, setRemarks] = useState('')

    const [selectedPatientName, setSelectedPatientName] = useState(null)
    const [selectedPatientId, setSelectedPatientId] = useState('')
    const [isCalendarVisible, setCalendarVisible] = useState(false); // Calendar visibility state
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

    const onSelectedPatientName = async (item) => {
        setSelectedPatientName(item.name)
        setSelectedPatientId(item.id);
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

    const navigation = useNavigation();
    const clickOnSubmit = () => {
        if (hospitalClinicName == "") {
            showAlertWithMessage(strings.alert, true, true, "Please enter Hospital/Clinic Name", false, true, strings.ok, strings.cancel)
        } else if (selectedDate == '') {
            Alert.alert("Please select Date")
        } else if (doctorName == "") {
            Alert.alert("Please enter Doctor Name")
        } else if (procedure == "") {
            Alert.alert("Please enter procedure")
        } else if (selectedPatientName == strings.select || selectedPatientName == '' || selectedPatientName == null) {
            Alert.alert("Please select Patient Name")
        } else if (remarks == "") {
            Alert.alert("Please enter remarks")
        } else {
            setHospitalClinicName(hospitalClinicName)
            setDoctorName(doctorName)
            setProcedure(emergencyContactNumber)
            setRemarks(remarks)
            navigation.navigate('HospitalReports')  // make api call and go back, or finish this screen
        }
    }


    return (
        <BackgroundWrapper>
            <View style={[styles['full_screen']]}>
                {Platform.OS === 'android' && <StatusBar backgroundColor="#EFF6FF" barStyle='dark-content' />}

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>

                    <View style={[{ marginTop: Dimensions.get('window').height / 12 }]}>

                        <View style={[styles['margin_top_10'], styles['width_100%'], styles['align_self_center']]}>
                            <CustomTextInput
                                labelName={strings.hospitalClinicName}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.hospitalClinicName}
                                value={hospitalClinicName}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setHospitalClinicName(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />
                            <CalendarInput
                                labelName={strings.selectDate}
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
                            <CustomTextInput
                                labelName={strings.doctorName}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.doctorName}
                                value={doctorName}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setDoctorName(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />
                            <CustomTextInput
                                labelName={strings.procedure}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.procedure}
                                value={procedure}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setProcedure(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />
                            <CustomDropDown
                                labelName={strings.patientName}
                                value={selectedPatientName != null ? selectedPatientName : strings.select}
                                rightSideImg={require('../assets/images/medilog/down_arrow_ic.png')}
                                onFocus={() => {
                                    changeDropDownData(patientNameArray, strings.patientName, selectedPatientName)
                                }}
                                onEndEditing={() => {

                                }}
                            />

                            <CustomTextInput
                                labelName={strings.remarks}
                                IsRequired={false}
                                keyboardType='default'
                                placeholder={strings.enter + " " + strings.remarks}
                                value={remarks}
                                secureTextEntry={false}
                                editable={true}
                                onFocus={() => {
                                }}
                                onChangeText={(text) => {
                                    // var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                                    setRemarks(text)
                                }}
                                onEndEditing={event => {

                                }}
                            />

                            {/* Profile section */}
                            <Text style={[styles['margin_left_20'], styles['margin_right_20'], styles['margin_top_10'], styles['font_size_14_Regular'], styles['text_color_black'],]}>{strings.upload_documents}</Text>
                            {imageUri == null &&
                                <View style={[styles['margin_left_20'], styles['margin_right_20'], styles['border_radius_6'], styles['width_90%'], styles['height_150'], styles['centerItems'], styles['border_width_1'], { borderColor: '#F3F2FF', backgroundColor: '#E5E3FF', marginTop: 5 }]}>

                                    <TouchableOpacity style={[styles['width_height_80'], styles['centerItems'], { borderRadius: 50, borderColor: '#F3F2FF', backgroundColor: 'white', marginTop: 5 }]} onPress={() => handlePermissions()}>
                                        <Image
                                            source={require('../assets/images/medilog/ic_defaut_img.png')}
                                            style={{ width: 30, height: 30, alignSelf: 'center' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }

                            {imageUri != null &&
                                <View style={[styles['margin_left_20'], styles['margin_right_20'], styles['border_radius_6'], styles['width_90%'], styles['height_150'], styles['centerItems'], styles['border_width_1'], { borderColor: '#F3F2FF', backgroundColor: '#E5E3FF', marginTop: 5 }]}>
                                    {/* Display the image or a error if there's an error */}
                                    <Image
                                        source={
                                            isError || !imageUri
                                                ? require('../assets/images/medilog/ic_defaut_img.png') // Fallback image from project assets
                                                : { uri: imageUri } // Captured or selected image URI
                                        }
                                        style={{ width: 200, height: 80, resizeMode: 'cover' }}
                                        onError={() => setIsError(true)} // Handle image loading error
                                    />
                                </View>
                            }

                        </View>
                        <View style={[styles['margin_top_30'], styles['margin_bottom_20']]}>
                            <CustomButtonGradient
                                title={strings.submit}
                                btnWidth={'90%'}
                                onPress={clickOnSubmit}
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
                        onSelectedPatientName={(item) => onSelectedPatientName(item)}
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

export default HospitalReportsForm;