import React, { useEffect, useRef, useState } from 'react';
import { View, Platform, StatusBar, Text, Image, AppState, Linking, KeyboardAvoidingView, Keyboard, ImageBackground, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';
import { strings } from '../strings/strings';
import CustomButton from '../Components/CustomButton';
import { Colors } from '../assets/Utils/Color';
import { useNavigation } from '@react-navigation/native';
import { GetApiHeaders, PostRequest } from '../NetworkUtils/NetworkUtils';
import { FIREBASE_VERSION_COLLECTION_NAME, FIREBASE_VERSION_DOC_ID, HTTP_OK, SECOND_LOGIN, configs } from '../helpers/URLConstants';
import CustomAlert from '../Components/CustomAlert';
import CustomErrorLoader from '../Components/CustomErrorLoader';
import CustomSuccessLoader from '../Components/CustomSuccessLoader';
import CustomLoader from '../Components/CustomLoader';
import CustomBorderTextInput from '../Components/CustomBorderTextInput';
import { EDITDATA, FCM_TOKEN, LOGINONCE, TERMS_CONDITIONS, getAppVersion, storeData } from '../assets/Utils/Utils';
import { retrieveData } from '../assets/Utils/Utils';
import CustomButtonGradient from '../Components/CustomButtonGradient';
import CustomInput from '../Components/CustomInput';

var styles = BuildStyleOverwrite(Styles);


function LoginCopy() {


  const [loading, setLoading] = useState(false)
  const [successLoading, setSuccessLoading] = useState(false)
  const [errorLoading, setErrorLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [successLoadingMessage, setSuccessLoadingMessage] = useState('')
  const [errorLoadingMessage, setErrorLoadingMessage] = useState('')
  const [loaderImage, setLoaderImage] = useState(require('../assets/images/vm_loader.gif'))

  const [mobileNumber, setMobileNumber] = useState('')
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
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
  const [checkedUnChecked, setCheckedUnChecked] = useState(false)
  // const userData = useSelector(selectUser);
  const [userLoginOnce, setUserLoginOnce] = useState('')
  const [dataConfirmModal, showDataConfirmModal] = useState(false);
  const [oTPApiresponse, setOTPApiresponse] = useState(null)
  const [showWebView, setShowWebView] = useState(false);
  const [termsConditionsAccepted, setTermsConditionsAccepted] = useState(false)
  const [fromLogin, setFromLogin] = useState(false)
  const [isYellowViewVisible, setIsYellowViewVisible] = useState(true);
  const appState = useRef(AppState.currentState);
  const storeLink = "https://play.google.com/store/search?q=nsl+vyapar+mitra&c=apps";
  const handleLoading = () => {
    setLoading(false);
  }

  useEffect(() => {
    handleLoading();
    getFCMtoken()
    requestNotificationPermission();
  }, [isYellowViewVisible])

  useEffect(() => {
    console.log("AppState listener set up");

    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log("AppState changed: ", nextAppState);

      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log("App has come to the foreground");

        checkForceUpdate();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      console.log("AppState listener removed");
    };
  }, []);

  useEffect(() => {
    checkForceUpdate();
  }, []);

  async function checkForceUpdate() {
    try {
      const subscriber = firestore()
        .collection(FIREBASE_VERSION_COLLECTION_NAME)
        .doc(FIREBASE_VERSION_DOC_ID)
        .onSnapshot(documentSnapshot => {
          console.log('Document snapshot received');

          if (documentSnapshot.exists) {
            const data = documentSnapshot.data();
            console.log('Document data:', data);

            if (data) {
              setLoading(false);
              setTimeout(() => {
                checkAppversionUpdate(data);
              }, 500);
            } else {
              console.error('Document data is undefined');
              setLoading(false);
            }
          } else {
            console.error('Document does not exist');
            setLoading(false);
          }
        });

      return () => subscriber();
    } catch (error) {
      console.error('Error fetching document:', error);
      setLoading(false);
    }
  }

  async function checkAppversionUpdate(documentSnapshot) {
    try {
      const appDetails = await getAppVersion();
      console.log("App version details:", appDetails);
      console.log("Document snapshot data:", documentSnapshot);

      if (documentSnapshot) {
        const version = Platform.OS === 'ios' ? documentSnapshot.iosAppVersion : documentSnapshot.androidAppVersion;
        console.log("Version from Firestore:", version);

        if (version && version !== appDetails) {
          const isMandatory = Platform.OS === 'android'
            ? documentSnapshot.isMandatoryForAndroid
            : documentSnapshot.isMandatoryForIos;
          console.log("Update is mandatory:", isMandatory);

          showAlertWithMessage(strings.alert, true, true, documentSnapshot.message || strings.update_message, true, !isMandatory, strings.update, strings.cancel);
        } else {
          setShowAlert(false);
        }
      } else {
        setShowAlert(false);
      }
    } catch (error) {
      console.error('Error in checkAppversionUpdate:', error);
      setShowAlert(false);
    }
  }

  const getFCMtoken = async () => {
    console.log("SAINATH FCM:")
    const fcmToken = await messaging().getToken();
    storeData(FCM_TOKEN, fcmToken)
    console.log("SAINATH FCM Token:", fcmToken)
  }

  async function requestNotificationPermission() {
    try {
      const { status, settings } = await requestNotifications(['alert', 'badge', 'sound']);
      if (status === RESULTS.GRANTED) {
        console.log('Notification permission granted');
        // Permission granted, you can initialize push notification library or do other actions here
      } else {
        console.log('Notification permission denied');
        // Handle the scenario where permission is denied
      }
    } catch (error) {
      console.log('Error requesting notification permission:', error);
    }
  }

  useEffect(async () => {
    setLoading(false)
    setLoadingMessage()
    setUserLoginOnce(await retrieveData(LOGINONCE))
  }, [])

  useEffect(() => {
    console.log("sdsdsd")
  }, [storeMobileNum, storeUserID])

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log("nextAppState", nextAppState)
      if (nextAppState === 'active') {
        console.log("BACK TO APPLICATION");
      }
    };
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  const checkButtonPress = async () => {
    setCheckedUnChecked(!checkedUnChecked)
    console.log('it is true or false', checkedUnChecked)

  }


  const signUpButtonPress = async () => {

    setFromLogin(false)
    setShowWebView(true)
  }
  const vyaparMitraButtonPress = async () => {
    Linking.openURL(`tel:${strings.callNumber}`)
  }
  const requestOTPButtonPress = async () => {

    if (emailId == "") {
      showAlertWithMessage(strings.alert, true, true, strings.please + " " + strings.enter + " " + strings.email, false, true, strings.ok, strings.cancel)
    }
    else {
      Alert.alert("Successs");
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
    setShowAlert(false)
  }

  const handleOkAlert = () => {
    if (showAlertyesButtonText == strings.continue) {
      setShowAlert(false)
    }
    if (showAlertyesButtonText == strings.update) {
      if (Platform.OS == 'ios') {
        Linking.openURL("")
      } else {
        Linking.openURL(storeLink)
      }
    }
    if (showAlertyesButtonText == strings.proceed) {
      sendOTPApiCall(1)
    }
    setShowAlert(false)
  }


  const ShowDataModal = () => {
    var data = oTPApiresponse?.response[0]
    return (
      <View style={[styles['full_screen'], styles['transparent_black_bg'], styles['centerItems'], styles['absolute_position'], { top: 0, right: 0, left: 0, bottom: 0 }]}>
        <View style={[styles['width_80%'], styles['align_self_center'], styles['bg_white'], styles['padding_10'], { borderRadius: 8 }]}>
          <Text style={[styles['width_100%'], styles['font_size_18_semibold'], styles['padding_5'], { textAlign: 'center', color: Colors.black }]} >{strings.retailerInfo}</Text>
          <View style={[{ backgroundColor: Colors.very_light_grey, height: 1, width: '90%' }, styles['align_self_center']]} />
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 10 }, styles['align_self_center']]}>
            <Text style={[styles['font_size_13_semibold'], styles['text_color_black'], { width: '50%' }]}>{strings.firmName}</Text>
            <Text style={[styles['font_size_12_regular'], styles['text_color_black'],]}>{" : "}</Text>
            <Text style={[styles['font_size_12_regular'], styles['text_color_black'], { width: '50%', marginStart: 10 }]}>{data?.firmName}</Text>
          </View>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 10 }, styles['align_self_center']]}>
            <Text style={[styles['font_size_13_semibold'], styles['text_color_black'], { width: '50%' }]}>{strings.proprietorName}</Text>
            <Text style={[styles['font_size_12_regular'], styles['text_color_black'],]}>{" : "}</Text>
            <Text style={[styles['font_size_12_regular'], styles['text_color_black'], { width: '50%', marginStart: 10 }]}>{data?.proprietorName}</Text>
          </View>
          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 10 }, styles['align_self_center']]}>
            <Text style={[styles['font_size_13_semibold'], styles['text_color_black'], { width: '50%' }]}>{strings.state}</Text>
            <Text style={[styles['font_size_12_regular'], styles['text_color_black'],]}>{" : "}</Text>
            <Text style={[styles['font_size_12_regular'], styles['text_color_black'], { width: '50%', marginStart: 10 }]}>{data?.stateName}</Text>
          </View>

          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: 10 }, styles['align_self_center']]}>
            <Text style={[styles['font_size_13_semibold'], styles['text_color_black'], { width: '50%' }]}>{strings.district}</Text>
            <Text style={[styles['font_size_12_regular'], styles['text_color_black'],]}>{" : "}</Text>
            <Text style={[styles['font_size_12_regular'], styles['text_color_black'], { width: '50%', marginStart: 10 }]}>{data?.districtName}</Text>
          </View>


          <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 }, styles['align_self_center']]}>
            <CustomButton
              title={strings.editOnly}
              onPress={() => {
                showDataConfirmModal(false)
                storeData(EDITDATA, true)
                navigation.navigate('LoginOTP', { otp: oTPApiresponse, getuserAcceptanceKey: 0, loginMobileNumber: mobileNumber })
              }}
              buttonBg={Colors.white}
              btnWidth={'40%'}
              titleTextColor={Colors.themeRed}
              textAlign={'center'}
              isBoldText={true}
              borderWidth={0.5}
              borderRadius={8}
              borderColor={Colors.red}
            />

            <CustomButton
              title={strings.continue}
              onPress={() => {
                showDataConfirmModal(false)
                storeData(EDITDATA, false)
                navigation.navigate('LoginOTP', { otp: oTPApiresponse, getuserAcceptanceKey: 0, loginMobileNumber: mobileNumber })
              }}
              buttonBg={Colors.themeRed}
              btnWidth={'40%'}
              titleTextColor={Colors.white}
              textAlign={'center'}
              isBoldText={true}
            />
          </View>
        </View>
      </View>
    )
  }
  const approveTermsButtonClick = () => {
    if (fromLogin) {
      setShowWebView(false)
      setTermsConditionsAccepted(true)
      storeData(TERMS_CONDITIONS, true)
      setTimeout(() => {
        sendOTPApiCall(0)
      }, 1500);
    } else {
      setShowWebView(false)
      setMobileNumber()
      navigation.navigate('SignUp')
    }

    // setTimeout(() => {
    //   if (termsConditionsAccepted == true) {
    //     sendOTPApiCall(userAcceptanceKey = 0)
    //   }
    // }, 1000);
  }

  const handleWebViewScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const scrollPosition = contentOffset.y;
    if (scrollPosition <= 0) {
      setIsYellowViewVisible(true);
    } else {
      setIsYellowViewVisible(false);
    }
  };

  const showWebViewSection = () => {
    return (
      <View style={[styles['full_screen'], styles['transparent_black_bg'], styles['centerItems'], styles['absolute_position'], { top: 0, right: 0, left: 0, bottom: 0 }]}>

        <View style={[styles['width_90%'], styles['height_90%']]}>

          <WebView
            onLoadStart={() => {
              // setLoading(true)
              // setLoadingMessage(strings.please_wait_getting_data)
            }}
            onLoad={() => {
              // setLoading(false)
              // setLoadingMessage()
            }}
            source={{ uri: configs.TERMS_CONDIOTNS_URL }} // Replace with your desired URL
            style={[styles['centerItems'], styles['border_radius_6'], { height: '80%', width: '90%' }]}
            containerStyle={[styles['centerItems'], { flex: 1, width: '100%', height: '90%' }]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onScroll={handleWebViewScroll}
            onMessage={(event) => {
              console.log("event", event.nativeEvent.data)
              if (event.nativeEvent.data == "Accepted") {
                approveTermsButtonClick()
              }
            }}
          />

          {isYellowViewVisible && <TouchableOpacity style={[{ position: 'absolute', top: 5, end: 20, height: 20, width: 20, borderRadius: 15, alignSelf: 'flex-end' }]} onPress={() => { setShowWebView(false) }}>
            <Image style={[{ height: '100%', width: "100%", }]} source={require('../assets/images/close.png')} />
          </TouchableOpacity>}
        </View>
      </View>
    )
  }
  // useEffect(() => {
  //   // Focus the input when the component loads
  //   this.emailInput.focus();
  //   this.password.focus();
  // }, []);

  return (
    // <SafeAreaView>
    <View style={[styles['full_screen'], { padding: 0, margin: 0, width: '100%', height: '100%' }]}>
      {Platform.OS === 'android' && <StatusBar backgroundColor={'white'} barStyle='dark-content' />}

      <View style={[styles['full_screen'], styles['absolute_position'], styles['padding_top_40'],
      styles['align_self_center'], styles['bg_white']]}>


        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
          <View style={[{ marginTop: Dimensions.get('window').height / 12 }]}>

            {/* <View style={[styles['alignItems_center']]}>
              <Image source={require('../assets/images/ic_medilog_splash.png')}
                resizeMode='contain'
                style={{ width: 230, height: 190 }} />
            </View> */}

            <View style={[styles['margin_left_20'], styles['margin_top_10']]}>
              <Text style={[styles['font_size_26_semibold'], styles['text_color_black'], styles['text_align_left'], styles['top_5']]}>{strings.welcomemedilog}</Text>
              <Text style={[styles['font_size_12_Regular'], styles['text_color_black'], styles['text_align_left'], styles['margin_top_10']]}>{strings.signintoyouraccount}</Text>
            </View>

            <View>
              <CustomInput
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

              <CustomInput
                label="Password"
                placeholder="Enter your password"
                iconSource={require('../assets/images/medilog/call_ic.png')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

          </View>

        </ScrollView>

      </View>


      {showWebView &&
        showWebViewSection()
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
      {dataConfirmModal && ShowDataModal()}

      {loading && <CustomLoader loading={loading} message={loadingMessage} loaderImage={loaderImage} />}
      {successLoading && <CustomSuccessLoader loading={successLoading} message={successLoadingMessage} />}
      {errorLoading && <CustomErrorLoader loading={errorLoading} message={errorLoadingMessage} />}
    </View>
    // </SafeAreaView>
  )


}

export default LoginCopy;