import React, { useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, KeyboardType, ScrollView, TouchableOpacity, View } from "react-native"
import {
  AppCommonButton,
  AppTopNavigationBar,
  Icon,
  Screen,
  Text,
  TextField,
} from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { partyDetailScreen } from "./styles"
import { alertMessages, common } from "../../utils/constants"
import { MAINVIEW_NAVIGATIONBAR_STYLE, CONTAINER_TITLE_TEXT } from "../../utils/globalStyles"
import { useNavigation, useRoute } from "@react-navigation/native"
import * as objRealm from "../../database/allPartiesDetails"
import { makeid } from "../../utils/commonMethods"
import { useEffect } from "react"
import _ from "lodash"
import * as validate from "../../utils/Validation"
import firestore from "@react-native-firebase/firestore"

export const PartyDetailScreen = observer(function PartyDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const [partyName, setpartyName] = useState("")
  const [partyAddress1, setpartyAddress1] = useState("")
  const [partyAddress2, setpartyAddress2] = useState("")
  const [partyGstNumber, setpartyGstNumber] = useState("")
  const [partyState, setpartyState] = useState("")
  const [partyContactNumber, setPartyContactNumber] = useState("")
  const [stateCode, setStateCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentEditableTextField, setCurrentEditableTextField] = useState("")

  const txtPartyName: any = useRef()
  const txtPartyAddress1: any = useRef()
  const txtPartyAddress2: any = useRef()
  const txtPartyGSTNumber: any = useRef()
  const txtPartyState: any = useRef()
  const txtPartyStateCode: any = useRef()
  const txtPartyContactNumber: any = useRef()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const route = useRoute()
  const partyData = _.get(route, "params.item", "")

  useEffect(() => {
    setpartyName(`${_.get(partyData, "party_name", "")}`)
    setpartyAddress1(`${_.get(partyData, "party_address1", "")}`)
    setpartyAddress2(`${_.get(partyData, "party_address2", "")}`)
    setpartyGstNumber(`${_.get(partyData, "party_GSTNumber", "")}`)
    setpartyState(`${_.get(partyData, "party_State", "")}`)
    setStateCode(`${_.get(partyData, "party_StateCode", "")}`)
    setPartyContactNumber(`${_.get(partyData, "party_contact", "")}`)
  }, [route.params])

  const setTextFieldPartyDetails = [
    {
      placeholderTx: "generateBillScreen.partyName",
      keyboardType: "default" as KeyboardType,
      stateName: "partyName",
      originalState: partyName,
      currentRef: txtPartyName,
      setMaxChar: 60,
    },
    {
      placeholderTx: "generateBillScreen.address1",
      keyboardType: "default" as KeyboardType,
      stateName: "partyAddress1",
      originalState: partyAddress1,
      currentRef: txtPartyAddress1,
      setMaxChar: 100,
    },
    {
      placeholderTx: "generateBillScreen.address2",
      keyboardType: "default" as KeyboardType,
      stateName: "partyAddress2",
      originalState: partyAddress2,
      currentRef: txtPartyAddress2,
      setMaxChar: 100,
    },
    {
      placeholderTx: "generateBillScreen.gstNumber",
      keyboardType: "default" as KeyboardType,
      stateName: "partyGstNumber",
      originalState: partyGstNumber,
      currentRef: txtPartyGSTNumber,
      setMaxChar: 15,
    },
    {
      placeholderTx: "generateBillScreen.state",
      keyboardType: "default" as KeyboardType,
      stateName: "partyState",
      originalState: partyState,
      currentRef: txtPartyState,
      setMaxChar: 20,
    },
    {
      placeholderTx: "generateBillScreen.stateCode",
      keyboardType: "number-pad" as KeyboardType,
      stateName: "stateCode",
      originalState: stateCode,
      currentRef: txtPartyStateCode,
      setMaxChar: 2,
    },
    {
      placeholderTx: "generateBillScreen.partyContactNumber",
      keyboardType: "number-pad" as KeyboardType,
      stateName: "partyContactNumber",
      originalState: partyContactNumber,
      currentRef: txtPartyContactNumber,
      setMaxChar: 10,
    },
  ]

  const btnAddPartyButtonPressed = () => {
    let errorMessage = isValidOrNot()
    if (errorMessage == "") {
      setIsLoading(true)
      let partyId = _.get(partyData, "party_id", "")
      if (partyId != "") {
        console.log("update Data")

        // Update Data
        let updateServiceProperty = {
          party_id: partyId,
          party_name: partyName,
          party_contact: partyContactNumber,
          party_address1: partyAddress1,
          party_address2: partyAddress2,
          party_GSTNumber: partyGstNumber,
          party_State: partyState,
          party_StateCode: stateCode,
        }

        firestore()
          .collection("party_details")
          .doc(`${partyId}`)
          .update(updateServiceProperty)
          .then(() => {
            setIsLoading(false)
            Alert.alert(common.app_name, alertMessages.k_partyUpdateSuccessfully, [
              { text: "OK", onPress: () => navigation.goBack() },
            ])   
          })
          .catch((err) => {
            setIsLoading(false)
            Alert.alert(common.app_name, `${err}`)
          })

        //========== Code for local storage =========
        // objRealm
        //   .updateItemInSchema("party_details", updateServiceProperty)
        //   .then((res) => {
        //     console.log("==== Added PartyName ====", res)
        //     window.fetchPartyData()
        //     Alert.alert(common.app_name, alertMessages.k_partyUpdateSuccessfully, [
        //       { text: "OK", onPress: () => navigation.goBack() },
        //     ])
        //   })
        //   .catch((err) => {
        //     setIsLoading(false)
        //     console.log("Error is", err)
        //     Alert.alert("error ", `${err}`)
        //   })
      } else {
        let id = makeid(10)
        let addPartyProperty = {
          party_id: `${id}`,
          party_name: partyName,
          party_contact: partyContactNumber,
          party_address1: partyAddress1,
          party_address2: partyAddress2,
          party_GSTNumber: partyGstNumber,
          party_State: partyState,
          party_StateCode: stateCode,
        }

        firestore()
          .collection("party_details")
          .doc(`${id}`)
          .set(addPartyProperty)
          .then(() => {
            setIsLoading(false)
            Alert.alert(common.app_name, alertMessages.k_partyAddedSuccessfully, [
              { text: "OK", onPress: () => navigation.goBack() },
            ])
          })
          .catch((err) => {
            setIsLoading(false)
            Alert.alert(common.app_name, `${err}`)
          })

        //========== Code for local storage =========
        // objRealm
        //   .addPropertyToSchema("party_details", addPartyProperty)
        //   .then((res) => {
        //     console.log("==== Updated PartyName ====", res)
        //     window.fetchPartyData()
        //     Alert.alert(common.app_name, alertMessages.k_partyAddedSuccessfully, [
        //       { text: "OK", onPress: () => navigation.goBack() },
        //     ])
        //   })
        //   .catch((err) => {
        //     setIsLoading(false)
        //     console.log("Error is", err)
        //     Alert.alert("error ", `${err}`)
        //   })
      }
    } else {
      Alert.alert(common.app_name, errorMessage)
    }
  }

  const setValueToState = (stateName: any, Value: string) => {
    setCurrentEditableTextField(stateName)
    if (stateName == "partyName") {
      setpartyName(Value)
    } else if (stateName == "partyAddress1") {
      setpartyAddress1(Value)
    } else if (stateName == "partyAddress2") {
      setpartyAddress2(Value)
    } else if (stateName == "partyGstNumber") {
      setpartyGstNumber(Value.toUpperCase())
    } else if (stateName == "partyState") {
      setpartyState(Value)
    } else if (stateName == "stateCode") {
      setStateCode(Value)
    } else if (stateName == "partyContactNumber") {
      setPartyContactNumber(Value)
    }
  }

  const focusField = (txtField: any) => {
    setTimeout(function () {
      txtField.current.focus()
    }, 100)
  }

  const btnEditTextField = (textFieldName) => {
    setTextFieldPartyDetails
      .filter((item) => item.stateName == textFieldName)
      .map((resultItem) => focusField(resultItem.currentRef))
    setCurrentEditableTextField(textFieldName)
  }

  const deleteItem = (item: any) => {
    Alert.alert(common.app_name, alertMessages.k_confirmToDelete, [
      {
        text: "YES",
        onPress: () => {
          setIsLoading(true)
          let itemId = _.get(item, "party_id", "")

          firestore()
            .collection("party_details")
            .doc(`${itemId}`)
            .delete()
            .then(() => {
              setIsLoading(false)
              Alert.alert(common.app_name, alertMessages.k_partyDeleteSuccessfully, [
                { text: "OK", onPress: () => navigation.goBack() },
              ])
            })
            .catch((err) => {
              setIsLoading(false)
              Alert.alert(common.app_name, `${err}`)
            })
          //========== Code for local storage =========
          // objRealm
          //   .deletePropertyToSchema("party_details", _.get(item, "party_id", ""))
          //   .then((res) => {
          //     console.log("==== Delete party ====", res)
          //     window.fetchPartyData()
          //     Alert.alert(common.app_name, alertMessages.k_partyDeleteSuccessfully, [
          //       { text: "OK", onPress: () => navigation.goBack() },
          //     ])
          //   })
          //   .catch((err) => {
          //     setIsLoading(false)
          //     console.log("Error is", err)
          //     Alert.alert("error ", `${err}`)
          //   })
        },
      },
      { text: "NO", onPress: () => {} },
    ])
  }

  const isValidOrNot = () => {
    let errorMessage = ""
    if (validate.isBlank(partyName)) {
      errorMessage = alertMessages.k_err_PartyName
    } else if (validate.isBlank(partyAddress1)) {
      errorMessage = alertMessages.k_err_PartyAddress
    } else if (validate.isBlank(partyGstNumber)) {
      errorMessage = alertMessages.k_err_PartyGSTNumber
    } else if (validate.isBlank(partyState)) {
      errorMessage = alertMessages.k_err_PartyState
    } else if (validate.isBlank(stateCode)) {
      errorMessage = alertMessages.k_err_PartyStateCode
    } else if (!validate.onlyAlphabets(partyName)) {
      errorMessage = alertMessages.k_err_onlyAlphabetsInPartyName
    } else if (!validate.isValidGSTLength(partyGstNumber)) {
      errorMessage = alertMessages.k_err_notValidLengthOfGSTNumber
    } else if (!validate.isValidGSTNumber(partyGstNumber)) {
      errorMessage = alertMessages.k_err_InvalidGSTNumber
    }
    // else if(!validate.validateMinMaxLengthForPhone(partyContactNumber)) {
    //   errorMessage = alertMessages.k_err_NotValidLengthOfPhoneNumber
    // }
    return errorMessage
  }

  return (
    <Screen style={partyDetailScreen.FULL} preset="fixed">
      {/* Header View */}
      <AppTopNavigationBar
        style={MAINVIEW_NAVIGATIONBAR_STYLE}
        textContainerStyle={CONTAINER_TITLE_TEXT}
        textStyle={
          partyData == "" ? partyDetailScreen.TXT_CENTER_TITLE : partyDetailScreen.TXT_TITLE_STYLE
        }
        text="Party Detail"
        isLeftButtonShow={true}
        leftIcon="backButton"
        isRightButtonShow={partyData == "" ? false : true}
        rightIcon="delete"
        onRightButtonPress={() => deleteItem(partyData)}
        btnRightStyle={partyDetailScreen.BTN_DELETE_STYLE}
        onLeftButtonPress={() => navigation.goBack()}
        rightButtonIconStyle={partyDetailScreen.DELETE_ICON}
      />
      <ScrollView style={{ backgroundColor: color.palette.purpple }}>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          {setTextFieldPartyDetails.map((data) => (
            <View key={data.stateName}>
              <Text tx={data.placeholderTx} style={partyDetailScreen.TXT_LABEL_STYLE} />
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TextField
                  inputStyle={partyDetailScreen.TXT_INPUT_STYLE_WITH_PENCIL}
                  placeholderTx={data.placeholderTx}
                  placeholderTextColor={color.palette.lightGrey}
                  style={partyDetailScreen.CONTAINER_OVERRIDE_STYLE}
                  secureTextEntry={false}
                  multiline={false}
                  currentRef={data.currentRef}
                  maxLength={data.setMaxChar}
                  keyboardType={data.keyboardType}
                  isEditable={currentEditableTextField === data.stateName ? true : true}
                  onChangeText={(value) => setValueToState(data.stateName, value)}
                  value={data.originalState}
                />
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => btnEditTextField(data.stateName)}
                  style={partyDetailScreen.BTNEDITTEXTFIELD}
                >
                  <Icon style={partyDetailScreen.EDIT_ICON_STYLE} icon="editPencil" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <AppCommonButton
          isLoading={isLoading}
          style={partyDetailScreen.SAVRCARD_BUTTON_STYLE}
          textStyle={partyDetailScreen.TXT_SAVECARD}
          text="ADD PARTY"
          onPress={() => btnAddPartyButtonPressed()}
        />
      </ScrollView>
    </Screen>
  )
})
