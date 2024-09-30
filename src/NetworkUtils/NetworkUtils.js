import NetInfo from "@react-native-community/netinfo";
import { DEVICE_TOKEN, FCM_TOKEN, MOBILE_NUMBER, USER_ID, USER_NAME, getAppVersion, getAppVersionCode, getDeviceId, retrieveData } from "../assets/Utils/Utils";
import { Platform } from "react-native";
import { strings } from "../strings/strings";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const REQUEST_TIMEOUT = 60000;

export async function checkJSON(response) {
    try {
        const responseJson = await response.json();
        return responseJson
    } catch (error) {
        return ""
    }
}


export async function GetApiHeaders() {
    var userId = await getUserIdFromStorage();
    var mobileNumber = await retrieveData(MOBILE_NUMBER);
    var userName = await retrieveData(USER_NAME);
    var deviceId = await getDeviceId();
    var fcmToken = await retrieveData(FCM_TOKEN)
    var appVersion = await getAppVersion();
    var appVersionCode = await getAppVersionCode();
    var deviceToken = await AsyncStorage.getItem(DEVICE_TOKEN)


    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'deviceId': deviceId,
        "deviceType": Platform.OS,
        "appVersionCode": Number.parseInt(appVersionCode),
        "appVersionName": appVersion,
        'userId': userId,
        'mobileNumber': mobileNumber,
        'fcmToken': fcmToken,
        'deviceToken': deviceToken,
        'userName': userName
    };
    return headers;

}


export async function GetRequest(url, headers) {
    var networkStatus = await getNetworkStatus()
    if (networkStatus) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            if (response.status == 200 || response.status == 412) {
                const responseJson = await response.json();

                // console.log(url + "Get Resp ---> " + JSON.stringify(responseJson));
                console.log("URL ===>", url);
                console.log("Headers ===>", headers);
                console.log("Response ===>", responseJson);

                return (responseJson)
            } else {
                if (response.status == 404) {
                    return constructFailureObject("No Http resource found");
                } else if (response.status == 401) {
                    return constructFailureObject("Unauthorised Request");
                } else if (response.status == 500) {
                    return constructFailureObject("Internal Server Error");
                } else if (response.status == 503) {
                    return constructFailureObject("Server down");
                } else if (response.status == 504) {
                    return constructFailureObject("Request Timed out");
                } else {
                    return constructFailureObject(translate('something_went_wrong'));
                }
            }
        } catch (error) {
            console.log("this is the error in the get")
            console.log(error.message);
            return constructFailureObject(error.message)
        }
    } else {
        // SimpleToast.show(strings.no_internet_conneccted)
    }
}

export async function PostRequest(url, headers, inputObject) {
    var networkStatus = await getNetworkStatus();
    if (!networkStatus) {
        return constructFailureObject(strings.no_internet_conneccted);
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(inputObject),
        });

        switch (response.status) {
            case 200:
            case 201:
            case 412:
                const responseJson = await response.json();
                console.log("URL ===>", url);
                console.log("Headers ===>", headers);
                console.log("Input Request ===>", inputObject);
                console.log("Response ===>", responseJson);

                // Check if the response body contains statusCode 0
                if (responseJson.statusCode === 0) {
                    return constructFailureObject("Network request failed with status code 0");
                }
                return responseJson;

            case 404:
                return constructFailureObject("No HTTP resource found");

            case 401:
                return constructFailureObject("Unauthorized request");

            case 500:
                return constructFailureObject("Internal server error");

            case 503:
                return constructFailureObject("Server down");

            case 504:
                return constructFailureObject("Request timed out");

            default:
                console.log('Unexpected response status code:', response.status);
                return constructFailureObject("Something went wrong");
        }

    } catch (error) {
        console.error('Network or server error:', error);

        // Handle network request failure specifically
        // if (error instanceof TypeError && error.message === "Failed to fetch") {
        //     return constructFailureObject("Network request failed: Network request failed");
        // }else if(error instanceof TypeError && error.message)

        return constructFailureObject(`Request failed: ${error.message}`);
    }
}


export const postApiCall = async (
    url,
    header = { 'content-Type': 'application/json' },
    body1 = null
) => {
    var networkStatus = await getNetworkStatus()
    if (networkStatus) {
        console.log('KJKJKJK00')
        const config = {
            url: url,
            method: 'POST',
            headers: header,
            data: body1 instanceof FormData ? body1 : JSON.stringify(body1),
        };
        console.log('KJKJKJK01')

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Timeout of 5 seconds exceeded'));
            }, REQUEST_TIMEOUT);
        });
        console.log('KJKJKJK03')
        try {
            console.log('KJKJKJK044', config)
            console.log('KJKJKJK044', timeoutPromise)
            const response = await Promise.race([axios(config), timeoutPromise]);
            console.log('KJKJKJK05', response)
            console.log('URL ==>', config.url, '\nHeaders ==>', config.headers, '\nType ==>', config.method, '\nInput ==>', config.data, '\nResponse ==>', JSON.stringify(response.data));
            console.log('KJKJKJK06')
            return response;

        } catch (error) {
            console.log('KJKJKJK07')
            console.log('URL ==>', config.url, '\nHeaders ==>', config.headers, '\nType ==>', config.method, '\nInput ==>', config.data, '\nError ==>', error.message);
            console.log('KJKJKJK08')
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('Response Error ===>', error.response.url);
                console.log('Response Status ===>', error.response.status);
                console.log('Response Headers ===>', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log('No Response Received ===>', error.request);
                return 501;
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Request Error ===>', error.message);
                return 501;
            }
            throw error;
        }
    } else {
        // SimpleToast.show(strings.no_internet_conneccted)
    }

};

export const GetApiCall = async (
    url,
    header = { 'content-Type': 'application/json' },
) => {
    var networkStatus = await getNetworkStatus()
    if (networkStatus) {
        const config = {
            url: url,
            method: 'get',
            headers: header,
        };
        try {
            const response = await axios(config);
            console.log('URL ==>', config.url, '\nHeaders ==>', config.headers, '\nType ==>', config.method, '\nInput ==>', config.data, '\nResponse ==>', response.data);
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('Response Error ===>', error.response.data);
                console.log('Response Status ===>', error.response.status);
                console.log('Response Headers ===>', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log('No Response Received ===>', error.request);
                return 501;
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Request Error ===>', error.message);
                return 501;
            }
            throw error;
        }
    }
};

export async function GetApiHeadersWithoutUserId() {
    var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    return headers;
}

export async function getUserIdFromStorage() {
    var userId = await retrieveData(USER_ID);
    userId = userId.toString()
    return userId;
}
export async function getUserNameFromStorage() {
    var userName = await retrieveData(USER_NAME);
    userName = userName.toString()
    return userName;
}

export async function getUserMobileNoFromStorage() {
    var userMobileNo = await retrieveData(MOBILE_NUMBER);
    userMobileNo = userMobileNo.toString()
    return userMobileNo;
}

export async function getNetworkStatus() {
    const response = await NetInfo.fetch();
    global.isNetworkConnected = response.isConnected
    return response.isConnected;
}


export function toUrlEncodedString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            keyValuePairs.push(
                encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
            );
        }
    }
    return keyValuePairs.join('&');
}


function constructFailureObject(message) {
    message = (message == undefined) ? strings.something_went_wrong : message
    var newResponse = {
        statusCode: 0,
        message: message,
        Message: message,
        Status: ""
    }

    return newResponse
}


function forceLogoutUser() {
    EventRegister.emit('LogoutEvent', 'logOut')

}

export const uploadFormData = async (formData, url, headers) => {
    try {
        const response = await axios.post(url, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("URL ==> ", url);
        console.log("Headers ==> ", headers);
        console.log("Request ==> ", formData);
        console.log("Response ==> ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading form data:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        throw error;
    }
};


