/**
 * ===================================== Navigation Screen Names Constants ================================
 */
export const screenNames = {
  k_homeScreen: "homeScreen",
  k_generateBillScreen: "generateBillScreen",
  k_partyListScreen: "partyListScreen",
  k_partyDetailScreen: "partyDetailScreen",
  k_serviceListScreen: "serviceListScreen",
  k_serviceDetailScreen: "serviceDetailScreen",
  k_vehicleListScreen: "vehicleListScreen",
  k_vehicleDetailScreen: "vehicleDetailScreen",
}

/**
 * ============================================== Common Constants =============================================
 */
export const common = {
  app_name: "Patilbhai Contractor",
  k_comingSoon: "Coming soon",
}

/**
 * ============================================== Async Storage Key Names =====================================
 */
 export const keyNames = {
  billNumber: 'billNumber',
}

/**
* ============================================= Alert Messages Constants =======================================
*/
export const alertMessages = {
  k_partyAddedSuccessfully: "Party Added Successfully.",
  k_partyUpdateSuccessfully: "Party Updated Successfully.",
  k_partyDeleteSuccessfully: "Party Deleted Successfully.",
  k_serviceAddedSuccessfully: "Service Added Successfully.",
  k_serviceUpdatedSuccessfully: "Service Updated Successfully.",
  k_serviceDeleteSuccessfully: "Service Deleted Successfully.",
  k_vehicleAddedSuccessfully: "Vehicle Added Successfully.",
  k_vehicleUpdatedSuccessfully: "Vehicle Updated Successfully.",
  k_vehicleDeleteSuccessfully: "Vehicle Deleted Successfully.",
  k_mandatoryStoragePermission: "You must accept storage permission to use this app feature.",
  k_pleaseRestartYourApp: "Please restart your application because some images are missing which are necessary to create bill.",
  k_err_PartyName: "Please enter party name",
  k_err_PartyState: "Please enter party state",
  k_err_PartyAddress: "Please enter party address",
  k_err_PartyGSTNumber: "Please enter party gst number",
  k_err_PartyStateCode: "Please enter party state code",
  k_err_onlyAlphabetsInPartyName: "Please enter only alphabets in party name",
  k_err_notValidLengthOfGSTNumber: "GST number should be 15 digits",
  k_err_InvalidGSTNumber: "Invalid GST number",
  k_err_NotValidLengthOfPhoneNumber: "Contact number should be 10 digits only",
  k_err_DesOfGoods: "Please enter description of goods",
  k_err_HsnCode: "Please enter HSN code",
  k_err_InvalidHSNCode: "Invalid HSN code",
  k_err_VehicleNumber: "Please enter vehicle number",
  k_err_DriveName: "Please enter driver name",
  k_err_InvalidVehicleNumber: "Invalid vehicle number. \n Vehicle number format must should be like this (XX 00 XX 0000)",
  k_err_InvalidDriverName: "Driver name should be only in alphabets",
  k_err_VehicleType: "Please select vehicle type",
  k_err_InvoiceNumber: "Please enter invoice number",
  k_err_BasicAmount: "Please enter basic amount",
  k_err_SubTotal: "Please enter sub total",
  k_err_GrandTotal: "Please enter grand total",
  k_err_rupeesInWords: "Please enter rupees in words",
  k_err_S_AND_C_GST: "Please enter SGST and CGST",
  k_err_IGST: "Please enter IGST",
  k_confirmToDelete: "Are you sure to delete this party details ?",
  k_confirmToDeleteService: "Are you sure to delete this service details?",
  k_confirmToDeleteVehicle: "Are you sure to delete this vehicle details?"
}

/**
* ================================== Firebase Constant Keys =============================
*/
export var firebaseConfig = {
  apiKey: "AIzaSyBL9HTLQte0Q03IBwp4mu5dumY-_I2_9K0",
  authDomain: "patilbhai-contractor.firebaseapp.com",
  projectId: "patilbhai-contractor",
  storageBucket: "patilbhai-contractor.appspot.com",
  messagingSenderId: "37142342507",
  appId: "1:37142342507:web:94e49830f8eec57307ba2e"
};