import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, Keyboard, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppTopNavigationBar, Icon, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { serviceListScreen } from "./styles"
import { ACTIVITY_INDICATOR_STYLE, CONTAINER_TITLE_TEXT, MAINVIEW_NAVIGATIONBAR_STYLE } from "../../utils/globalStyles"
import { screenNames } from "../../utils/constants"
import { useNavigation } from "@react-navigation/native"
import firestore from "@react-native-firebase/firestore"
import _ from "lodash"

export const ServiceListScreen = observer(function ServiceListScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  const [searchServiceName, setSearchServiceName] = useState("")
  const [arrServiceDetails, setArrServiceDetails] = useState([])
  const [fullArrServiceDetails, setFullArrServiceDetails] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    const getServiceListFromFirebase = async () => {
      setIsLoading(true)
      let services: any = await firestore().collection("service_details").get()
      if (services) {
        setIsLoading(false)
        if (services.length > 0) {
          setArrServiceDetails(services)
          setFullArrServiceDetails(services)
        } else if (services.length == 0) {
          setArrServiceDetails([])
          setFullArrServiceDetails([])
        }
      }
    }

    getServiceListFromFirebase()

    const subscriber = firestore().collection("service_details").onSnapshot(onResult, onError)

    // Stop listening for updates when no longer required
    return () => subscriber()
    // firestore().collection("service_details").onSnapshot(onResult, onError)

    //========== Code for local storage =========
    // fetchServiceDataList()
  }, [])

  function onResult(QuerySnapshot) {
    // console.log('Got Users collection result.', QuerySnapshot._docs);
    let tempArr = _.get(QuerySnapshot, "_docs", [])
    let resultArray = []
    if (tempArr) {
      if (tempArr.length > 0) {
        tempArr.forEach((element) => {
          resultArray.push(element._data)
        })
        setArrServiceDetails(resultArray)
        setFullArrServiceDetails(resultArray)
      } else if (tempArr.length == 0) {
        setArrServiceDetails([])
        setFullArrServiceDetails([])
      }
    }
    setIsLoading(false)
  }

  function onError(error) {
    console.error(error)
  }

  //========== Code for local storage =========
  // const fetchServiceDataList = () => {
  //   let realm = new Realm({ path: "UserDatabase.realm" })
  //   var service_details = realm.objects("service_details")
  //   let tempArrService = []
  //   if (service_details.length > 0) {
  //     for (let index = 0; index < service_details.length; index++) {
  //       const element: any = service_details[index]
  //       // console.log("====== Temp Array", element.service_name)
  //       tempArrService.push(element)
  //     }
  //   } else {
  //     console.log("====== Blank Array ======")
  //   }
  //   setArrServiceDetails(tempArrService)
  //   setFullArrServiceDetails(tempArrService)
  // }

  //========== Code for local storage =========
  // window.fetchServiceData = () => {
  //   fetchServiceDataList()
  // }

  function cellView(item, index) {
    return (
      <TouchableOpacity
        key={`${index}`}
        onPress={() => navigation.navigate(screenNames.k_serviceDetailScreen, { item })}
      >
        <View style={serviceListScreen.CARDVIEW_CELL_CONTAINER}>
          <Text text={`HSN Code - ${item.hsnCode}`} style={serviceListScreen.TXT_SERVICE_NAME} />
          <Text text={`${item.desOfGoods}`} style={serviceListScreen.TXT_SERVICE_NAME} />
        </View>
      </TouchableOpacity>
    )
  }

  const searchService = (value: string) => {
    if (value == "") {
      setArrServiceDetails(fullArrServiceDetails)
    } else {
      let tempArr = []
      fullArrServiceDetails
        .filter((item) => item.desOfGoods.toLowerCase().includes(value.toLowerCase()))
        .map((resultItem) => tempArr.push(resultItem))
      setArrServiceDetails(tempArr)
    }
    setSearchServiceName(value)
  }

  return (
    <Screen style={serviceListScreen.FULL} preset="fixed">
      {/* Header View */}
      <AppTopNavigationBar
        style={MAINVIEW_NAVIGATIONBAR_STYLE}
        textContainerStyle={CONTAINER_TITLE_TEXT}
        textStyle={serviceListScreen.TXT_TITLE_STYLE}
        text="Service List"
        isLeftButtonShow={true}
        leftIcon="backButton"
        rightIcon="addIcon"
        isRightButtonShow={true}
        btnRightStyle={serviceListScreen.RIGHT_BUTTON_STYLE}
        onRightButtonPress={() => navigation.navigate(screenNames.k_serviceDetailScreen)}
        onLeftButtonPress={() => navigation.goBack()}
      />

      <View style={{ flex: 1, backgroundColor: color.palette.purpple }}>
        {/* Search Bar */}
        <View style={serviceListScreen.CONTAINER_SEARCHBAR}>
          <TextField
            inputStyle={serviceListScreen.TXT_INPUT_STYLE}
            placeholderTx={"serviceListScreen.searchServiceName"}
            placeholderTextColor={color.palette.lightGrey}
            style={serviceListScreen.CONTAINER_OVERRIDE_STYLE}
            secureTextEntry={false}
            keyboardType={"default"}
            onChangeText={(value) => searchService(value)}
            onSubmitEditing={() => Keyboard.dismiss()}
            value={searchServiceName}
          />
          <TouchableOpacity
            style={serviceListScreen.SEARCH_BAR_ICON_STYLE}
            onPress={() => console.log("Search Button Pressed")}
          >
            <Icon icon="search" style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="white" style={ACTIVITY_INDICATOR_STYLE} />
        ) : /* List View */
        arrServiceDetails.length > 0 ? (
          <FlatList
            data={arrServiceDetails}
            style={serviceListScreen.FLATLIST_STYLE}
            renderItem={({ item, index }) => cellView(item, index)}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text text={"No Service Added"} style={serviceListScreen.TXT_NO_SERVICE_ADDED} />
        )}
      </View>
    </Screen>
  )
})
