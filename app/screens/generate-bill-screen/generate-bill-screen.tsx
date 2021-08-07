import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  Keyboard,
  KeyboardType,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
  Image,
} from "react-native"
import { AppTopNavigationBar, Icon, Loader, Screen, Text, TextField } from "../../components"
import { generateBillScreen } from "./styles"
import FileViewer from "react-native-file-viewer"
import RNHTMLtoPDF from "react-native-html-to-pdf"
import { generateHTML } from "./htmlCodeGeneratePDF"
import { AppCommonButton } from "../../components/app_common_button/app_common_button"
import { color, typography } from "../../theme"
import { MAINVIEW_NAVIGATIONBAR_STYLE, CONTAINER_TITLE_TEXT } from "../../utils/globalStyles"
import { useNavigation } from "@react-navigation/native"
import convertor from "rupees-to-words"
import DateTimePicker from "@react-native-community/datetimepicker"
import moment, { duration } from "moment"
import { palette } from "../../theme/palette"
import { daysInMonth, refreshArray, removeItemFilter } from "../../utils/commonMethods"
import RNFetchBlob from "rn-fetch-blob"
import { alertMessages, common, keyNames } from "../../utils/constants"
import Toast from "react-native-simple-toast"
import * as validate from "../../utils/Validation"
import { loadString, saveString } from "../../utils/storage"

export const GenerateBillScreen = observer(function GenerateBillScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  // Pull in navigation via hook

  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(false)
  const [partyName, setpartyName] = useState("")
  const [partyAddress1, setpartyAddress1] = useState("")
  const [partyAddress2, setpartyAddress2] = useState("")
  const [partyGstNumber, setpartyGstNumber] = useState("")
  const [partyState, setpartyState] = useState("")
  const [stateCode, setStateCode] = useState("")
  const [invoiceNumber, setinvoiceNumber] = useState("")
  const [invoiceDate, setinvoiceDate] = useState(`${moment(new Date()).format("DD/MM/YYYY")}`)
  const [supplyOfService, setSupplyOfService] = useState("Ahmedabad") // already written
  const [serviceDes, setServiceDes] = useState("")
  const [hsnCode, setHSNCode] = useState("")
  const [quantity, setQuantity] = useState("-")
  const [rate, setRate] = useState("-")
  const [per, setPer] = useState("-")
  const [basicAmount, setBasicAmount] = useState("")
  const [subTotal, setSubTotal] = useState("")
  const [SGST, setSGST] = useState("-")
  const [CGST, setCGST] = useState("-")
  const [IGST, setIGST] = useState("-")
  const [rupeesInWords, setRupeesInWords] = useState("")
  const [grandTotal, setGrandTotal] = useState("")
  const [selectedGSTType, setSelectedGSTType] = useState("1")
  const [dateOption, setDateOption] = useState("")
  const [currentEditableTextField, setCurrentEditableTextField] = useState("")
  const [show, setShow] = useState(false)

  const [arrPartyNames, setArrPartyNames] = useState([])
  const [fullArrPartyDetails, setFullArrPartyDetails] = useState([])
  const [arrServiceNames, setArrServiceNames] = useState([])
  const [fullArrServiceDetails, setFullArrServiceDetails] = useState([])

  const [arrVehicleNames, setArrVehicleNames] = useState([])
  const [arrCraneNames, setArrCraneNames] = useState([])
  const [arrEicherNames, setArrEicherNames] = useState([])

  const date = new Date()
  const lastDateOfMonth = moment(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      daysInMonth(date.getMonth() + 1, date.getFullYear()),
    ),
  ).format("DD/MM/YYYY")
  const firstDateOfMonth = moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
    "DD/MM/YYYY",
  )

  const [fromDate, setFromDate] = useState(`${firstDateOfMonth}`)
  const [toDate, setToDate] = useState(`${lastDateOfMonth}`)
  const [selectedCalender, setSelectedCalender] = useState("")
  const [arrSelectedCrainNumber, setArrSelectedCrainNumber] = useState([])

  const txtSubTotal: any = useRef()
  const txtSGST: any = useRef()
  const txtCGST: any = useRef()
  const txtIGST: any = useRef()
  const txtgrandTotal: any = useRef()
  const txtrupeesInWords: any = useRef()
  const todayDate = new Date()

  const setTextFieldPartyDetails = [
    {
      placeholderTx: "generateBillScreen.partyName",
      keyboardType: "default" as KeyboardType,
      stateName: "partyName",
      originalState: partyName,
      setMaxChar: 60,
    },
    {
      placeholderTx: "generateBillScreen.address1",
      keyboardType: "default" as KeyboardType,
      stateName: "partyAddress1",
      originalState: partyAddress1,
      setMaxChar: 100,
    },
    {
      placeholderTx: "generateBillScreen.address2",
      keyboardType: "default" as KeyboardType,
      stateName: "partyAddress2",
      originalState: partyAddress2,
      setMaxChar: 100,
    },
    {
      placeholderTx: "generateBillScreen.gstNumber",
      keyboardType: "default" as KeyboardType,
      stateName: "partyGstNumber",
      originalState: partyGstNumber,
      setMaxChar: 15,
    },
    {
      placeholderTx: "generateBillScreen.state",
      keyboardType: "default" as KeyboardType,
      stateName: "partyState",
      originalState: partyState,
      setMaxChar: 20,
    },
    {
      placeholderTx: "generateBillScreen.stateCode",
      keyboardType: "number-pad" as KeyboardType,
      stateName: "stateCode",
      originalState: stateCode,
      setMaxChar: 2,
    },
  ]

  const setTextFieldBillDetails = [
    {
      placeholderTx: "generateBillScreen.invoiceNumber",
      keyboardType: "default" as KeyboardType,
      stateName: "invoiceNumber",
      originalState: invoiceNumber,
    },
    {
      placeholderTx: "generateBillScreen.invoiceDate",
      keyboardType: "default" as KeyboardType,
      stateName: "invoiceDate",
      originalState: invoiceDate,
    },
    {
      placeholderTx: "generateBillScreen.supplyOfService",
      keyboardType: "default" as KeyboardType,
      stateName: "supplyOfService",
      originalState: supplyOfService,
    },
  ]

  const setTextFieldServiceDetails = [
    {
      placeholderTx: "generateBillScreen.serviceDes",
      keyboardType: "default" as KeyboardType,
      stateName: "serviceDes",
      originalState: serviceDes,
    },
    {
      placeholderTx: "generateBillScreen.hsnCode",
      keyboardType: "number-pad" as KeyboardType,
      stateName: "hsnCode",
      originalState: hsnCode,
    },
    {
      placeholderTx: "generateBillScreen.quantity",
      keyboardType: "default" as KeyboardType,
      stateName: "quantity",
      originalState: quantity,
    },

    {
      placeholderTx: "generateBillScreen.rate",
      keyboardType: "numeric" as KeyboardType,
      stateName: "rate",
      originalState: rate,
    },
    {
      placeholderTx: "generateBillScreen.per",
      keyboardType: "default" as KeyboardType,
      stateName: "per",
      originalState: per,
    },
    {
      placeholderTx: "generateBillScreen.basicAmount",
      keyboardType: "numeric" as KeyboardType,
      stateName: "basicAmount",
      originalState: basicAmount,
    },
  ]

  const setTextFieldPriceDetails = [
    {
      placeholderTx: "generateBillScreen.subTotal",
      keyboardType: "default" as KeyboardType,
      stateName: "subTotal",
      originalState: subTotal,
      currentRef: txtSubTotal,
    },
    {
      placeholderTx: "generateBillScreen.SGST",
      keyboardType: "number-pad" as KeyboardType,
      stateName: "SGST",
      originalState: SGST,
      currentRef: txtSGST,
    },
    {
      placeholderTx: "generateBillScreen.CGST",
      keyboardType: "default" as KeyboardType,
      stateName: "CGST",
      originalState: CGST,
      currentRef: txtCGST,
    },
    {
      placeholderTx: "generateBillScreen.IGST",
      keyboardType: "default" as KeyboardType,
      stateName: "IGST",
      originalState: IGST,
      currentRef: txtIGST,
    },
    {
      placeholderTx: "generateBillScreen.grandTotal",
      keyboardType: "numeric" as KeyboardType,
      stateName: "grandTotal",
      originalState: grandTotal,
      currentRef: txtgrandTotal,
    },
    {
      placeholderTx: "generateBillScreen.rupeesInWords",
      keyboardType: "default" as KeyboardType,
      stateName: "rupeesInWords",
      originalState: rupeesInWords,
      currentRef: txtrupeesInWords,
    },
  ]

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
    } else if (validate.isBlank(invoiceNumber)) {
      errorMessage = alertMessages.k_err_InvoiceNumber
    } else if (validate.isBlank(serviceDes)) {
      errorMessage = alertMessages.k_err_DesOfGoods
    } else if (validate.isBlank(hsnCode)) {
      errorMessage = alertMessages.k_err_HsnCode
    } else if (validate.isBlank(basicAmount)) {
      errorMessage = alertMessages.k_err_BasicAmount
    } else if (validate.isBlank(subTotal)) {
      errorMessage = alertMessages.k_err_SubTotal
    } else if (validate.isBlank(grandTotal)) {
      errorMessage = alertMessages.k_err_GrandTotal
    } else if (validate.isBlank(rupeesInWords)) {
      errorMessage = alertMessages.k_err_rupeesInWords
    } else if (
      selectedGSTType == "1"
        ? validate.isBlank(SGST) && validate.isBlank(CGST)
        : validate.isBlank(IGST)
    ) {
      errorMessage =
        selectedGSTType == "1" ? alertMessages.k_err_S_AND_C_GST : alertMessages.k_err_IGST
    } else if (!validate.onlyAlphabets(partyName)) {
      errorMessage = alertMessages.k_err_onlyAlphabetsInPartyName
    } else if (!validate.isValidGSTLength(partyGstNumber)) {
      errorMessage = alertMessages.k_err_notValidLengthOfGSTNumber
    } else if (!validate.isValidGSTNumber(partyGstNumber)) {
      errorMessage = alertMessages.k_err_InvalidGSTNumber
    } else if (!validate.onlyNumericValue(hsnCode)) {
      errorMessage = alertMessages.k_err_InvalidHSNCode
    }
    return errorMessage
  }

  const generatePDF = async () => {
    let errorMessage = isValidOrNot()
    if (errorMessage == "") {
      setIsLoading(true)
      let tempArrGstNumber = Array.from(partyGstNumber)

      let Date = ""
      let vehicleNumber = ""
      if (dateOption == "currentDate") {
        Date = `<br /> Dt. ${moment(date).format("DD/MM/YYYY")} `
      } else if (dateOption == "otherDate") {
        Date = `<br /> Dt. ${fromDate} to ${toDate}`
      }

      if (arrSelectedCrainNumber.length > 0) {
        vehicleNumber =
          arrVehicleNames[0].vehicleType == "crane"
            ? "<br /> Crane No. <br />"
            : "<br /> Vehicle No. <br />"
        arrVehicleNames.map((data) => {
          if (arrSelectedCrainNumber.includes(data.vehicle_id)) {
            if (
              vehicleNumber == "<br /> Crane No. <br />" ||
              vehicleNumber == "<br /> Vehicle No. <br />"
            ) {
              vehicleNumber = vehicleNumber + data.vehicleNumber
            } else {
              vehicleNumber = vehicleNumber + "<br/>" + data.vehicleNumber
            }
          }
        })
      }

      let currentMonth = invoiceDate.split("/")
      let currentYear =
        parseInt(currentMonth[1]) <= 3
          ? `${parseInt(currentMonth[2]) - 1}`
          : `${parseInt(currentMonth[2])}`
      let nextYear =
        parseInt(currentMonth[1]) <= 3
          ? `${parseInt(currentMonth[2])}`
          : `${parseInt(currentMonth[2]) + 1}`
      currentYear = currentYear.slice(2, 4)
      nextYear = nextYear.slice(2, 4)

      const { fs } = RNFetchBlob
      let PictureDir = fs.dirs.PictureDir
      let craneImagePath = "file://" + PictureDir + "/" + "crane_image.png"
      let logoImagePath = "file://" + PictureDir + "/" + "pc_logo.png"
      let isExists = await fs.exists(craneImagePath)
      let isLogoExists = await fs.exists(logoImagePath)
      if (!isExists || !isLogoExists) {
        Alert.alert(common.app_name, alertMessages.k_pleaseRestartYourApp, [
          {
            text: "OK",
            onPress: () => BackHandler.exitApp(),
          },
        ])
      } else {
        let billDetails = {
          partyName: partyName,
          partyAddress1: partyAddress1,
          partyAddress2: partyAddress2,
          state: partyState,
          stateCode: stateCode,
          partyGstNumber: tempArrGstNumber,
          servicePalace: supplyOfService,
          invoiceNumber: `GST/T/${invoiceNumber}/${currentYear}/${nextYear}`,
          invoiceDate: invoiceDate,
          rupeesInWords: rupeesInWords,
          totalAmount: `${subTotal}/=`,
          SGSTAmount: SGST == "0" ? "0" : `${SGST}/=`,
          CGSTAmount: CGST == "0" ? "0" : `${CGST}/=`,
          IGSTAmount: IGST == "0" ? "0" : `${IGST}/=`,
          grandTotalAmount: `${grandTotal}/=`,
          desOfGoods: `${serviceDes} <br/> ${Date} <br/> ${vehicleNumber}`,
          HSNCode: hsnCode, // max length 6
          quantity: quantity, // max length 10
          rateInRs: rate, // max length 5
          rateInPs: "-",
          per: per, // max length 4
          basicAmountInRs: `${basicAmount}`,
          basicAmountInPs: "-",
          crainImage: craneImagePath,
          pcLogo: logoImagePath,
          greyHoundFontPath: typography.greyHoundBold,
        }

        let html = generateHTML(billDetails)
        const options = {
          html,
          fileName: `${invoiceNumber}`,
          directory: "Documents",
          // fonts: [Image.resolveAssetSource(require('../../../assets/fonts/greyhoundbold.ttf')).uri],
        }

        setTimeout(async () => {
          const file = await RNHTMLtoPDF.convert(options)
          Toast.show(`Bill Created Successfully. Path - ${file.filePath}`, 10)
          setIsLoading(false)
          FileViewer.open(file.filePath).catch((error) => console.log("=====Error", error))
          await saveString(keyNames.billNumber, invoiceNumber)
        }, 500)
      }
    } else {
      Alert.alert(common.app_name, errorMessage)
    }
  }

  useEffect(() => {
    navigation.addListener("focus", async () => {
      let billNumber: any = (await loadString(keyNames.billNumber)) || "0"
      billNumber = parseInt(billNumber)
      setinvoiceNumber(`${billNumber + 1}`)
      Keyboard.addListener("keyboardWillHide", () => {
        setCurrentEditableTextField("") // or some other action
      })
    })
  }, [])

  useEffect(() => {
    fetchDetailsFromDatabase()
  }, [])

  const fetchDetailsFromDatabase = () => {
    let realm = new Realm({ path: "UserDatabase.realm" })
    var party_details = realm.objects("party_details")
    var service_details = realm.objects("service_details")
    var vehicle_details = realm.objects("vehicle_details")
    let tempArrParty = []
    let tempArrService = []
    let tempArrVehicle = []

    if (party_details.length > 0) {
      for (let index = 0; index < party_details.length; index++) {
        const element: any = party_details[index]
        // console.log("====== Temp Array", element.party_name)
        tempArrParty.push(element)
      }
    } else {
      // console.log("====== Blank Array of Party ======")
    }
    setArrPartyNames([...tempArrParty])
    setFullArrPartyDetails([...tempArrParty])

    if (service_details.length > 0) {
      for (let index = 0; index < service_details.length; index++) {
        const element: any = service_details[index]
        // console.log("====== Temp Array", element.party_name)
        tempArrService.push(element)
      }
    } else {
      // console.log("====== Blank Array of Service ======")
    }
    setArrServiceNames([...tempArrService])
    setFullArrServiceDetails([...tempArrService])

    if (vehicle_details.length > 0) {
      let tempArrCrane = []
      let tempArrEicher = []
      for (let index = 0; index < vehicle_details.length; index++) {
        const element: any = vehicle_details[index]
        tempArrVehicle.push(element)
        if (element.vehicleType == "crane") {
          tempArrCrane.push(element)
        } else {
          tempArrEicher.push(element)
        }
      }
      setArrCraneNames(tempArrCrane)
      setArrEicherNames(tempArrEicher)
    } else {
      // console.log("====== Blank Array of Vehicle ======")
    }
    setArrVehicleNames([...tempArrVehicle])
  }

  const searchParty = (value) => {
    let tempArr = []
    setArrPartyNames(tempArr)
    if (value == "") {
      setArrPartyNames(fullArrPartyDetails)
    } else {
      let tempArr = []
      fullArrPartyDetails
        .filter((item) => item.party_name.toLowerCase().includes(value.toLowerCase()))
        .map((resultItem) => tempArr.push(resultItem))
      if (tempArr.length > 0) {
        setArrPartyNames([{ party_name: "Select party name.." }, ...tempArr])
      } else {
        setArrPartyNames([])
      }
    }
  }

  const searchService = (value) => {
    let tempArr = []
    setArrServiceNames(tempArr)
    if (value == "") {
      setArrServiceNames(fullArrServiceDetails)
    } else {
      let tempArr = []
      fullArrServiceDetails
        .filter((item) => item.desOfGoods.toLowerCase().includes(value.toLowerCase()))
        .map((resultItem) => tempArr.push(resultItem))
      if (tempArr.length > 0) {
        setArrServiceNames([{ desOfGoods: "Select Description of Goods.." }, ...tempArr])
      } else {
        setArrServiceNames([])
      }
    }
  }

  const setValueToState = (stateName: any, Value: string) => {
    setCurrentEditableTextField(stateName)
    if (stateName == "partyName") {
      setpartyName(Value)
      searchParty(Value)
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
    } else if (stateName == "invoiceNumber") {
      setinvoiceNumber(Value)
    } else if (stateName == "invoiceDate") {
      setinvoiceDate(Value)
    } else if (stateName == "supplyOfService") {
      setSupplyOfService(Value)
    } else if (stateName == "serviceDes") {
      searchService(Value)
      setServiceDes(Value)
    } else if (stateName == "hsnCode") {
      setHSNCode(Value)
      let grandtotalPrice = ""
      if (selectedGSTType == "1") {    
        if (hsnCode == "997329") {
          setIGST("0")
          basicAmount != "" ? setSGST(`${Math.floor((parseInt(basicAmount) * 2.5) / 100)}`) : null
          basicAmount != "" ? setCGST(`${Math.floor((parseInt(basicAmount) * 2.5) / 100)}`) : null
          grandtotalPrice = `${Math.floor(parseInt(basicAmount) + parseInt(`${Math.floor((parseInt(basicAmount) * 5) / 100)}`))}`
          setGrandTotal(grandtotalPrice)
          var rupeeinword = convertor(grandtotalPrice)
          setRupeesInWords(rupeesInWords)
        } else if (hsnCode == "997319" || hsnCode == "998732") {
          setIGST("0")
          basicAmount != "" ? setSGST(`${Math.floor((parseInt(basicAmount) * 9) / 100)}`) : null
          basicAmount != "" ? setCGST(`${Math.floor((parseInt(basicAmount) * 9) / 100)}`) : null
          grandtotalPrice = `${Math.floor(parseInt(basicAmount) + parseInt(`${Math.floor((parseInt(basicAmount) * 18) / 100)}`))}`
          setGrandTotal(grandtotalPrice)
          var rupeeinword = convertor(grandtotalPrice)
          setRupeesInWords(rupeesInWords)
        }
      } else if (selectedGSTType == "2") { 
        if (hsnCode == "997329") {
          setSGST("0")
          setCGST("0")
          basicAmount != "" ? setIGST(`${Math.floor((parseInt(basicAmount) * 5) / 100)}`) : null
          grandtotalPrice = `${Math.floor(parseInt(basicAmount) + parseInt(`${Math.floor((parseInt(basicAmount) * 5) / 100)}`))}`
          setGrandTotal(grandtotalPrice)
          var rupeeinword = convertor(grandtotalPrice)
          setRupeesInWords(rupeesInWords)
        } else if (hsnCode == "997319" || hsnCode == "998732"){
          setSGST("0")
          setCGST("0")
          basicAmount != "" ? setIGST(`${Math.floor((parseInt(basicAmount) * 18) / 100)}`) : null 
          grandtotalPrice = `${Math.floor(parseInt(basicAmount) + parseInt(`${Math.floor((parseInt(basicAmount) * 18) / 100)}`))}`
          setGrandTotal(grandtotalPrice)    
          var rupeeinword = convertor(grandtotalPrice)
          setRupeesInWords(rupeesInWords)
        }
      }
    } else if (stateName == "quantity") {
      setQuantity(Value)
    } else if (stateName == "rate") {
      setRate(Value)
    } else if (stateName == "per") {
      setPer(Value)
    } else if (stateName == "basicAmount") {
      setBasicAmount(Value)
      setSubTotal(Value)
      let ninePersentAmount =
        hsnCode == "997329"
          ? `${Math.floor((parseInt(Value) * 2.5) / 100)}`
          : `${Math.floor((parseInt(Value) * 9) / 100)}`
      let eighteenPersentAmount =
        hsnCode == "997329"
          ? `${Math.floor((parseInt(Value) * 5) / 100)}`
          : `${Math.floor((parseInt(Value) * 18) / 100)}`
      let grandtotalPrice = `${Math.floor(parseInt(Value) + parseInt(eighteenPersentAmount))}`
      if (selectedGSTType == "1") {
        basicAmount != "" ? setSGST(ninePersentAmount) : null
        basicAmount != "" ? setCGST(ninePersentAmount) : null
        basicAmount != "" ? setGrandTotal(grandtotalPrice) : null
        var rupeeinword = convertor(grandtotalPrice)
        setRupeesInWords(rupeeinword)
        setIGST("0")
      } else if (selectedGSTType == "2") {
        setSGST("0")
        setCGST("0")
        basicAmount != "" ? setIGST(eighteenPersentAmount) : null
        basicAmount != "" ? setGrandTotal(grandtotalPrice) : null
        var rupeeinword = convertor(grandtotalPrice)
        setRupeesInWords(rupeeinword)
      }
    } else if (stateName == "subTotal") {
      setSubTotal(Value)
    } else if (stateName == "SGST") {
      setSGST(Value)
    } else if (stateName == "CGST") {
      setCGST(Value)
    } else if (stateName == "IGST") {
      setIGST(Value)
    } else if (stateName == "grandTotal") {
      setGrandTotal(Value)
    } else if (stateName == "rupeesInWords") {
      setRupeesInWords(Value)
    }
  }

  const focusField = (txtField: any) => {
    if (txtField == txtIGST || txtField == txtSGST || txtField == txtCGST) {
      if (selectedGSTType == "2" && txtField == txtIGST) {
        setTimeout(function () {
          txtField.current.focus()
        }, 100)
      } else if (selectedGSTType == "1" && (txtField == txtSGST || txtField == txtCGST)) {
        setTimeout(function () {
          txtField.current.focus()
        }, 100)
      }
    } else {
      setTimeout(function () {
        txtField.current.focus()
      }, 100)
    }
  }

  const btnEditTextField = (textFieldName) => {
    setTextFieldPriceDetails
      .filter((item) => item.stateName == textFieldName)
      .map((resultItem) => focusField(resultItem.currentRef))
    setCurrentEditableTextField(textFieldName)
  }

  const selectGSTTYPEByUser = (gstType) => {
    setSelectedGSTType(gstType)
    if (gstType == "1") {
      setIGST("0")
      if (hsnCode == "997329") {
        basicAmount != "" ? setSGST(`${Math.floor((parseInt(basicAmount) * 2.5) / 100)}`) : null
        basicAmount != "" ? setCGST(`${Math.floor((parseInt(basicAmount) * 2.5) / 100)}`) : null
      } else {
        basicAmount != "" ? setSGST(`${Math.floor((parseInt(basicAmount) * 9) / 100)}`) : null
        basicAmount != "" ? setCGST(`${Math.floor((parseInt(basicAmount) * 9) / 100)}`) : null
      }
    } else if (gstType == "2") {
      setSGST("0")
      setCGST("0")
      if (hsnCode == "997329") {
        basicAmount != "" ? setIGST(`${Math.floor((parseInt(basicAmount) * 5) / 100)}`) : null
      } else {
        basicAmount != "" ? setIGST(`${Math.floor((parseInt(basicAmount) * 18) / 100)}`) : null
      }
    }
  }

  const showMode = (value: string) => {
    setSelectedCalender(value)
    setShow(true)
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || todayDate
    let date = moment(currentDate).format("DD/MM/YYYY")
    setShow(false)
    if (selectedCalender == "fromDate") {
      setFromDate(date)
    } else if (selectedCalender == "toDate") {
      setToDate(date)
    } else {
      setinvoiceDate(date)
    }
  }

  const cellViewOfPartyNames = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setpartyName(item.party_name == "Select party name.." ? "" : item.party_name)
          setpartyAddress1(item.party_address1 || "")
          setpartyAddress2(item.party_address2 || "")
          setpartyGstNumber(item.party_GSTNumber || "")
          setStateCode(item.party_StateCode || "")
          setpartyState(item.party_State || "")
          setArrPartyNames([])
        }}
      >
        <View style={generateBillScreen.CELL_CONTAINER}>
          <Text
            text={`${item.party_name}`}
            style={
              item.party_name == "Select party name.."
                ? [generateBillScreen.TXT_PARTY_NAME, { color: palette.darkGreyAndroid }]
                : generateBillScreen.TXT_PARTY_NAME
            }
          />
        </View>
      </TouchableOpacity>
    )
  }

  const cellViewOfServiceNames = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setServiceDes(item.desOfGoods == "Select Description of Goods.." ? "" : item.desOfGoods)
          setHSNCode(item.hsnCode || "")
          setArrServiceNames([])
        }}
      >
        <View style={generateBillScreen.CELL_CONTAINER}>
          <Text
            text={`${item.desOfGoods}`}
            style={
              item.desOfGoods == "Select Description of Goods.."
                ? [generateBillScreen.TXT_PARTY_NAME, { color: palette.darkGreyAndroid }]
                : generateBillScreen.TXT_PARTY_NAME
            }
          />
        </View>
      </TouchableOpacity>
    )
  }

  const renderRadioButtonOfSupplyServices = () => {
    return (
      <View style={generateBillScreen.CONTAINEROF_SERVICE}>
        <TouchableOpacity onPress={() => setSupplyOfService("Ahmedabad")}>
          <View style={generateBillScreen.HORIZONTAL_VIEW_FOR_RADIOBUTTON}>
            {supplyOfService === "Ahmedabad" ? (
              <View>
                <View style={generateBillScreen.RADIOBUTTONSTYLE} />
                <View style={generateBillScreen.SELECTEDCIRCLE_DOT_STYLE_FOR_SERVICE} />
              </View>
            ) : (
              <View style={generateBillScreen.RADIOBUTTONSTYLE} />
            )}
            <Text
              tx={"generateBillScreen.ahmedabad"}
              style={generateBillScreen.TXT_SUPPLY_SERVICE_NAME}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSupplyOfService("")}>
          <View style={generateBillScreen.HORIZONTAL_VIEW_FOR_RADIOBUTTON}>
            {supplyOfService !== "Ahmedabad" ? (
              <View>
                <View style={generateBillScreen.RADIOBUTTONSTYLE} />
                <View style={generateBillScreen.SELECTEDCIRCLE_DOT_STYLE_FOR_SERVICE} />
              </View>
            ) : (
              <View style={generateBillScreen.RADIOBUTTONSTYLE} />
            )}
            <Text
              tx={"generateBillScreen.other"}
              style={generateBillScreen.TXT_SUPPLY_SERVICE_NAME}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const renderDateOfService = () => {
    return (
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Text tx={"generateBillScreen.date"} style={generateBillScreen.TXT_DATEOF_SERVICE} />
        {renderDateOption()}
        {dateOption == "otherDate" ? renderOtherDateView() : null}
      </View>
    )
  }

  const renderOtherDateView = () => {
    return (
      <View style={generateBillScreen.CONTAINER_OTHER_DATE}>
        <View style={generateBillScreen.FROM_DATE_VIEW}>
          <Text tx={"generateBillScreen.fromDate"} style={generateBillScreen.TXT_DATEOF_LABEL} />
          <TouchableOpacity
            style={generateBillScreen.FROM_DATE_VIEW_TOUCHABLE}
            onPress={() => showMode("fromDate")}
          >
            <Text
              text={`${fromDate}`}
              style={[generateBillScreen.TXT_DATEOF_LABEL, { color: color.palette.black }]}
            />
          </TouchableOpacity>
        </View>

        <View style={generateBillScreen.TO_DATE_VIEW}>
          <Text tx={"generateBillScreen.toDate"} style={generateBillScreen.TXT_DATEOF_LABEL} />
          <TouchableOpacity
            style={generateBillScreen.FROM_DATE_VIEW_TOUCHABLE}
            onPress={() => showMode("toDate")}
          >
            <Text
              text={`${toDate}`}
              style={[generateBillScreen.TXT_DATEOF_LABEL, { color: color.palette.black }]}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderDateOption = () => {
    return (
      <View style={generateBillScreen.CONTAINEROF_DATE}>
        <TouchableOpacity onPress={() => setDateOption("currentDate")}>
          <View style={generateBillScreen.HORIZONTAL_VIEW_FOR_RADIOBUTTON}>
            {dateOption === "currentDate" ? (
              <View>
                <View style={generateBillScreen.RADIOBUTTONSTYLE} />
                <View style={generateBillScreen.SELECTEDCIRCLE_DOT_STYLE_FOR_SERVICE} />
              </View>
            ) : (
              <View style={generateBillScreen.RADIOBUTTONSTYLE} />
            )}
            <Text
              tx={"generateBillScreen.currentDate"}
              style={generateBillScreen.TXT_SUPPLY_SERVICE_NAME}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDateOption("otherDate")}>
          <View style={generateBillScreen.HORIZONTAL_VIEW_FOR_RADIOBUTTON}>
            {dateOption === "otherDate" ? (
              <View>
                <View style={generateBillScreen.RADIOBUTTONSTYLE} />
                <View style={generateBillScreen.SELECTEDCIRCLE_DOT_STYLE_FOR_SERVICE} />
              </View>
            ) : (
              <View style={generateBillScreen.RADIOBUTTONSTYLE} />
            )}
            <Text
              tx={"generateBillScreen.otherDate"}
              style={generateBillScreen.TXT_SUPPLY_SERVICE_NAME}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDateOption("noNeedOfDate")}>
          <View style={generateBillScreen.HORIZONTAL_VIEW_FOR_RADIOBUTTON}>
            {dateOption === "noNeedOfDate" ? (
              <View>
                <View style={generateBillScreen.RADIOBUTTONSTYLE} />
                <View style={generateBillScreen.SELECTEDCIRCLE_DOT_STYLE_FOR_SERVICE} />
              </View>
            ) : (
              <View style={generateBillScreen.RADIOBUTTONSTYLE} />
            )}
            <Text
              tx={"generateBillScreen.noNeedOfDate"}
              numberOfLines={2}
              style={[generateBillScreen.TXT_SUPPLY_SERVICE_NAME, { width: 70 }]}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const btnCheckBoxClicked = (value: any) => {
    if (arrSelectedCrainNumber.length > 0) {
      if (arrSelectedCrainNumber.includes(value)) {
        let resultArray = removeItemFilter(arrSelectedCrainNumber, value)
        setArrSelectedCrainNumber(refreshArray(resultArray))
      } else {
        setArrSelectedCrainNumber([value, ...arrSelectedCrainNumber])
      }
    } else {
      setArrSelectedCrainNumber([value])
    }
  }

  const renderCrainAndGadiNumber = (item: any) => {
    return (
      <View style={generateBillScreen.CONTAINER_CRAINE_DETAILS}>
        <TouchableOpacity
          style={generateBillScreen.BTN_CHECKBOX_STYLE}
          onPress={() => btnCheckBoxClicked(item.vehicle_id)}
        >
          {arrSelectedCrainNumber.length > 0 && arrSelectedCrainNumber.includes(item.vehicle_id) ? (
            <View style={generateBillScreen.SELECTEDCHECKBOX}>
              <Icon style={generateBillScreen.RIGHTSIGNBUTTON_STYLE} icon="rightSign" />
            </View>
          ) : (
            <View style={generateBillScreen.UNSELECTEDCHECKBOX} />
          )}
        </TouchableOpacity>
        <Text text={item.vehicleNumber} style={generateBillScreen.TXT_CRAIN_GADI_NUMBER} />
      </View>
    )
  }

  return (
    <Screen style={generateBillScreen.FULL} preset="fixed">
      <AppTopNavigationBar
        style={MAINVIEW_NAVIGATIONBAR_STYLE}
        textContainerStyle={CONTAINER_TITLE_TEXT}
        textStyle={generateBillScreen.TXT_TITLE_STYLE}
        text="Patilbhai Contractor"
        isLeftButtonShow={true}
        leftIcon="backButton"
        onLeftButtonPress={() => navigation.goBack()}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          style={{ backgroundColor: color.palette.purpple }}
          scrollEnabled={arrPartyNames.length > 0 && partyName.length > 0 ? true : true}
        >
          <>
            <View style={generateBillScreen.containerOfTextFields}>
              <Text text="Party Details" style={generateBillScreen.sectionViewStyle} />
              {setTextFieldPartyDetails.map((data) => (
                <View key={data.stateName}>
                  <Text tx={data.placeholderTx} style={generateBillScreen.TXT_LABEL_STYLE} />
                  <TextField
                    inputStyle={generateBillScreen.TXT_INPUT_STYLE}
                    placeholderTx={data.placeholderTx}
                    placeholderTextColor={color.palette.lightGrey}
                    style={generateBillScreen.CONTAINER_OVERRIDE_STYLE}
                    secureTextEntry={false}
                    keyboardType={data.keyboardType}
                    maxLength={data.setMaxChar}
                    onChangeText={(value) => setValueToState(data.stateName, value)}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    value={data.originalState}
                  />
                  <View style={generateBillScreen.CONTAINER_PARTYLIST}>
                    {data.stateName == "partyName" &&
                    arrPartyNames.length > 0 &&
                    partyName.length > 0 ? (
                      <FlatList
                        data={arrPartyNames}
                        style={generateBillScreen.FLATLIST_STYLE}
                        renderItem={({ item, index }) => cellViewOfPartyNames(item, index)}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                      />
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
            <View style={generateBillScreen.containerOfTextFields}>
              <Text text="Bill Details" style={generateBillScreen.sectionViewStyle} />
              {setTextFieldBillDetails.map((data) => (
                <View key={data.stateName}>
                  <Text tx={data.placeholderTx} style={generateBillScreen.TXT_LABEL_STYLE} />
                  {data.stateName == "invoiceDate" ? (
                    <>
                      <TouchableOpacity
                        style={generateBillScreen.DATE_OF_INVOICE_STYLE}
                        onPress={() => showMode("invoiceDate")}
                      >
                        <Text text={`${invoiceDate}`} style={generateBillScreen.TXT_DATE_INVOICE} />
                      </TouchableOpacity>
                    </>
                  ) : data.stateName == "supplyOfService" ? (
                    <>
                      {renderRadioButtonOfSupplyServices()}
                      {supplyOfService !== "Ahmedabad" ? (
                        <TextField
                          inputStyle={generateBillScreen.TXT_INPUT_STYLE}
                          placeholderTx={data.placeholderTx}
                          placeholderTextColor={color.palette.lightGrey}
                          style={generateBillScreen.CONTAINER_OVERRIDE_STYLE}
                          secureTextEntry={false}
                          keyboardType={data.keyboardType}
                          onChangeText={(value) => setValueToState(data.stateName, value)}
                          onSubmitEditing={() => Keyboard.dismiss()}
                          value={data.originalState}
                        />
                      ) : null}
                    </>
                  ) : (
                    <TextField
                      inputStyle={generateBillScreen.TXT_INPUT_STYLE}
                      placeholderTx={data.placeholderTx}
                      placeholderTextColor={color.palette.lightGrey}
                      style={generateBillScreen.CONTAINER_OVERRIDE_STYLE}
                      secureTextEntry={false}
                      keyboardType={data.keyboardType}
                      onChangeText={(value) => setValueToState(data.stateName, value)}
                      onSubmitEditing={() => Keyboard.dismiss()}
                      value={data.originalState}
                    />
                  )}
                </View>
              ))}
            </View>
            <View style={generateBillScreen.containerOfTextFields}>
              <Text text="Service Details" style={generateBillScreen.sectionViewStyle} />
              {setTextFieldServiceDetails.map((data) => (
                <View key={data.stateName}>
                  <Text tx={data.placeholderTx} style={generateBillScreen.TXT_LABEL_STYLE} />
                  <TextField
                    inputStyle={
                      data.stateName != "serviceDes"
                        ? generateBillScreen.TXT_INPUT_STYLE
                        : [
                            generateBillScreen.TXT_INPUT_STYLE,
                            { textAlignVertical: "top", height: 100 },
                          ]
                    }
                    placeholderTx={data.placeholderTx}
                    placeholderTextColor={color.palette.lightGrey}
                    style={generateBillScreen.CONTAINER_OVERRIDE_STYLE}
                    secureTextEntry={false}
                    multiline={data.stateName != "serviceDes" ? false : true}
                    keyboardType={data.keyboardType}
                    onChangeText={(value) => setValueToState(data.stateName, value)}
                    onSubmitEditing={() =>
                      data.stateName != "serviceDes" ? Keyboard.dismiss() : null
                    }
                    value={data.originalState}
                  />
                  <View style={generateBillScreen.CONTAINER_PARTYLIST}>
                    {data.stateName == "serviceDes" &&
                    arrServiceNames.length > 0 &&
                    serviceDes.length > 0 ? (
                      <FlatList
                        data={arrServiceNames}
                        style={generateBillScreen.FLATLIST_STYLE}
                        renderItem={({ item, index }) => cellViewOfServiceNames(item, index)}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                      />
                    ) : null}
                  </View>
                  {data.stateName == "serviceDes" && renderDateOfService()}
                  {data.stateName == "hsnCode" && (
                    <>
                      <View style={{ marginTop: 10 }}>
                        {arrCraneNames.length > 0 && hsnCode == "997319" && (
                          <>
                            <Text
                              style={generateBillScreen.TXT_CRANE_NUMBER}
                              text={"Crane Number"}
                            />
                            <FlatList
                              data={arrCraneNames}
                              nestedScrollEnabled={false}
                              numColumns={2}
                              style={generateBillScreen.FLATLIST_STYLE_VEHICLE}
                              renderItem={({ item, index }) => renderCrainAndGadiNumber(item)}
                              keyExtractor={(item) => item.id}
                              scrollEnabled={true}
                              showsVerticalScrollIndicator={true}
                            />
                          </>
                        )}
                      </View>

                      <View style={{ marginBottom: 10 }}>
                        {arrEicherNames.length > 0 && hsnCode == "997329" && (
                          <>
                            <Text
                              style={generateBillScreen.TXT_CRANE_NUMBER}
                              text={"Vehicle Number"}
                            />
                            <FlatList
                              data={arrEicherNames}
                              nestedScrollEnabled={false}
                              numColumns={2}
                              style={generateBillScreen.FLATLIST_STYLE_VEHICLE}
                              renderItem={({ item, index }) => renderCrainAndGadiNumber(item)}
                              keyExtractor={(item) => item.id}
                              scrollEnabled={true}
                              showsVerticalScrollIndicator={true}
                            />
                          </>
                        )}
                      </View>
                    </>
                  )}
                </View>
              ))}
            </View>
            <View style={generateBillScreen.containerOfTextFields}>
              <Text text="Price Details" style={generateBillScreen.sectionViewStyle} />
              <Text text="GST TYPE" style={generateBillScreen.GSTTYPESTYLE} />
              <View style={generateBillScreen.SUBCONTAINEROFGSTTYPE}>
                <TouchableOpacity
                  style={generateBillScreen.BTNSGSTSTYLE}
                  onPress={() => selectGSTTYPEByUser("1")}
                >
                  <View style={generateBillScreen.RADIOBUTTONSTYLE}>
                    {selectedGSTType == "1" ? (
                      <View style={generateBillScreen.SELECTEDCIRCLE_DOT_STYLE} />
                    ) : null}
                  </View>
                  <Text
                    text={
                      hsnCode == "997329" ? "SGST,CGST ( 2.5%, 2.5% )" : "SGST,CGST ( 9 %, 9 % )"
                    }
                    style={{ color: color.palette.white }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={generateBillScreen.BTNSGSTSTYLE}
                  onPress={() => selectGSTTYPEByUser("2")}
                >
                  <View style={generateBillScreen.RADIOBUTTONSTYLE}>
                    {selectedGSTType == "2" ? (
                      <View style={generateBillScreen.SELECTEDCIRCLE_DOT_STYLE} />
                    ) : null}
                  </View>
                  <Text
                    text={hsnCode == "997329" ? "IGST ( 5 %)" : "IGST ( 18 %)"}
                    style={{ color: color.palette.white }}
                  />
                </TouchableOpacity>
              </View>
              {setTextFieldPriceDetails.map((data) => (
                <View key={data.stateName}>
                  <Text tx={data.placeholderTx} style={generateBillScreen.TXT_LABEL_STYLE} />
                  <View style={generateBillScreen.HORIZONTALVIEW}>
                    <TextField
                      inputStyle={generateBillScreen.TXT_INPUT_STYLE_WITH_PENCIL}
                      placeholderTx={data.placeholderTx}
                      placeholderTextColor={color.palette.lightGrey}
                      style={generateBillScreen.CONTAINER_OVERRIDE_STYLE}
                      secureTextEntry={false}
                      keyboardType={data.keyboardType}
                      onChangeText={(value) => setValueToState(data.stateName, value)}
                      onSubmitEditing={() => Keyboard.dismiss()}
                      currentRef={data.currentRef}
                      value={data.originalState}
                      isEditable={currentEditableTextField === data.stateName ? true : false}
                    />
                    {data.stateName !== "email" && (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => btnEditTextField(data.stateName)}
                        style={generateBillScreen.BTNEDITTEXTFIELD}
                      >
                        <Icon style={generateBillScreen.EDIT_ICON_STYLE} icon="editPencil" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
            <AppCommonButton
              isLoading={isLoading}
              style={generateBillScreen.SAVRCARD_BUTTON_STYLE}
              textStyle={generateBillScreen.TXT_SAVECARD}
              text="GENERATE BILL"
              onPress={() => generatePDF()}
            />
          </>
        </ScrollView>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={todayDate}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={(event, date) => onChange(event, date)}
        />
      )}
    </Screen>
  )
})
