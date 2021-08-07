import { ImageStyle, Platform, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { fontSizes, screenHeight, screenWidth } from "../../theme/size"

export const vehicleListScreen = {
  FULL: {
    flex: 1,
    backgroundColor: color.palette.darkPurple,
  } as ViewStyle,
  TXT_TITLE_STYLE: {
    fontSize: screenWidth * 0.05,
    color: color.palette.white,
    textAlign: "center",
    alignSelf: "flex-start",
    marginLeft: "34%",
  } as TextStyle,
  RIGHT_BUTTON_STYLE: {
    marginTop: 3,
  } as ImageStyle,
  CARDVIEW_CELL_CONTAINER: {
    backgroundColor: color.palette.paleGreyTwo,
    width: (screenWidth * 0.92),
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: color.palette.paleGreyTwo,
    borderRadius: 10,
    shadowColor: color.palette.black,
    shadowOffset: {height: 1, width: 3},
    shadowRadius: 2,
    shadowOpacity: 0.8,
    elevation: 4,
    marginBottom: (screenWidth * 0.05),
  } as ViewStyle,
  TXT_VEHICLE_NAME: {
    color: color.palette.black,
    fontFamily: typography.primary,
    fontSize: fontSizes.font15,
    textTransform: 'capitalize',
  } as TextStyle,
  TXT_NO_VEHICLE_ADDED: {
    fontSize: fontSizes.font20,
    alignSelf: 'center',
    flex: 1,
    textAlignVertical: 'center',
    color: color.palette.white
  } as TextStyle,
  FLATLIST_STYLE: {
    marginTop: screenWidth * 0.05,
  } as ViewStyle,
  SEARCH_BAR_ICON_STYLE: {
    backgroundColor: color.transparent,
    marginTop: 6,
    alignSelf: 'center',
    padding: 11,
    justifyContent: "center",
  } as ImageStyle,
  CONTAINER_OVERRIDE_STYLE: {
    paddingVertical: 0,
  } as ViewStyle,
  TXT_INPUT_STYLE: {
    borderBottomWidth: 1,
    borderColor: color.palette.lighterGrey,
    backgroundColor: color.palette.paleGrey,
    width: screenWidth * 0.8,
    height: screenHeight * 0.05,
    color: color.palette.black,
    alignSelf: "center",
    marginTop: 0,
    marginLeft: 20,
    fontSize: fontSizes.font13,
  } as TextStyle,
  CONTAINER_SEARCHBAR: {
    marginTop: screenWidth * 0.03,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
}