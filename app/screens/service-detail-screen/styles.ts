import { ImageStyle, Platform, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { fontSizes, screenHeight, screenWidth } from "../../theme/size"

export const serviceDetailScreen = {
  FULL: {
    flex: 1,
    backgroundColor: color.palette.darkPurple,
  } as ViewStyle,
  TXT_TITLE_STYLE: {
    fontSize: screenWidth * 0.05,
    color: color.palette.white,
    textAlign: "center",
    alignSelf: "flex-start",
    marginLeft: "28%",
  } as TextStyle,
  HEADERVIEW: {
    width: "100%",
    backgroundColor: color.palette.darkPurple,
  } as ViewStyle,
  FLATLIST_STYLE: {
    marginTop: screenWidth * 0.05,
  } as ViewStyle,
  TXT_PARTY_NAME: {
    color: color.palette.white,
    fontFamily: typography.primary,
    fontSize: fontSizes.font15,
  } as TextStyle,
  RIGHT_BUTTON_STYLE: {
    marginTop: 3,
  } as ImageStyle,

  TXT_LABEL_STYLE: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
  } as TextStyle,
  TXT_INPUT_STYLE_WITH_PENCIL: {
    borderBottomWidth: 1,
    borderColor: color.palette.lighterGrey,
    backgroundColor: color.palette.paleGreyTwo,
    width: screenWidth * 0.88,
    height: 44,
    color: color.palette.black,
    paddingLeft: 5,
    alignSelf: "center",
    textAlignVertical: 'top',
  } as TextStyle,
  CONTAINER_OVERRIDE_STYLE: {
    paddingVertical: 0,
  } as ViewStyle,
  EDIT_ICON_STYLE: {
    height: screenWidth * 0.04,
    width: screenWidth * 0.04,
    alignSelf: "center",
    flex: 1,
  } as ImageStyle,
  BTNEDITTEXTFIELD: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS == "android" ? screenWidth * 0.0555 : screenWidth * 0.048,
    width: (screenWidth * 0.1),
    height: 44,
    backgroundColor: color.palette.paleGreyTwo,
  } as ViewStyle,
  SAVRCARD_BUTTON_STYLE: ({
    marginTop: screenWidth * 0.12,
    backgroundColor: color.palette.darkPurple,
    marginBottom: screenWidth * 0.1,
  } as unknown) as ViewStyle,
  TXT_SAVECARD: {
    letterSpacing: 2,
    fontFamily: typography.primary,
    fontSize: fontSizes.font15,
    fontStyle: "normal",
    marginTop: -5,
    fontWeight: "bold",
    color: color.palette.white,
  } as TextStyle,
}
