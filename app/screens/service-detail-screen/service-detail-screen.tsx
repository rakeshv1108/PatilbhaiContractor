import React, { useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, KeyboardType, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
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
import { serviceDetailScreen } from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { CONTAINER_TITLE_TEXT, MAINVIEW_NAVIGATIONBAR_STYLE } from "../../utils/globalStyles"
import { alertMessages, common } from "../../utils/constants"
import * as objRealm from "../../database/allPartiesDetails"
import { makeid } from "../../utils/commonMethods"
import { useEffect } from "react"
import _ from "lodash"
import * as validate from "../../utils/Validation"
import firestore from "@react-native-firebase/firestore"

export const ServiceDetailScreen = observer(function ServiceDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  const [desOfGoods, setDesOfGoods] = useState("")
  const [hsnCode, sethsnCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const txtDesOfGoods: any = useRef()
  const txtHSNCode: any = useRef()

  const route = useRoute()
  const serviceData = _.get(route, "params.item", "")

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    setDesOfGoods(`${_.get(serviceData, "desOfGoods", "")}`)
    sethsnCode(`${_.get(serviceData, "hsnCode", "")}`)
  }, [route.params])

  const setTextFieldserviceDetails = [
    {
      placeholderTx: "serviceListScreen.desOfGoods",
      keyboardType: "default" as KeyboardType,
      stateName: "desOfGoods",
      originalState: desOfGoods,
      currentRef: txtDesOfGoods,
      setMaxChar: 500,
    },
    {
      placeholderTx: "serviceListScreen.hsnCode",
      keyboardType: "number-pad" as KeyboardType,
      stateName: "hsnCode",
      originalState: hsnCode,
      currentRef: txtHSNCode,
      setMaxChar: 6,
    },
  ]

  const btnAddServiceButtonPressed = () => {
    let errorMessage = isValidOrNot()
    if (errorMessage == "") {
      setIsLoading(true)
      let serviceId = _.get(serviceData, "service_id", "")
      if (serviceId != "") {
        // Update Data
        let updateServiceProperty = {
          service_id: serviceId,
          desOfGoods: desOfGoods,
          hsnCode: hsnCode,
        }

        firestore()
          .collection("service_details")
          .doc(`${serviceId}`)
          .update(updateServiceProperty)
          .then(() => {
            setIsLoading(false)
            Alert.alert(common.app_name, alertMessages.k_serviceUpdatedSuccessfully, [
              { text: "OK", onPress: () => navigation.goBack() },
            ])
          })
          .catch((err) => {
            setIsLoading(false)
            Alert.alert(common.app_name, `${err}`)
          })
        //========== Code for local storage =========
        // objRealm
        //   .updateItemInSchema("service_details", updateServiceProperty)
        //   .then((res) => {
        //     window.fetchServiceData()
        //     Alert.alert(common.app_name, alertMessages.k_serviceUpdatedSuccessfully, [
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
        let addServiceProperty = {
          service_id: `${id}`,
          desOfGoods: desOfGoods,
          hsnCode: hsnCode,
        }

        firestore()
          .collection("service_details")
          .doc(`${id}`)
          .set(addServiceProperty)
          .then(() => {
            setIsLoading(false)
            Alert.alert(common.app_name, alertMessages.k_serviceAddedSuccessfully, [
              { text: "OK", onPress: () => navigation.goBack() },
            ])
          })
          .catch((err) => {
            setIsLoading(false)
            Alert.alert(common.app_name, `${err}`)
          })

        //========== Code for local storage =========
        // objRealm
        //   .addPropertyToSchema("service_details", addServiceProperty)
        //   .then((res) => {
        //     window.fetchServiceData()
        //     Alert.alert(common.app_name, alertMessages.k_serviceAddedSuccessfully, [
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
    if (stateName == "desOfGoods") {
      setDesOfGoods(Value)
    } else if (stateName == "hsnCode") {
      sethsnCode(Value)
    }
  }

  const deleteItem = (item: any) => {
    Alert.alert(common.app_name, alertMessages.k_confirmToDeleteService, [
      {
        text: "YES",
        onPress: () => {
          setIsLoading(true)
          let itemId = _.get(item, "service_id", "")

          firestore()
            .collection("service_details")
            .doc(`${itemId}`)
            .delete()
            .then(() => {
              setIsLoading(false)
              Alert.alert(common.app_name, alertMessages.k_serviceDeleteSuccessfully, [
                { text: "OK", onPress: () => navigation.goBack() },
              ])
            })
            .catch((err) => {
              setIsLoading(false)
              Alert.alert(common.app_name, `${err}`)
            })
          //========== Code for local storage =========
          // objRealm
          //   .deletePropertyToSchema("service_details", _.get(item, "service_id", ""))
          //   .then((res) => {
          //     window.fetchServiceData()
          //     Alert.alert(common.app_name, alertMessages.k_serviceDeleteSuccessfully, [
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
    if (validate.isBlank(desOfGoods)) {
      errorMessage = alertMessages.k_err_DesOfGoods
    } else if (validate.isBlank(hsnCode)) {
      errorMessage = alertMessages.k_err_HsnCode
    } else if (!validate.onlyNumericValue(hsnCode)) {
      errorMessage = alertMessages.k_err_InvalidHSNCode
    }
    return errorMessage
  }

  return (
    <Screen style={serviceDetailScreen.FULL} preset="fixed">
      {/* Header View */}
      <AppTopNavigationBar
        style={MAINVIEW_NAVIGATIONBAR_STYLE}
        textContainerStyle={CONTAINER_TITLE_TEXT}
        textStyle={serviceDetailScreen.TXT_TITLE_STYLE}
        text="Service Detail"
        isLeftButtonShow={true}
        leftIcon="backButton"
        isRightButtonShow={serviceData == "" ? false : true}
        rightIcon="delete"
        onRightButtonPress={() => deleteItem(serviceData)}
        onLeftButtonPress={() => navigation.goBack()}
      />
      <ScrollView style={{ backgroundColor: color.palette.purpple }}>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          {setTextFieldserviceDetails.map((data) => (
            <View key={data.stateName}>
              <Text tx={data.placeholderTx} style={serviceDetailScreen.TXT_LABEL_STYLE} />
              <TextField
                inputStyle={
                  data.stateName == "desOfGoods"
                    ? [serviceDetailScreen.TXT_INPUT_STYLE_WITH_PENCIL, { height: 100 }]
                    : serviceDetailScreen.TXT_INPUT_STYLE_WITH_PENCIL
                }
                placeholderTx={data.placeholderTx}
                placeholderTextColor={color.palette.lightGrey}
                style={serviceDetailScreen.CONTAINER_OVERRIDE_STYLE}
                secureTextEntry={false}
                multiline={data.stateName == "desOfGoods" ? true : false}
                currentRef={data.currentRef}
                maxLength={data.setMaxChar}
                keyboardType={data.keyboardType}
                onChangeText={(value) => setValueToState(data.stateName, value)}
                value={data.originalState}
              />
            </View>
          ))}
        </View>
        <AppCommonButton
          isLoading={isLoading}
          style={serviceDetailScreen.SAVRCARD_BUTTON_STYLE}
          textStyle={serviceDetailScreen.TXT_SAVECARD}
          text="ADD SERVICE"
          onPress={() => btnAddServiceButtonPressed()}
        />
      </ScrollView>
    </Screen>
  )
})
