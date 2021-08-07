import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, Image, Keyboard, useWindowDimensions, View, ViewStyle } from "react-native"
import { AppTopNavigationBar, Icon, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { partyListScreen } from "./styles"
import { MAINVIEW_NAVIGATIONBAR_STYLE, CONTAINER_TITLE_TEXT, ACTIVITY_INDICATOR_STYLE } from "../../utils/globalStyles"
import { generateBillScreen } from "../generate-bill-screen/styles"
import { useNavigation } from "@react-navigation/native"
import { screenNames } from "../../utils/constants"
import { TouchableOpacity } from "react-native-gesture-handler"
import { fontSizes } from "../../theme/size"
import firestore from "@react-native-firebase/firestore"
import _ from "lodash"

export const PartyListScreen = observer(function PartyListScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const [searchPartyName, setSearchPartyName] = useState("")
  const [arrPartyDetails, setArrPartyDetails] = useState([])
  const [fullArrPartyDetails, setFullArrPartyDetails] = useState([])
  // Pull in navigation via hook
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    const getPartyDetailList = async () => {
      setIsLoading(true)
      let users: any = await firestore().collection("party_details").get()
      if (users) {
        setIsLoading(false)
        if (users.length > 0) {
          setArrPartyDetails(users)
          setFullArrPartyDetails(users)
        } else if (users.length == 0) {
          setArrPartyDetails([])
          setFullArrPartyDetails([])
        }
      }
    }

    getPartyDetailList()
    const subscriber = firestore().collection("party_details").onSnapshot(onResult, onError)

    // Stop listening for updates when no longer required
    return () => subscriber()
    // firestore().collection("party_details").onSnapshot(onResult, onError)

    //========== Code for local storage =========
    // fetchPartyDataList()
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
        setArrPartyDetails(resultArray)
        setFullArrPartyDetails(resultArray)
      } else if (tempArr.length == 0) {
        setArrPartyDetails([])
        setFullArrPartyDetails([])
      }
    }
    setIsLoading(false)
  }

  function onError(error) {
    console.error(error)
  }

  //========== Code for local storage =========
  // const fetchPartyDataList = () => {
  //   let realm = new Realm({ path: "UserDatabase.realm" })
  //   var party_details = realm.objects("party_details")
  //   let tempArrParty = []
  //   if (party_details.length > 0) {
  //     for (let index = 0; index < party_details.length; index++) {
  //       const element: any = party_details[index]
  //       // console.log("====== Temp Array", element.party_name)
  //       tempArrParty.push(element)
  //     }
  //   } else {
  //     console.log("====== Blank Array ======")
  //   }
  //   setArrPartyDetails(tempArrParty)
  //   setFullArrPartyDetails(tempArrParty)
  // }

  //========== Code for local storage =========
  // window.fetchPartyData = () => {
  //   fetchPartyDataList()
  // }

  function cellView(item, index) {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => navigation.navigate(screenNames.k_partyDetailScreen, { item })}
      >
        <View style={partyListScreen.CARDVIEW_CELL_CONTAINER}>
          <Text text={`Party Name - ${item.party_name}`} style={partyListScreen.TXT_PARTY_NAME} />
          <Text
            text={`Address - ${item.party_address1 + ", " + item.party_address2}`}
            style={partyListScreen.TXT_PARTY_NAME}
          />
          <Text text={`GST No. - ${item.party_GSTNumber}`} style={partyListScreen.TXT_PARTY_NAME} />
          {item.party_contact != "" && (
            <Text
              text={`Contact No. - ${item.party_contact}`}
              style={partyListScreen.TXT_PARTY_NAME}
            />
          )}
          <Text text={`State - ${item.party_State}`} style={partyListScreen.TXT_PARTY_NAME} />
          <Text
            text={`State code - ${item.party_StateCode}`}
            style={partyListScreen.TXT_PARTY_NAME}
          />
        </View>
      </TouchableOpacity>
    )
  }

  const searchParty = (value: string) => {
    if (value == "") {
      setArrPartyDetails(fullArrPartyDetails)
    } else {
      let tempArr = []
      fullArrPartyDetails
        .filter((item) => item.party_name.toLowerCase().includes(value.toLowerCase()))
        .map((resultItem) => tempArr.push(resultItem))
      setArrPartyDetails(tempArr)
    }
    setSearchPartyName(value)
  }

  return (
    <Screen style={partyListScreen.FULL} preset="fixed">
      {/* Header View */}
      <AppTopNavigationBar
        style={MAINVIEW_NAVIGATIONBAR_STYLE}
        textContainerStyle={CONTAINER_TITLE_TEXT}
        textStyle={partyListScreen.TXT_TITLE_STYLE}
        text="Party List"
        isLeftButtonShow={true}
        leftIcon="backButton"
        rightIcon="addIcon"
        isRightButtonShow={true}
        btnRightStyle={partyListScreen.RIGHT_BUTTON_STYLE}
        onRightButtonPress={() => navigation.navigate(screenNames.k_partyDetailScreen)}
        onLeftButtonPress={() => navigation.goBack()}
      />

      <View style={{ flex: 1, backgroundColor: color.palette.purpple }}>
        {/* Search Bar */}
        <View style={partyListScreen.CONTAINER_SEARCHBAR}>
          <TextField
            inputStyle={partyListScreen.TXT_INPUT_STYLE}
            placeholderTx={"partyListScreen.searchPartyName"}
            placeholderTextColor={color.palette.lightGrey}
            style={partyListScreen.CONTAINER_OVERRIDE_STYLE}
            secureTextEntry={false}
            keyboardType={"default"}
            onChangeText={(value) => searchParty(value)}
            onSubmitEditing={() => Keyboard.dismiss()}
            value={searchPartyName}
          />
          <TouchableOpacity
            style={partyListScreen.SEARCH_BAR_ICON_STYLE}
            onPress={() => console.log("Search Button Pressed")}
          >
            <Icon icon="search" style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="white" style={ACTIVITY_INDICATOR_STYLE} />
        ) : 
        /* List View */
        arrPartyDetails.length > 0 ? (
          <FlatList
            data={arrPartyDetails}
            style={partyListScreen.FLATLIST_STYLE}
            renderItem={({ item, index }) => cellView(item, index)}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text text={"No Party Added"} style={partyListScreen.TXT_NO_PARTY_ADDED} />
        )}
      </View>
    </Screen>
  )
})
