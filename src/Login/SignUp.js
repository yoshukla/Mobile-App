import React, { useEffect, useRef, useState } from 'react';
import { View, Platform, StatusBar, Text, Image, Linking, Keyboard, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { strings } from '../strings/strings';
import CustomButton from '../Components/CustomButton';
import { Colors } from '../assets/Utils/Color';
import { filterObjects, sortObjectsAlphabetically } from '../assets/Utils/Utils';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomAlert from '../Components/CustomAlert';
import CustomLoader from '../Components/CustomLoader';
import CustomSuccessLoader from '../Components/CustomSuccessLoader';
import CustomErrorLoader from '../Components/CustomErrorLoader';
import CustomBorderInputDropDown from '../Components/CustomBorderInputDropDown';
import { GetApiHeaders, GetRequest, PostRequest, uploadFormData } from '../NetworkUtils/NetworkUtils';
import { HTTP_OK, configs } from '../helpers/URLConstants';
import CustomListViewModal from '../Modals/CustomListViewModal';
import SimpleToast from 'react-native-simple-toast';
import { WebView } from 'react-native-webview';
import CustomBorderTextInput from '../Components/CustomBorderTextInput';
import { useSelector } from 'react-redux';
// import { ScrollView } from "react-native";

var styles = BuildStyleOverwrite(Styles);


function SignUp() {
  const networkStatus = useSelector(state => state.networkStatus.value)
  const [loading, setLoading] = useState(false)
  const [successLoading, setSuccessLoading] = useState(false)
  const [errorLoading, setErrorLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [successLoadingMessage, setSuccessLoadingMessage] = useState('')
  const [errorLoadingMessage, setErrorLoadingMessage] = useState('')
  const [loaderImage, setLoaderImage] = useState(require('../assets/images/vm_loader.gif'))

  const navigation = useNavigation()

  const [storeMobileNum, setStoreMobileNum] = useState('')
  const [storeUserID, setStoreUserID] = useState('')

  const [showAlert, setShowAlert] = useState(false)
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertHeader, setShowAlertHeader] = useState(false)
  const [showAlertHeaderText, setShowAlertHeaderText] = useState(false)
  const [showAlertYesButton, setShowAlertYesButton] = useState(false)
  const [showAlertNoButton, setShowAlertNoButton] = useState(false)
  const [showAlertyesButtonText, setShowAlertyesButtonText] = useState(false)
  const [showAlertNoButtonText, setShowAlertNoButtonText] = useState(false)
  const [proprietorName, setProprietorName] = useState('')
  const [firmName, setFirmName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [state, setState] = useState('')
  const [stateID, setStateID] = useState('')
  const [district, setDistrict] = useState('')
  const [districtID, setDistrictID] = useState('')
  const [tm, setTM] = useState('')
  const [tmID, setTMID] = useState('')
  const [mdo, setMDO] = useState('')
  const [mdoID, setMDOID] = useState('')
  const [landMark, setLandMark] = useState('')
  const [village, setVillage] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [block, setBlock] = useState('')
  const [role, setRole] = useState('')
  const [roleID, setRoleID] = useState('')
  const [roleList, setRoleList] = useState()
  const [stateList, setStateList] = useState()
  const [districtListOriginal, setDistrictListOriginal] = useState()
  const [districtList, setDistrictList] = useState()
  const [tmList, setTMList] = useState()
  const [mdoList, setMDOList] = useState()
  const [dropDownData, setdropDownData] = useState();
  const [showDropDowns, setShowDropDowns] = useState(false)
  const [dropDownType, setDropDownType] = useState("");
  const [selectedDropDownItem, setSelectedDropDownItem] = useState("");
  const [showWebView, setShowWebView] = useState(false)
  const [termsConditionsAccepted, setTermsConditionsAccepted] = useState(true)
  const firmNameRef = useRef(null);
  const propriatorNameRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const addressRef = useRef(null);
  const landMarkRef = useRef(null);
  const villageRef = useRef(null);
  const tashilBlockRef = useRef(null);
  const pincodeRef = useRef(null);
  const [showCustomActionSheet, setShowCustomActionSheet] = useState(false)
  const [bonusMessage, setBonusMessage] = useState("");

  const handleLoading = () => {
    setLoading(false);
  }

  useEffect(() => {
    handleLoading();
  }, [])

  useEffect(() => {
    setLoading(false)
    setLoadingMessage()
  }, [])

  useEffect(() => {
    // getProfileDetails()
  }, [storeMobileNum, storeUserID, tmList])



  useEffect(() => {
    if (networkStatus) {
      GetMastersApiCall()
    }
  }, [districtID])


  const goBack = async () => {
    navigation.navigate('Login')
  };

  const signUPButtonPress = async () => {
    if (role == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.select + " " + strings.memberType, false, true, strings.ok, strings.cancel)
    } else if (!role?.match(/[a-zA-Z]/)) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + strings.memberType, false, true, strings.ok, strings.cancel)
    }
    else if (firmName == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.firmName, false, true, strings.ok, strings.cancel)
    } else if (!firmName?.match(/[a-zA-Z]/)) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + strings.firmName, false, true, strings.ok, strings.cancel)
    }
    else if (proprietorName == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.proprietorName, false, true, strings.ok, strings.cancel)
    } else if (!proprietorName?.match(/[a-zA-Z]/)) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + strings.proprietorName, false, true, strings.ok, strings.cancel)
    }
    else if (mobileNumber == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.mobile_number, false, true, strings.ok, strings.cancel)
    }
    else if (mobileNumber.length < 10) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + strings.mobile_number, false, true, strings.ok, strings.cancel)
    }
    else if (address == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.address, false, true, strings.ok, strings.cancel)
    } else if (!address?.match(/[a-zA-Z]/)) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + strings.address, false, true, strings.ok, strings.cancel)
    }
    else if (landMark == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.landMark, false, true, strings.ok, strings.cancel)
    } else if (!landMark?.match(/[a-zA-Z]/)) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + strings.landMark, false, true, strings.ok, strings.cancel)
    }
    else if (village == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.village, false, true, strings.ok, strings.cancel)
    } else if (!village?.match(/[a-zA-Z]/)) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + strings.village, false, true, strings.ok, strings.cancel)
    }
    else if (block == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.tashilBlock, false, true, strings.ok, strings.cancel)
    } else if (!block?.match(/[a-zA-Z]/)) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + "Block", false, true, strings.ok, strings.cancel)
    }
    else if (state == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.select + " " + strings.state, false, true, strings.ok, strings.cancel)
    } else if (!state?.match(/[a-zA-Z]/)) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + strings.state, false, true, strings.ok, strings.cancel)
    }
    else if (district == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.select + " " + strings.district, false, true, strings.ok, strings.cancel)
    } else if (!district?.match(/[a-zA-Z]/)) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + strings.district, false, true, strings.ok, strings.cancel)
    }
    // else if (tm == "") {
    //   showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.select + " " + strings.tm, false, true, strings.ok, strings.cancel)
    // }
    // else if (mdo == "") {
    //   showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.select + " " + strings.MDO, false, true, strings.ok, strings.cancel)
    // }
    else if (pincode == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.pincode, false, true, strings.ok, strings.cancel)
    }
    else if (pincode.length < 6) {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.valid + " " + strings.pincode, false, true, strings.ok, strings.cancel)
    }
    else {
      signUPApiCall()
    }
  }



  const GetMastersApiCall = async () => {
    if (networkStatus) {
      try {
        setLoading(true)
        setLoadingMessage(strings.please_wait_getting_data)

        var getloginURL = configs.BASE_URL + configs.MASTERS.USER_MASTERS;
        var getHeaders = await GetApiHeaders();
        console.log('getloginURL is', getloginURL)
        console.log('getHeaders is', getHeaders)

        var APIResponse = await GetRequest(getloginURL, getHeaders);
        if (APIResponse != undefined && APIResponse != null) {
          setTimeout(() => {
            setLoadingMessage()
            setLoading(false)
          }, 500);
          if (APIResponse.statusCode == HTTP_OK) {
            var masterResp = APIResponse.response
            console.log('the master resp is', JSON.stringify(masterResp))
            setRoleList(masterResp.rolesList)
            setStateList(sortObjectsAlphabetically(masterResp?.statesList, 'name'))
            setDistrictListOriginal(masterResp?.districtsList)
            console.log("District_Data", JSON.stringify(masterResp?.districtsList));
            if (masterResp?.rolesList.length == 1) {
              setRole(masterResp?.rolesList[0].name)
              setRoleID(masterResp?.rolesList[0].id)
            }
            console.log('the 001 is', roleList)
            console.log('the 002 is', stateList)
            console.log('the 003 is', districtListOriginal)
          }
          else {
            showAlertWithMessage(strings.alert, true, true, APIResponse.message, false, true, strings.ok, strings.cancel)
          }

        } else {
          setTimeout(() => {
            setLoading(false)
            setLoadingMessage()
          }, 500);
        }
      }
      catch (error) {
        setTimeout(() => {
          setLoading(false)
          setSuccessLoadingMessage(error.message)
        }, 1000);
      }
    } else {
      // SimpleToast.show(strings.no_internet_conneccted)
    }
  }

  const GetTMApiCall = async (id) => {
    if (networkStatus) {
      try {
        setLoading(true)
        setLoadingMessage(strings.please_wait_creating_account)

        var getloginURL = configs.BASE_URL + configs.MASTERS.GET_TM;
        var getHeaders = await GetApiHeaders();

        console.log('coming districtID', id)
        var dataList = {
          "districtId": id,
        }
        console.log('getloginURL is', getloginURL)
        console.log('getHeaders is', getHeaders)
        console.log('dataList is', dataList)

        var APIResponse = await PostRequest(getloginURL, getHeaders, dataList);
        console.log('TM response is:', APIResponse)
        if (APIResponse != undefined && APIResponse != null) {
          setTimeout(() => {
            setLoadingMessage()
            setLoading(false)
          }, 500);
          if (APIResponse.statusCode == HTTP_OK) {
            console.log('ressspp tm', APIResponse)
            setTimeout(() => {
              setLoading(false)
            }, 1000);
            var resppp = APIResponse.response.territoryManagerList
            setTMList(resppp)
            //  console.log('resssppsss tm name', APIResponse.response.territoryManagerList[0].name)
            if (APIResponse?.response?.territoryManagerList && APIResponse?.response?.territoryManagerList?.length > 0) {
              setTM(APIResponse.response.territoryManagerList[0].name);
              setTMID(APIResponse.response.territoryManagerList[0].id);
            }
            console.log('what is in tm & tmid data', tm, tmID)


          }
          else {
            showAlertWithMessage(strings.alert, true, true, APIResponse.message, false, true, strings.ok, strings.cancel)
          }

        } else {
          setTimeout(() => {
            setLoading(false)
            setLoadingMessage()
          }, 500);
        }
      }
      catch (error) {
        setTimeout(() => {
          setLoading(false)
          setSuccessLoadingMessage(error.message)
        }, 1000);
      }
    } else {
      SimpleToast.show(strings.no_internet_conneccted)
    }

  }

  const GetMDOApiCall = async (id) => {
    if (networkStatus) {
      try {
        setLoading(true)
        setLoadingMessage(strings.please_wait_creating_account)

        var getloginURL = configs.BASE_URL + configs.MASTERS.GET_MDO;
        var getHeaders = await GetApiHeaders();

        var dataList = {
          "districtId": id,
        }
        console.log('getloginURL is', getloginURL)
        console.log('getHeaders is', getHeaders)
        console.log('dataList is', dataList)

        var APIResponse = await PostRequest(getloginURL, getHeaders, dataList);
        console.log('TM response is:', APIResponse)
        if (APIResponse != undefined && APIResponse != null) {
          setTimeout(() => {
            setLoadingMessage()
            setLoading(false)
          }, 500);
          if (APIResponse.statusCode == HTTP_OK) {
            console.log('ressspp mdo', APIResponse)
            setTimeout(() => {
              setLoading(false)
            }, 1000);
            var resppp = APIResponse.response.mdoManagerList
            setMDOList(resppp)
            // console.log('ressspp ddddd', mdoList)
            if (APIResponse?.response?.mdoManagerList && APIResponse?.response?.mdoManagerList?.length > 0) {
              setMDO(APIResponse.response.mdoManagerList[0].name)
              setMDOID(APIResponse.response.mdoManagerList[0].id);
            }
            console.log('what is in mdo & mdoID data', mdo, mdoID)
          }
          else {
            showAlertWithMessage(strings.alert, true, true, APIResponse.message, false, true, strings.ok, strings.cancel)
          }

        } else {
          setTimeout(() => {
            setLoading(false)
            setLoadingMessage()
          }, 500);
        }
      }
      catch (error) {
        setTimeout(() => {
          setLoading(false)
          setSuccessLoadingMessage(error.message)
        }, 1000);
      }
    } else {
      SimpleToast.show(strings.no_internet_conneccted)
    }

  }

  const signUPApiCall = async () => {
    if (networkStatus) {
      try {
        setLoading(true)
        setLoadingMessage(strings.please_wait_creating_account)

        var getloginURL = configs.BASE_URL + configs.AUTH.SIGNUP;
        var getHeaders = await GetApiHeaders();

        var jsonData = {
          "id": 0,
          "roleId": roleID,
          "roleName": role,
          "firmName": firmName,
          "proprietorName": proprietorName,
          "mobileNumber": mobileNumber,
          "address": address,
          "landMark": landMark,
          "village": village,
          "block": block,
          "districtId": districtID,
          "districtName": district,
          "stateId": stateID,
          "stateName": state,
          "pincode": pincode,
          "profilePic": "",
          "storeName": "",
          "status": true,
          'tm': tm,
          'tmId': tmID,
          'mdo': mdo,
          'mdoId': mdoID,
          'termsAndConditionsAccepted': termsConditionsAccepted
        }


        const formData = new FormData();

        // Append JSON data
        formData.append('jsonData', JSON.stringify(jsonData));
        formData.append('profileImage', "")
        formData.append('panImage', "")
        formData.append('gstImage', "")

        console.log('mmmmmm0111')
        console.log('what is here01 url', getloginURL)
        console.log('what is here01 headers', getHeaders)
        console.log('what is here01 body', formData)

        // const response = await fetch(getloginURL, {
        //   method: 'POST',
        //   headers: getHeaders,
        //   body: formData,
        // });
        // console.log('complent response is:', response)

        var APIResponse = await uploadFormData(formData, getloginURL, getHeaders);

        console.log('complent response is:', APIResponse)
        if (APIResponse != undefined && APIResponse != null) {
          setTimeout(() => {
            setLoadingMessage()
            setLoading(false)
          }, 500);
          if (APIResponse.statusCode == HTTP_OK) {
            setTimeout(() => {
              setLoading(false)
              setSuccessLoading(true)
              setSuccessLoadingMessage(strings.account_created_successfully)
            }, 1000);
            setBonusMessage(APIResponse?.response?.bonusPointsDescription)
            setTimeout(() => {
              setSuccessLoading(false)
              setSuccessLoadingMessage()
              setShowCustomActionSheet(true)
              // navigation.navigate('Login')
            }, 3000);
          }
          else {
            showAlertWithMessage(strings.alert, true, true, APIResponse.message, false, true, strings.ok, strings.cancel)
          }

        } else {
          setTimeout(() => {
            setLoading(false)
            setLoadingMessage()
          }, 500);
        }
      }
      catch (error) {
        setTimeout(() => {
          setLoading(false)
          setSuccessLoadingMessage(error.message)
        }, 1000);
      }
    } else {
      SimpleToast.show(strings.no_internet_conneccted)
    }
  }

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
    if (alertMessage?.includes(strings.firmName)) { firmNameRef.current.focus(); }
    else if (alertMessage?.includes(strings.proprietorName)) { propriatorNameRef.current.focus(); }
    else if (alertMessage?.includes(strings.mobile_number)) { mobileNumberRef.current.focus(); }
    else if (alertMessage?.includes(strings.address)) { addressRef.current.focus(); }
    else if (alertMessage?.includes(strings.landMark)) { landMarkRef.current.focus(); }
    else if (alertMessage?.includes(strings.village)) { villageRef.current.focus(); }
    else if (alertMessage?.includes(strings.tashilBlock)) { tashilBlockRef.current.focus(); }
    else if (alertMessage?.includes(strings.pincode)) { pincodeRef.current.focus(); }
    setShowAlert(false)
    if (alertMessage == strings.already_registered) {
      navigation.goBack()
    }
  }

  function CustomActionSheet() {
    return (
      <Modal animationType="slide"
        transparent={true}
        visible={showCustomActionSheet}
        onRequestClose={() => setShowCustomActionSheet(false)}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: Colors.blackTransparent }}>
          <View style={{ height: 75, width: 75, borderRadius: 40, backgroundColor: 'white', bottom: -55, alignSelf: 'center', padding: 10 }}>
            <View style={[{ height: '100%', width: '100%', backgroundColor: "#D9D9D9", borderRadius: 40 }]}>
            </View>
          </View>
          <View style={[{ borderTopRightRadius: 20, borderTopLeftRadius: 20, overflow: 'hidden', backgroundColor: 'white', height: 25 }]}>
          </View>

          <View style={[{ backgroundColor: 'white' }]}>

            <View style={[{ height: 100, width: 100, backgroundColor: "#D9D9D9", borderRadius: 100, alignSelf: 'center' }]}>
              <Image source={require('../assets/images/ic_default_scan.png')} style={[{ height: '100%', width: '100%' }]} />
              <Image source={require('../assets/images/ic_tick_green.png')} style={[{ height: 20, width: 20, position: 'absolute', top: 10, right: 4 }]} />
            </View>

            <ImageBackground source={require('../assets/images/success_bg.png')} style={[{ width: '60%', alignSelf: 'center', marginTop: 20, padding: 5 }]}>
              <Text style={[styles['font_size_18_bold'], styles['text_color_black'], styles['text_align_center']]}>{strings.congratulations}</Text>
              <Text style={[styles['font_size_14_Regular'], styles['text_color_black'], styles['text_align_center'], styles['margin_top_10'], styles['padding_10']]}>{bonusMessage}</Text>
            </ImageBackground>

            {/* Buttons */}
            <View style={[{ flexDirection: 'row', flexGrow: 1, justifyContent: 'space-between', width: '90%', marginBottom: 20, alignSelf: 'center' }]}>

              <CustomButton
                title={strings.ok}
                onPress={() => {
                  setShowCustomActionSheet(false)
                  navigation.goBack()
                }}
                buttonBg={Colors.themeRed}
                btnWidth={'100%'}
                titleTextColor={Colors.white}
                textAlign={'center'}
                isBoldText={true}
              />
            </View>

          </View>
        </View>
      </Modal >
    )
  }

  const handleOkAlert = () => {
    if (showAlertyesButtonText == strings.continue) {
      setShowAlert(false)
    }
    if (showAlertyesButtonText == strings.update) {
      if (Platform.OS == 'ios') {
        Linking.openURL(storeUrl)
      } else {
        Linking.openURL(storeUrl)
      }
    }
    if (showAlertyesButtonText == strings.proceed) {
      sendOTPApiCall(userAcceptanceKey = "1")
    }
    setShowAlert(false)
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Handle keyboard show event
        // Adjust your views here

      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Handle keyboard hide event
        // Adjust your views here
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const changeDropDownData = (dropDownData, type, selectedItem) => {
    setShowDropDowns(true);
    setdropDownData(dropDownData);
    setDropDownType(type);
    setSelectedDropDownItem(selectedItem);
  }

  onSelectedRole = (item) => {
    setShowDropDowns(false);
    setRole(item.name)
    setRoleID(item.id);
    console.log('it is type01', item)
  }

  onSelectedState = async (item) => {
    setShowDropDowns(false);
    setState(item.name)
    setStateID(item.id);
    setDistrict('')
    setDistrictID('');
    console.log('022nandu', item)
    if (item?.code.toLowerCase() == strings.all.toLowerCase()) {
      setDistrictList(sortObjectsAlphabetically(districtListOriginal, 'name'))
    } else {
      var filterDistList = await filterObjects(districtListOriginal, "stateId", item.id)
      setDistrictList(sortObjectsAlphabetically(filterDistList, 'name'))
    }
    console.log('022nandu', filterDistList)
  }

  onSelectedDistrict = (item) => {
    setShowDropDowns(false);
    setDistrict(item.name)
    setDistrictID(item.id);
    console.log('it is type03', item.id)
    setTimeout(() => {
      GetTMApiCall(item.id)
      GetMDOApiCall(item.id)
    }, 500);

  }

  onSelectedTM = (item) => {
    setShowDropDowns(false);
    setTM(item.name)
    setTMID(item.id);
    console.log('it is type04', item)
  }
  onSelectedMDO = (item) => {
    setShowDropDowns(false);
    setMDO(item.name)
    setMDOID(item.id);
    console.log('it is type05', item)
  }

  const validatePincode = (input) => {
    if (input === '') {
      return true;
    }

    if (input[0] === '0') {
      return false;
    }

    const isNumeric = /^[0-9]*$/.test(input);
    return isNumeric;
  };


  const approveTermsButtonClick = () => {
    setShowWebView(false)
    setTermsConditionsAccepted(true)
  }

  const showWebViewSection = () => {
    return (
      <View style={[styles['full_screen'], styles['transparent_black_bg'], styles['centerItems'], styles['absolute_position'], { top: 0, right: 0, left: 0, bottom: 0 }]}>
        <WebView
          onLoadStart={() => {
            setLoading(true)
            setLoadingMessage(strings.please_wait_getting_data)
          }}
          onLoad={() => {
            setLoading(false)
            setLoadingMessage()
          }}
          source={{ uri: 'http://nvm.empover.com/Terms-conditions.html' }} // Replace with your desired URL
          style={[styles['centerItems'], styles['border_radius_6'], { height: '80%', width: '90%' }]}
          containerStyle={[styles['centerItems'], { flex: 0, width: '90%', height: '80%' }]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={(event) => {
            console.log("event", event.nativeEvent.data)
            if (event.nativeEvent.data == "GoBack") {
              approveTermsButtonClick()
            }
          }}
        />
      </View>
    )
  }


  // const filterItems = (item) => {
  //   var listItems = stateList;
  //   if (item.code != 0) {
  //       var array = listItems.filter(data => data.productStoreLocationID === item.code);
  //       setDuplicateData(array)
  //       setfilteredIndex(array)
  //   }
  //   else {
  //       setfilteredIndex(listItems)
  //       setDuplicateData([])
  //   }
  // }

  return (
    <View style={[styles['full_screen'], styles['bg_white']]}>
      <Image source={require('../assets/images/bg_view_plain.png')} resizeMode='stretch' style={[styles['full_screen']]} />
      {Platform.OS === 'android' && <StatusBar backgroundColor={'white'} barStyle='dark-content' />}

      <View style={[styles['absolute_position'], styles['padding_top_50'], styles['height_100%']]}>

        <TouchableOpacity onPress={() => { goBack() }}>
          <Image style={[styles['margin_left_20'], styles['width_height_30']]} source={require('../assets/images/previous.png')}></Image>
        </TouchableOpacity>


        <View style={[styles['margin_left_30'], styles['top_20']]}>
          <Image source={require('../assets/images/appIcon.png')} resizeMode='contain' style={[styles['width_height_60']]} />
          <Text style={[styles['font_size_26_semibold'], styles['text_color_black'], styles['text_align_left'], styles['margin_top_20']]}>{strings.createAnAccount}</Text>
          <Text style={[styles['font_size_12_Regular'], styles['text_color_black'], styles['text_align_left'], styles['margin_top_10']]}>{strings.pleaseEnterAllTheDetails}</Text>
        </View>


        <ScrollView style={[styles['margin_top_30'], styles['margin_left_10'], { width: '100%' }]} automaticallyAdjustKeyboardInsets={true}>

          {/* Role*/}
          <CustomBorderInputDropDown
            width={[styles['width_91%'], styles['margin_top_10'], styles['centerItems']]}
            defaultValue={role != undefined && role != strings.select ? role : strings.select}
            labelName={strings.memberType}
            IsRequired={true}
            placeholder={strings.memberType}
            onEndEditing={async event => {
              // calculateTotalOrderValue()
            }}
            onFocus={() => {
              changeDropDownData(roleList, strings.memberType, role)
            }}
          />

          {/* firmName */}
          <View style={[styles['margin_top_20']]}>
            <CustomBorderTextInput
              ref={firmNameRef}
              style={[styles['margin_top_10'], styles['centerItems']]}
              labelName={strings.firmName}
              IsRequired={true}
              keyboardType='default'
              placeholder={strings.enter + " " + strings.firmName}
              value={firmName}
              maxLength={30}
              editable={true}
              onFocus={() => {
              }}
              onChangeText={(text) => {
                var enteredText = text.replace(/[`1234567890!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
                setFirmName(enteredText)
              }}
              onEndEditing={event => {

              }}
            />
          </View>

          {/* proprietorName */}
          <View style={[styles['margin_top_20']]}>
            <CustomBorderTextInput
              ref={propriatorNameRef}
              style={[styles['margin_top_10'], styles['centerItems']]}
              labelName={strings.proprietorName}
              IsRequired={true}
              keyboardType='default'
              placeholder={strings.enter + " " + strings.proprietorName}
              value={proprietorName}
              maxLength={30}
              editable={true}
              onFocus={() => {
              }}
              onChangeText={(text) => {
                var enteredText = text.replace(/[^a-zA-Z\s]/g, '');
                setProprietorName(enteredText)
              }}
              onEndEditing={event => {

              }}
            />
          </View>

          {/*  Mobile Number */}
          <View style={[styles['margin_top_20']]}>
            <CustomBorderTextInput
              ref={mobileNumberRef}
              style={[styles['margin_top_10'], styles['centerItems']]}
              labelName={strings.mobile_number}
              IsRequired={true}
              maxLength={10}
              keyboardType='number-pad'
              placeholder={strings.enter + " " + strings.mobile_number}
              value={mobileNumber}
              editable={true}
              onFocus={() => {
                //console.log('this is on focus')
              }}
              onChangeText={(text) => {
                console.log('this is on change text', text)
                var enteredText = text.replace(/^[0-5][0-9]*$/gi, "");
                enteredText = enteredText.replace(/[`a-z!@#$%^&*()_|+\-=?;:'",.₹€£¥•’<>\{\}\[\]\\\/]/gi, "");
                setMobileNumber(enteredText)
              }}
              onEndEditing={(event) => {
                if (mobileNumber.length < 10) {
                  // SimpleToast.show(strings.please + " " + strings.enter + " " + strings.valid + " " + strings.mobile_number)
                }
              }}
            />
          </View>

          {/* address */}
          <View style={[styles['margin_top_20']]}>
            <CustomBorderTextInput
              ref={addressRef}
              style={[styles['margin_top_10'], styles['centerItems']]}
              labelName={strings.address}
              IsRequired={true}
              keyboardType='default'
              placeholder={strings.enter + " " + strings.address}
              value={address}
              editable={true}
              onFocus={() => {
              }}
              onChangeText={(text) => {
                var enteredText = text.replace(/[^a-zA-Z0-9,\/\- \.;:]/g, '');

                setAddress(enteredText)
              }}
              onEndEditing={event => {

              }}
            />
          </View>

          {/* landMark */}

          <View style={[styles['margin_top_20']]}>
            <CustomBorderTextInput
              ref={landMarkRef}
              style={[styles['margin_top_10'], styles['centerItems']]}
              labelName={strings.landMark}
              IsRequired={true}
              keyboardType='default'
              placeholder={strings.enter + " " + strings.landMark}
              value={landMark}
              editable={true}
              onFocus={() => {
              }}
              onChangeText={(text) => {
                var enteredText = text.replace(/[^a-zA-Z0-9,\/\- \.;:]/g, '');

                setLandMark(enteredText)
              }}
              onEndEditing={event => {

              }}
            />
          </View>

          {/* village */}

          <View style={[styles['margin_top_20']]}>
            <CustomBorderTextInput
              ref={villageRef}
              style={[styles['margin_top_10'], styles['centerItems']]}
              labelName={strings.village}
              IsRequired={true}
              keyboardType='default'
              placeholder={strings.enter + " " + strings.village}
              value={village}
              editable={true}
              onFocus={() => {
              }}
              onChangeText={(text) => {
                const filteredText = text.replace(/[^\w\s]/gi, '');
                setVillage(filteredText)
              }}
              onEndEditing={event => {

              }}
            />
          </View>


          {/* Block */}

          <View style={[styles['margin_top_20']]}>
            <CustomBorderTextInput
              ref={tashilBlockRef}
              style={[styles['margin_top_10'], styles['centerItems']]}
              labelName={strings.tashilBlock}
              IsRequired={true}
              keyboardType='default'
              placeholder={strings.enter + " " + strings.tashilBlock}
              value={block}
              editable={true}
              onFocus={() => {
              }}
              onChangeText={(text) => {
                const filteredText = text.replace(/[^\w\s]/gi, '');
                setBlock(filteredText)
              }}
              onEndEditing={event => {

              }}
            />
          </View>



          {/* state*/}
          <CustomBorderInputDropDown
            width={[styles['width_90%'], styles['margin_top_20'], styles['centerItems']]}
            defaultValue={state != undefined && state != strings.select ? state : strings.select}
            labelName={strings.state}
            IsRequired={true}
            placeholder={strings.state}
            onEndEditing={async event => {
              // calculateTotalOrderValue()
            }}
            onFocus={() => {
              changeDropDownData(stateList, strings.state, state)
            }}
          />

          {/* district */}
          <CustomBorderInputDropDown
            width={[styles['width_90%'], styles['margin_top_20'], styles['centerItems']]}
            defaultValue={district != undefined && district != strings.select ? district : strings.select}
            labelName={strings.district}
            IsRequired={true}
            placeholder={strings.district}
            onEndEditing={async event => {
              // calculateTotalOrderValue()
            }}
            onFocus={() => {
              changeDropDownData(districtList, strings.district, district)
            }}
          />


          {/* <CustomBorderInputDropDown
              width={[styles['width_90%'], styles['margin_top_20'], styles['centerItems']]}
              defaultValue={tm != undefined && tm != strings.select ? tm : strings.select}
              labelName={strings.tm}
              IsRequired={false}
              placeholder={strings.tm}
              onEndEditing={async event => {
                // calculateTotalOrderValue()
              }}
              onFocus={() => {
                changeDropDownData(tmList, strings.tm, tm)
              }}
            />

           
            <CustomBorderInputDropDown
              width={[styles['width_90%'], styles['margin_top_20'], styles['centerItems']]}
              defaultValue={mdo != undefined && mdo != strings.select ? mdo : strings.select}
              labelName={strings.MDO}
              IsRequired={false}
              placeholder={strings.MDO}
              onEndEditing={async event => {
                // calculateTotalOrderValue()
              }}
              onFocus={() => {
                changeDropDownData(mdoList, strings.MDO, mdo)
              }}
            /> */}

          {/* pincode */}
          <View style={[styles['margin_top_20']]}>
            <CustomBorderTextInput
              ref={pincodeRef}
              style={[styles['margin_top_10'], styles['centerItems']]}
              labelName={strings.pincode}
              IsRequired={true}
              maxLength={6}
              keyboardType='numeric'
              placeholder={strings.enter + " " + strings.pincode}
              value={pincode}
              editable={true}
              onFocus={() => {
              }}
              onChangeText={(text) => {
                if (validatePincode(text)) {
                  setPincode(text);
                }
                // setPincode(text)
              }}
              onEndEditing={event => {

              }}
            />

            <View style={[styles['margin_top_40'], styles['align_self_center'], styles['width_100%'], styles['bottom_10']]}>
              <CustomButton title={strings.signUp} onPress={signUPButtonPress} buttonBg={Colors.themeRed} btnWidth={"90%"} titleTextColor={Colors.white} />
            </View>
          </View>

        </ScrollView>
      </View>

      {showWebView &&
        showWebViewSection()
      }
      {showCustomActionSheet && CustomActionSheet()}
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

      {showDropDowns &&
        <CustomListViewModal
          dropDownType={dropDownType}
          listItems={dropDownData}
          selectedItem={selectedDropDownItem}
          onSelectedRole={(item) => onSelectedRole(item)}
          onSelectedState={(item) => onSelectedState(item)}
          onSelectedDistrict={(item) => onSelectedDistrict(item)}
          onSelectedTM={(item) => onSelectedTM(item)}
          onSelectedMDO={(item) => onSelectedMDO(item)}
          closeModal={() => setShowDropDowns(false)} />}

      {loading && <CustomLoader loading={loading} message={loadingMessage} loaderImage={loaderImage} />}
      {successLoading && <CustomSuccessLoader loading={successLoading} message={successLoadingMessage} />}
      {errorLoading && <CustomErrorLoader loading={errorLoading} message={errorLoadingMessage} />}
    </View>
  )
}

export default SignUp;