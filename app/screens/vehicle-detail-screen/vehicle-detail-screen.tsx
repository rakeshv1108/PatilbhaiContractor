import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, KeyboardType, ScrollView, TouchableOpacity, View } from "react-native"
import { AppCommonButton, AppTopNavigationBar, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useNavigation, useRoute } from "@react-navigation/native"
import { MAINVIEW_NAVIGATIONBAR_STYLE, CONTAINER_TITLE_TEXT } from "../../utils/globalStyles"
import { serviceDetailScreen } from "../service-detail-screen/styles"
import { alertMessages, common } from "../../utils/constants"
import * as objRealm from "../../database/allPartiesDetails"
import { vehicleDetailScreen } from "./styles"
import { generateBillScreen } from "../generate-bill-screen/styles"
import { makeid } from "../../utils/commonMethods"
import _ from "lodash"
import * as validate from "../../utils/Validation"
import firestore from "@react-native-firebase/firestore"

export const VehicleDetailScreen = observer(function VehicleDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  const [vehicleNumber, setVehicleNumber] = useState("")
  const [driverName, setDriverName] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const txtvehicleNumber: any = useRef()
  const txtDriverName: any = useRef()

  const route = useRoute()
  const vehicleData = _.get(route, "params.item", "")

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    setVehicleNumber(`${_.get(vehicleData, "vehicleNumber", "")}`)
    setDriverName(`${_.get(vehicleData, "driverName", "")}`)
    setVehicleType(`${_.get(vehicleData, "vehicleType", "")}`)
  }, [route.params])

  const setTextFieldserviceDetails = [
    {
      placeholderTx: "vehicleListScreen.vehicleNumber",
      keyboardType: "visible-password" as KeyboardType,
      stateName: "vehicleNumber",
      originalState: vehicleNumber,
      currentRef: txtvehicleNumber,
      setMaxChar: 20,
    },
    {
      placeholderTx: "vehicleListScreen.driverName",
      keyboardType: "default" as KeyboardType,
      stateName: "driverName",
      originalState: driverName,
      currentRef: txtDriverName,
      setMaxChar: 50,
    },
  ]

  const btnAddVehicleButtonPressed = () => {
    let errorMessage = isValidOrNot()
    if (errorMessage == "") {
      setIsLoading(true)
      let vehicleId = _.get(vehicleData, "vehicle_id", "")
      if (vehicleId != "") {
        // Update Data
        let updateVehicleProperty = {
          vehicle_id: vehicleId,
          vehicleNumber: vehicleNumber,
          driverName: driverName,
          vehicleType: vehicleType,
        }

        firestore()
          .collection("vehicle_details")
          .doc(`${vehicleId}`)
          .update(updateVehicleProperty)
          .then(() => {
            setIsLoading(false)
            Alert.alert(common.app_name, alertMessages.k_vehicleUpdatedSuccessfully, [
              { text: "OK", onPress: () => navigation.goBack() },
            ])
          })
          .catch((err) => {
            setIsLoading(false)
            Alert.alert(common.app_name, `${err}`)
          })

        //========== Code for local storage =========
        // console.log("====vehicleId", vehicleId, updateVehicleProperty)
        // objRealm
        //   .updateItemInSchema("vehicle_details", updateVehicleProperty)
        //   .then((res) => {
        //     console.log("==== Updated Vehicle ====", res)
        //     window.fetchVehicleData()
        //     Alert.alert(common.app_name, alertMessages.k_vehicleUpdatedSuccessfully, [
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
        let addVehicleProperty = {
          vehicle_id: `${id}`,
          vehicleNumber: vehicleNumber,
          driverName: driverName,
          vehicleType: vehicleType,
        }

        firestore()
          .collection("vehicle_details")
          .doc(`${id}`)
          .set(addVehicleProperty)
          .then(() => {
            setIsLoading(false)
            Alert.alert(common.app_name, alertMessages.k_vehicleAddedSuccessfully, [
              { text: "OK", onPress: () => navigation.goBack() },
            ])
          })
          .catch((err) => {
            setIsLoading(false)
            Alert.alert(common.app_name, `${err}`)
          })
        //========== Code for local storage =========
        // objRealm
        //   .addPropertyToSchema("vehicle_details", addVehicleProperty)
        //   .then((res) => {
        //     console.log("==== Added Vehicle ====", res)
        //     window.fetchVehicleData()
        //     Alert.alert(common.app_name, alertMessages.k_vehicleAddedSuccessfully, [
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
    if (stateName == "vehicleNumber") {
      setVehicleNumber(Value.toUpperCase())
    } else if (stateName == "driverName") {
      setDriverName(Value)
    }
  }

  const renderRadioButtonOfVehicleType = () => {
    return (
      <View style={vehicleDetailScreen.CONTAINEROF_SERVICE}>
        <TouchableOpacity onPress={() => setVehicleType("crane")}>
          <View style={generateBillScreen.HORIZONTAL_VIEW_FOR_RADIOBUTTON}>
            {vehicleType === "crane" ? (
              <View>
                <View style={generateBillScreen.RADIOBUTTONSTYLE} />
                <View style={generateBillScreen.SELECTEDCIRCLE_DOT_STYLE_FOR_SERVICE} />
              </View>
            ) : (
              <View style={generateBillScreen.RADIOBUTTONSTYLE} />
            )}
            <Text
              tx={"vehicleListScreen.crane"}
              style={generateBillScreen.TXT_SUPPLY_SERVICE_NAME}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVehicleType("eicher")}>
          <View style={generateBillScreen.HORIZONTAL_VIEW_FOR_RADIOBUTTON}>
            {vehicleType === "eicher" ? (
              <View>
                <View style={generateBillScreen.RADIOBUTTONSTYLE} />
                <View style={generateBillScreen.SELECTEDCIRCLE_DOT_STYLE_FOR_SERVICE} />
              </View>
            ) : (
              <View style={generateBillScreen.RADIOBUTTONSTYLE} />
            )}
            <Text
              tx={"vehicleListScreen.eicher"}
              style={generateBillScreen.TXT_SUPPLY_SERVICE_NAME}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const deleteItem = (item: any) => {
    Alert.alert(common.app_name, alertMessages.k_confirmToDeleteVehicle, [
      {
        text: "YES",
        onPress: () => {
          setIsLoading(true)
          let itemId = _.get(item, "vehicle_id", "")

          firestore()
            .collection("vehicle_details")
            .doc(`${itemId}`)
            .delete()
            .then(() => {
              setIsLoading(false)
              Alert.alert(common.app_name, alertMessages.k_vehicleDeleteSuccessfully, [
                { text: "OK", onPress: () => navigation.goBack() },
              ])
            })
            .catch((err) => {
              setIsLoading(false)
              Alert.alert(common.app_name, `${err}`)
            })

          //========== Code for local storage =========
          // console.log("=====", item)
          // objRealm
          //   .deletePropertyToSchema("vehicle_details", _.get(item, "vehicle_id", ""))
          //   .then((res) => {
          //     console.log("==== Delete vehicle ====", res)
          //     window.fetchVehicleData()
          //     Alert.alert(common.app_name, alertMessages.k_vehicleDeleteSuccessfully, [
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
    if (validate.isBlank(vehicleNumber)) {
      errorMessage = alertMessages.k_err_VehicleNumber
    } else if (validate.isBlank(driverName)) {
      errorMessage = alertMessages.k_err_DriveName
    } else if (vehicleType == "") {
      errorMessage = alertMessages.k_err_VehicleType
    } else if (!validate.isValidVehicleNumber(vehicleNumber)) {
      errorMessage = alertMessages.k_err_InvalidVehicleNumber
    } else if (!validate.onlyAlphabets(driverName)) {
      errorMessage = alertMessages.k_err_InvalidDriverName
    }
    return errorMessage
  }

  return (
    <Screen style={vehicleDetailScreen.FULL} preset="fixed">
      {/* Header View */}
      <AppTopNavigationBar
        style={MAINVIEW_NAVIGATIONBAR_STYLE}
        textContainerStyle={CONTAINER_TITLE_TEXT}
        textStyle={serviceDetailScreen.TXT_TITLE_STYLE}
        text="Vehicle Detail"
        isLeftButtonShow={true}
        leftIcon="backButton"
        isRightButtonShow={vehicleData == "" ? false : true}
        rightIcon="delete"
        onRightButtonPress={() => deleteItem(vehicleData)}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <ScrollView style={{ backgroundColor: color.palette.purpple }}>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          {setTextFieldserviceDetails.map((data) => (
            <View key={data.stateName}>
              <Text tx={data.placeholderTx} style={serviceDetailScreen.TXT_LABEL_STYLE} />
              <TextField
                inputStyle={
                  data.stateName == "vehicleNumber"
                    ? [serviceDetailScreen.TXT_INPUT_STYLE_WITH_PENCIL]
                    : serviceDetailScreen.TXT_INPUT_STYLE_WITH_PENCIL
                }
                placeholderTx={data.placeholderTx}
                placeholderTextColor={color.palette.lightGrey}
                style={serviceDetailScreen.CONTAINER_OVERRIDE_STYLE}
                secureTextEntry={false}
                multiline={false}
                currentRef={data.currentRef}
                maxLength={data.setMaxChar}
                isAutoCorrect={false}
                keyboardType={data.keyboardType}
                onChangeText={(value) => setValueToState(data.stateName, value)}
                value={data.originalState}
              />
            </View>
          ))}
        </View>
        {renderRadioButtonOfVehicleType()}
        <AppCommonButton
          isLoading={isLoading}
          style={serviceDetailScreen.SAVRCARD_BUTTON_STYLE}
          textStyle={serviceDetailScreen.TXT_SAVECARD}
          text="ADD VEHICLE"
          onPress={() => btnAddVehicleButtonPressed()}
        />
      </ScrollView>
    </Screen>
  )
})
