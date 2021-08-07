import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Alert, PermissionsAndroid, TouchableOpacity, View } from "react-native"
import { AppTopNavigationBar, Screen, Text } from "../../components"
import { homeScreen } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { alertMessages, common, screenNames } from "../../utils/constants"
import { checkMultiple, PERMISSIONS } from "react-native-permissions"
import { CONTAINER_TITLE_TEXT, MAINVIEW_NAVIGATIONBAR_STYLE } from "../../utils/globalStyles"
import { downloadImage } from "../../utils/commonMethods"

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const [isLoading, setIsLoading] = useState(false)

  // Pull in navigation via hook
  const navigation = useNavigation()

  // const btnCreateBillPressed = () => {
  //   navigation.navigate(screenNames.k_generateBillScreen)
  // }

  const btnPartyDetailPressed = () => {
    navigation.navigate(screenNames.k_partyListScreen)
  }

  const btnServiceDetailPressed = () => {
    navigation.navigate(screenNames.k_serviceListScreen)
  }

  const btnVehicleDetailPressed = () => {
    navigation.navigate(screenNames.k_vehicleListScreen)
  }

  // const requestStoragePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: "Patilbhai Contractor",
  //         message: "Please accept storage permission so app can store files in local",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the storage permission");
  //     } else {
  //       Alert.alert(common.app_name, alertMessages.k_mandatoryStoragePermission,[
  //         {text: 'OK', onPress: () => checkPermission()}
  //       ])
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const checkPermission = () => {
  //   checkMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then((statuses) => {
  //     console.log('READ_EXTERNAL_STORAGE', statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]);
  //     console.log('WRITE_EXTERNAL_STORAGE', statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]);
  //     let isReadPermission = statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
  //     let isWritePermission = statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];
  //     if (isReadPermission == 'granted' || isWritePermission == 'granted') {
  //       console.log("======Permission Got=========")
  //       checkImagesAreAvailableOrNot()
  //     }else{
  //       requestStoragePermission()
  //     }
  //   });
  // }

  // const checkImagesAreAvailableOrNot = async () => {
  //   setIsLoading(true)
  //   let craneImage = 'https://www.linkpicture.com/q/crane_image@3x.png'
  //   let pcLogo = 'https://www.linkpicture.com/q/pc_logo_1.png'
  //   await downloadImage(craneImage, 'crane_image.png')
  //   await downloadImage(pcLogo, 'pc_logo.png')
  //   setIsLoading(false)
  // }

  // useEffect(() => {
      // checkPermission()
  // }, [])

  return (
    <Screen style={homeScreen.FULL} preset="fixed">
      {/* Header View */}
      <AppTopNavigationBar
        style={homeScreen.MAINVIEW_NAVIGATIONBAR_STYLE}
        textContainerStyle={CONTAINER_TITLE_TEXT}
        textStyle={homeScreen.TXT_TITLE_STYLE}
        text="Home Screen"
      />

      {isLoading ?
        <ActivityIndicator style={homeScreen.VIEW_ACTIVITY_INDICATOR} size='large' /> 
      :
        <View style={homeScreen.CONTAINER_BUTTONS}>
          {/* <TouchableOpacity style={homeScreen.BTN_COMMON_LIST} onPress={() => btnCreateBillPressed()}>
            <Text preset="default" style={homeScreen.BTN_TEXT_STYLE} text="CREATE BILL" />
          </TouchableOpacity> */}

          <TouchableOpacity style={homeScreen.BTN_COMMON_LIST} onPress={() => btnPartyDetailPressed()}>
            <Text preset="default"  style={homeScreen.BTN_TEXT_STYLE} text="PARTY LIST" />
          </TouchableOpacity>

          <TouchableOpacity style={homeScreen.BTN_COMMON_LIST} onPress={() => btnServiceDetailPressed()}>
            <Text preset="default"  style={homeScreen.BTN_TEXT_STYLE} text="SERVICE LIST" />
          </TouchableOpacity>

          <TouchableOpacity style={homeScreen.BTN_COMMON_LIST} onPress={() => btnVehicleDetailPressed()}>
            <Text preset="default"  style={homeScreen.BTN_TEXT_STYLE} text="VEHICLE LIST" />
          </TouchableOpacity>
        </View>
      }
    </Screen>
  )
})
