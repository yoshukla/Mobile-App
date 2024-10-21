import { PermissionsAndroid, Alert, Platform } from 'react-native';
import { openSettings } from 'react-native-permissions';

/**
 * Reusable function to check and request camera, read, and write storage permissions.
 */
export const requestCameraAndStoragePermissions = async () => {
  if (Platform.OS === 'android') {
    const sdkVersion = Platform.Version;

    try {
      // First, check and request camera permission
      const cameraPermissionGranted = await checkAndRequestPermission(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        'Camera'
      );
      if (!cameraPermissionGranted) return false;

      // Check and request storage permissions based on Android version
      if (sdkVersion >= 33) {
        // Android 13 and above (Scoped Storage)
        const storagePermissionGranted = await requestScopedStoragePermissions();
        return storagePermissionGranted;
      } else {
        // Android 12 and below (Legacy Storage)
        const storagePermissionGranted = await requestLegacyStoragePermissions();
        return storagePermissionGranted;
      }
    } catch (err) {
      console.warn('Permission request failed', err);
      return false;
    }
  } else {
    return true; // For iOS or other platforms
  }
};

/**
 * Function to check and request a specific permission.
 */
const checkAndRequestPermission = async (permission, permissionName) => {
  const isGranted = await PermissionsAndroid.check(permission);
  if (isGranted) {
    return true;
  }

  const result = await PermissionsAndroid.request(permission);
  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    showSettingsAlert(permissionName);
    return false;
  } else {
    return false;
  }
};

/**
 * Handle storage permissions for Android 13+ (Scoped Storage).
 */
const requestScopedStoragePermissions = async () => {
  const permissions = [
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
  ];

  const results = await PermissionsAndroid.requestMultiple(permissions);
  const allGranted = Object.values(results).every(
    (result) => result === PermissionsAndroid.RESULTS.GRANTED
  );

  if (allGranted) {
    return true;
  } else if (
    Object.values(results).some(
      (result) => result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    )
  ) {
    showSettingsAlert('Storage');
    return false;
  } else {
    return false;
  }
};

/**
 * Handle storage permissions for Android 12 and below (Legacy Storage).
 */
const requestLegacyStoragePermissions = async () => {
  const readGranted = await checkAndRequestPermission(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    'Read Storage'
  );
  if (!readGranted) return false;

  const writeGranted = await checkAndRequestPermission(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    'Write Storage'
  );
  return writeGranted;
};

/**
 * Show an alert when permissions are denied and the user has selected "Don't ask again".
 */
const showSettingsAlert = (permissionName) => {
  Alert.alert(
    `${permissionName} Permission`,
    `You have denied ${permissionName} permission and selected "Don't ask again". Please enable it from settings.`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => openSettings() }
    ]
  );
};
