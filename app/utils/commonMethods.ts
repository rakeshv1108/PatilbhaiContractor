
import { Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { common } from './constants';

export const eighteenYearAfterDateFromCurrentDate = (currentDate, days) => {
  return new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000)
}

export function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate()
}

// ============================= Remove Item From Filter ========================================
export const removeItemFilter = (arr, value) => {
    var i = 0
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i
        }
    }
    return arr
}

// ============================= Remove Item From Filter ========================================
export const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// ===================================== Refresh State Method =====================================
export const refreshArray = (arr) => {
  return JSON.parse(JSON.stringify(arr))
}

// ===================================== Download Image Method =====================================
export const downloadImage = async (strUrl, imageName) => {
  const { config, fs } = RNFetchBlob;
  try{
    let PictureDir = fs.dirs.PictureDir;
    if(imageName == 'greyhound_font.ttf'){
     PictureDir = fs.dirs.DocumentDir;
    }
    let imagePath = PictureDir + '/' + imageName;
    let isExists = await fs.exists(imagePath).catch(err => console.log("========Error", err))
    
    if(!isExists){
      var image_URL = strUrl;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: PictureDir + '/' + imageName,
          description: imageName == "greyhound_font.ttf" ? 'file' : 'Image'
        }
      }
      config(options).fetch('GET', image_URL).then((res) => {
        Alert.alert(common.app_name, imageName == "crane_image.png" ? 
        "Crane Image Downloaded Successfully." 
        : 
        "PC Logo Image Downloaded Successfully.");
        // console.log("========path",res)
      }).catch((err) => console.log("====Error",JSON.stringify(err)));
    }
  }catch(error){
    console.log("====Error is:",error)
  }
}