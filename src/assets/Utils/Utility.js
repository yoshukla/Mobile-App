import RNFS from 'react-native-fs';
import { Alert } from 'react-native';

/**
 * Save the image to a specific folder with a unique date-time based filename.
 * 
 * @param {string} imagePath - The temporary path of the captured image.
 * @param {string} folderName - The name of the folder where the image will be saved.
 * @returns {Promise<string>} - Returns the path of the saved image.
 */
export const saveImageToFolder = async (imagePath, folderName = 'MyImages') => {
  try {
    // Get the current date and time for a unique filename
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const formattedTime = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    const fileName = `IMG_${formattedDate}_${formattedTime}.jpg`;

    // Define the folder path (you can adjust this for external storage if needed)
    const directoryPath = `${RNFS.DocumentDirectoryPath}/${folderName}`;
    const filePath = `${directoryPath}/${fileName}`;

    // Check if the folder exists, create if not
    const folderExists = await RNFS.exists(directoryPath);
    if (!folderExists) {
      await RNFS.mkdir(directoryPath);
    }

    // Move the file to the new location
    await RNFS.moveFile(imagePath, filePath);

    console.log('Image saved at:', filePath);
    return "file://"+filePath;  // Return the new file path for further usage
    // return filePath;  // Return the new file path for further usage
  } catch (error) {
    console.error('Failed to save image:', error);
    Alert.alert('Error', 'Failed to save image.');
    throw error;  // Rethrow error to handle it where needed
  }
};
