import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { AppTopNavigationBar, Icon, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import {
  CONTAINER_TITLE_TEXT,
  MAINVIEW_NAVIGATIONBAR_STYLE,
  ACTIVITY_INDICATOR_STYLE,
} from "../../utils/globalStyles"
import { vehicleListScreen } from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { screenNames } from "../../utils/constants"
import firestore from "@react-native-firebase/firestore"
import _ from "lodash"

export const VehicleListScreen = observer(function VehicleListScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  const [searchVehicleName, setSearchVehicleName] = useState("")
  const [arrVehicleDetails, setArrVehicleDetails] = useState([])
  const [fullArrVehicleDetails, setFullArrVehicleDetails] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const route = useRoute()

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    const getPartyDetailList = async () => {
      setIsLoading(true)
      let users: any = await firestore().collection("vehicle_details").get()
      if (users) {
        setIsLoading(false)
        if (users.length > 0) {
          setArrVehicleDetails(users)
          setFullArrVehicleDetails(users)
        } else if (users.length == 0) {
          setArrVehicleDetails([])
          setFullArrVehicleDetails([])
        }
      }
    }

    getPartyDetailList()
    const subscriber = firestore().collection("vehicle_details").onSnapshot(onResult, onError)

    // Stop listening for updates when no longer required
    return () => subscriber()
    // firestore().collection("vehicle_details").onSnapshot(onResult, onError)

    //========== Code for local storage =========
    //fetchVehicleDataList()
  }, [route])

  function onResult(QuerySnapshot) {
    // console.log('Got Users collection result.', QuerySnapshot._docs);
    let tempArr = _.get(QuerySnapshot, "_docs", [])
    let resultArray = []
    if (tempArr) {
      if (tempArr.length > 0) {
        tempArr.forEach((element) => {
          resultArray.push(element._data)
        })
        setArrVehicleDetails(resultArray)
        setFullArrVehicleDetails(resultArray)
      } else if (tempArr.length == 0) {
        setArrVehicleDetails([])
        setFullArrVehicleDetails([])
      }
    }
    setIsLoading(false)
  }

  function onError(error) {
    console.error(error)
    setIsLoading(false)
  }

  //========== Code for local storage =========
  // const fetchVehicleDataList = () => {
  //   let realm = new Realm({ path: "UserDatabase.realm" })
  //   var vehicle_details = realm.objects("vehicle_details")
  //   let tempArrService = []
  //   if (vehicle_details.length > 0) {
  //     for (let index = 0; index < vehicle_details.length; index++) {
  //       const element: any = vehicle_details[index]
  //       // console.log("====== Temp Array", element.service_name)
  //       tempArrService.push(element)
  //     }
  //   } else {
  //     console.log("====== Blank Array ======")
  //   }
  //   setArrVehicleDetails(tempArrService)
  //   setFullArrVehicleDetails(tempArrService)
  // }

  //========== Code for local storage =========
  // window.fetchVehicleData = () => {
  //   fetchVehicleDataList()
  // }

  const searchVehicle = (value: string) => {
    console.log("value",value);
    
    if (value == "") {
      setArrVehicleDetails(fullArrVehicleDetails)
    } else {
      let tempArr = []
      fullArrVehicleDetails
        .filter((item) => item.driverName.toLowerCase().includes(value.toLowerCase()))
        .map((resultItem) => tempArr.push(resultItem))
        console.log("tempArr",tempArr);
        
      setArrVehicleDetails(tempArr)
    }
    setSearchVehicleName(value)
  }

  function cellView(item, index) {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate(screenNames.k_vehicleDetailScreen, { item })}
      >
        <View key={item.id} style={vehicleListScreen.CARDVIEW_CELL_CONTAINER}>
          <View style={{ flexDirection: "row" }}>
            <Text text={`Vehicle Number - `} style={[vehicleListScreen.TXT_VEHICLE_NAME]} />
            <Text
              text={`${item.vehicleNumber}`}
              style={[vehicleListScreen.TXT_VEHICLE_NAME, { textTransform: "uppercase" }]}
            />
          </View>
          <Text
            text={`Driver Name - ${item.driverName}`}
            style={vehicleListScreen.TXT_VEHICLE_NAME}
          />
          <Text
            text={`Vehicle Type - ${item.vehicleType}`}
            style={vehicleListScreen.TXT_VEHICLE_NAME}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Screen style={vehicleListScreen.FULL} preset="fixed">
      {/* Header View */}
      <AppTopNavigationBar
        style={MAINVIEW_NAVIGATIONBAR_STYLE}
        textContainerStyle={CONTAINER_TITLE_TEXT}
        textStyle={vehicleListScreen.TXT_TITLE_STYLE}
        text="Vehicle List"
        isLeftButtonShow={true}
        leftIcon="backButton"
        rightIcon="addIcon"
        isRightButtonShow={true}
        btnRightStyle={vehicleListScreen.RIGHT_BUTTON_STYLE}
        onRightButtonPress={() => navigation.navigate(screenNames.k_vehicleDetailScreen)}
        onLeftButtonPress={() => navigation.goBack()}
      />

      <View style={{ flex: 1, backgroundColor: color.palette.purpple }}>
        {/* Search Bar */}
        <View style={vehicleListScreen.CONTAINER_SEARCHBAR}>
          <TextField
            inputStyle={vehicleListScreen.TXT_INPUT_STYLE}
            placeholderTx={"vehicleListScreen.searchVehicleName"}
            placeholderTextColor={color.palette.lightGrey}
            style={vehicleListScreen.CONTAINER_OVERRIDE_STYLE}
            secureTextEntry={false}
            keyboardType={"default"}
            onChangeText={(value) => searchVehicle(value)}
            onSubmitEditing={() => Keyboard.dismiss()}
            value={searchVehicleName}
          />
          <TouchableOpacity
            style={vehicleListScreen.SEARCH_BAR_ICON_STYLE}
            onPress={() => console.log("Search Button Pressed")}
          >
            <Icon icon="search" style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="white" style={ACTIVITY_INDICATOR_STYLE} />
        ) : /* List View */
        arrVehicleDetails.length > 0 ? (
          <FlatList
            data={arrVehicleDetails}
            style={vehicleListScreen.FLATLIST_STYLE}
            renderItem={({ item, index }) => cellView(item, index)}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text text={"No Vehicle Added"} style={vehicleListScreen.TXT_NO_VEHICLE_ADDED} />
        )}
      </View>
    </Screen>
  )
})
