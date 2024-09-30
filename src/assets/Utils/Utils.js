import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { PermissionsAndroid, Alert } from 'react-native';


export const GETSTARTED = "GETSTARTED";
export const FCM_TOKEN = "FCM_TOKEN";
export const MOBILE_NUMBER = "MOBILE_NUMBER";
export const USER_DETAILS = "USER_DETAILS"
export const USER_ID = "USER_ID";
export const USER_NAME = "USER_NAME";
export const LANGUAGE_ID = "1";
export const COUNTRY_ID = "5";
export const LANGUAGE_CODE = "en";
export const DEVICE_TOKEN = 'deviceToken';
export const YES = 'Yes';
export const NO = 'No';
export const OK = 'Ok';
export const NOTOK = 'Not Ok';
export const LOGINONCE = "LOGINONCE";
export const USERMENU = "USERMENU";
export const PROFILEIMAGE = "PROFILEIMAGE";
export const FAQDATA = "FAQDATA";
export const ROLENAME = "ROLENAME";
export const ROLEID = "ROLEID";

export const Partially_Accepted = 'Partially Accepted';
export const ASSIGNED = 'Assigned';
export const APPROVED = 'Approved';
export const INPROGRESS = 'InProgress';
export const COMPLETED = 'Completed';
export const REJECTED = 'Rejected';
export const EDITDATA = 'EditData'
export const TERMS_CONDITIONS = 'termsConditionsAccepted'


export async function getSystemVersion() {
    let deviceId = DeviceInfo.getSystemVersion()
    return deviceId;
}

export async function getAppVersion() {
    let version = DeviceInfo.getVersion();
    console.log("APPVERSION", version);
    return version;
}
export async function getBuildNumber() {
    let number = DeviceInfo.getBuildNumber();
    return number;
}

export async function getPlatformNumber() {
    let number = DeviceInfo.getBuildNumber();
    return number;
}
export async function getAppName() {
    let appName = DeviceInfo.getApplicationName();
    return appName;
}
export async function getAppVersionCode() {
    return DeviceInfo.getBuildNumber();
}

export async function getDeviceId() {
    let deviceId = await DeviceInfo.getUniqueId()
    return deviceId;
}
export async function getDeviceName() {
    let deviceId = await DeviceInfo.getDeviceName()
    return deviceId;
}

export async function getScale() {
    let deviceId = await DeviceInfo.getFontScale()
    return deviceId;
}
export async function filterArrayOfObjects(array, field, code) {
    return array.filter(data => data[field] !== undefined && data[field] == code);
}

export async function removeItemFromArray(array, field, code) {
    return array.filter(item => item[field] !== code);
}

// export async function filterObjects(array, field, code) {
//     console.warn("crop filterting herer", array.length + "--" + field + "--" + code)
//     return array.filter(data => data[field] == code);
// }
// export async function filterArrayOfObjects2(array, field1, code1, field2, code2) {
//     console.warn("crop filterting herer", array + "--" + field1 + "--" + code1 + "--" + field2 + "--" + code2)
//     return array.filter(data => (data[field1] == code1) && (data[field2] == code2));
// }
// export async function filterArrayOfObjects3(array, field1, code1, field2, code2, field3, code3) {
//     console.warn("crop filterting herer", array + "--" + field1 + "--" + code1 + "--" + field2 + "--" + code2 + "--" + field3 + "--" + code3)
//     return array.filter(data => (data[field1] == code1) && (data[field2] == code2) && (data[field3] == code3));
// }

export async function filterObjects(array, field, code) {
    console.warn("Filtering objects here:", array.length + "--" + field + "--" + code);

    // Filter the array based on the provided field and code
    let filteredArray = array.filter(data => data[field] == code);

    // Check if the first object should be added
    if (filteredArray != null && filteredArray.length > 1 && (code == 0 || array[0].name == "All")) {
        filteredArray.unshift(array[0]);
    }

    return filteredArray;
}
export async function filterArrayOfObjects2(array, field1, code1, field2, code2) {
    console.warn("crop filterting herer", array + "--" + field1 + "--" + code1 + "--" + field2 + "--" + code2)
    let filteredArray = array.filter(data => (data[field1] == code1) && (data[field2] == code2));
    // Check if the first object should be added
    if (filteredArray != null && filteredArray.length > 1 && array[0].name == "All") {
        filteredArray.unshift(array[0]);
    }
    return filteredArray;
}
export async function filterArrayOfObjects3(array, field1, code1, field2, code2, field3, code3) {
    console.warn("crop filterting herer", array + "--" + field1 + "--" + code1 + "--" + field2 + "--" + code2 + "--" + field3 + "--" + code3)

    let filteredArray = array.filter(data => (data[field1] == code1) && (data[field2] == code2) && (data[field3] == code3));
    if (filteredArray != null && filteredArray.length > 1 && array[0].name == "All") {
        filteredArray.unshift(array[0]);
    }
    return filteredArray;
}
export const getUniqueItems = (array, propertyName) => {
    const uniqueItemsMap = new Map();
    array.forEach(item => uniqueItemsMap.set(item[propertyName], item));
    return Array.from(uniqueItemsMap.values());
};

export async function getNotchHeight() {
    let deviceId = DeviceInfo.hasNotch()
    if (deviceId) {
        if (Platform.OS === 'ios') {
            // For iOS devices with a notch
            const { height, windowPhysicalPixels } = Dimensions.get('screen');
            console.log(windowPhysicalPixels + " check window")
            const windowHeight = height;
            const windowPhysicalHeight = windowPhysicalPixels.height;

            // Calculate the notch height
            const notchHeight = windowPhysicalHeight - windowHeight;

            return notchHeight;
        } else if (Platform.OS === 'android') {
            // For Android devices with a notch (Not all Android devices have notches)
            // You may need to use a library or check the device model to determine if it has a notch
            // and its dimensions.
            // On Android, you might need to use a third-party library or native modules to detect the notch.

            // Placeholder for Android notch height calculation
            // You may need to implement this part based on your requirements.
            return 0; // Replace with actual notch height calculation logic
        } else {
            // For devices without a notch or other platforms
            return 0;
        }
    }

}

export async function storeData(key, value) {
    var isStored = false;
    try {
        AsyncStorage.setItem(key, JSON.stringify(value));
        isStored = true;
        return isStored;
    } catch (error) {
        return isStored;
    }
}

export async function retrieveData(key) {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
        // We have data!!
        return JSON.parse(value);
    }
    else
        return "";

}

export const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    const is24HourFormat = true;
    let greetingMessage = '';
    if (is24HourFormat) {
        if (currentHour >= 5 && currentHour < 12) {
            greetingMessage = 'Good morning';
        } else if (currentHour >= 12 && currentHour < 18) {
            greetingMessage = 'Good afternoon';
        } else {
            greetingMessage = 'Good evening';
        }
    } else {
        const amPm = currentHour >= 12 ? 'PM' : 'AM';
        const formattedHour = currentHour % 12 || 12;
        if (currentHour >= 5 && currentHour < 12) {
            greetingMessage = `Good morning`;
        } else if (currentHour >= 12 && currentHour < 18) {
            greetingMessage = `Good afternoon`;
        } else {
            greetingMessage = `Good evening`;
        }
    }
    return greetingMessage;
};

export const requestMultiplePermissions = async (permissions) => {
    let settingsOpened = false;

    try {
        const grantedPermissions = {};

        for (const permission of permissions) {
            let result;
            if (Platform.OS === 'android') {
                result = await PermissionsAndroid.request(permission);
            } else if (Platform.OS === 'ios') {
                console.log('iOS platform detected. Handling permission request for iOS.');
                result = 'granted'; // Adjust this logic for iOS
            } else {
                console.warn(`Unsupported platform: ${Platform.OS}`);
                result = PermissionsAndroid.RESULTS.DENIED;
            }

            grantedPermissions[permission] = result;

            if (result === PermissionsAndroid.RESULTS.GRANTED || result === 'granted') {
                console.log(`Permission ${permission} granted`);
            } else {
                console.log(`Permission ${permission} denied`);

                if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN && !settingsOpened) {
                    console.log(`Permission ${permission} denied with Never Ask Again.`);
                    settingsOpened = true;

                    Alert.alert(
                        'Permission Required',
                        `App needs access to your ${permission}. Please go to app settings and grant permission.`,
                        [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Open Settings', onPress: () => openAppSettings() },
                        ]
                    );
                }
            }
        }

        return grantedPermissions;
    } catch (err) {
        console.error(err);
        return {};
    }
};


const openAppSettings = () => {

    if (Platform.OS == 'android') {
        // const pkg = DeviceInfo.getBundleId()
        // IntentLauncher.startActivity({
        //     action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
        //     data: 'package:' + pkg
        // })
    } else {
        Linking.openURL('app-settings:')
    }
}
export function isNullOrEmpty(value) {
    if (value == null || value == undefined || (typeof value == 'string' && value.trim() == '') || (Array.isArray(value) && value.length === 0)) {
        return false
    }
    else {
        return true
    }
}

export const readFileToBase64 = async (filePath) => {
    try {
        const fileContent = await RNFS.readFile(filePath, 'base64');

        // console.log("BASE64Content", fileContent);
        return fileContent;
    } catch (error) {
        console.log('Error converting file to Base64:', error);
        return null;
    }
};

export const removeTags = (content) => {
    return content.replace(/<(?!b\s*\/?)[^>]+>/g, '');
};

export const extractPlainText = (html) => {
    const element = document.createElement('div');
    element.innerHTML = html;
    return element.textContent || element.innerText || '';
};

export function isHTML(str) {
    return /<[a-z][\s\S]*>/i.test(str);
}

export function capitalizeFirstLetter(inputString) {
    if (!inputString) {
        return inputString;
    }

    const capitalizedString = inputString.charAt(0).toUpperCase() + inputString.slice(1);
    return capitalizedString;
}

export function sortObjectsAlphabetically(objects, key) {
    objects.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        const valueALower = valueA.toLowerCase();
        const valueBLower = valueB.toLowerCase();

        return valueALower.localeCompare(valueBLower);
    });

    // Return the sorted array
    return objects;
}