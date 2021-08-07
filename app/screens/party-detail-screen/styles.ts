import { ImageStyle, Platform, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { fontSizes, screenHeight, screenWidth } from "../../theme/size"

export const partyDetailScreen = {
  FULL: {
    flex: 1,
    backgroundColor: color.palette.darkPurple,
  } as ViewStyle,
  HEADERVIEW: {
    width: "100%",
    backgroundColor: color.palette.darkPurple,
  } as ViewStyle,
  TXT_TITLE_STYLE: {
    fontSize: screenWidth * 0.05,
    color: color.palette.white,
    textAlign: "center",
    alignSelf: "flex-start",
    marginLeft: "37%",
  } as TextStyle,
  TXT_CENTER_TITLE: {
    fontSize: screenWidth * 0.05,
    color: color.palette.white,
    textAlign: "center",
    alignSelf: "flex-start",
    marginLeft: "32%",
  } as TextStyle,
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
    marginTop: 15,
    marginBottom: 5,
  } as TextStyle,
  TXT_INPUT_STYLE_WITH_PENCIL: {
    borderBottomWidth: 1,
    borderColor: color.palette.lighterGrey,
    backgroundColor: color.palette.paleGreyTwo,
    width: screenWidth * 0.77,
    height: 44,
    color: color.palette.black,
    paddingLeft: 5,
    alignSelf: "center",
  } as TextStyle,
  CONTAINER_OVERRIDE_STYLE: {
    backgroundColor: 'red',
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
  DELETE_ICON: {
    tintColor: color.palette.white,
    height: 26,
    width: 26,
    alignSelf: 'center',
  } as ImageStyle,
  BTN_DELETE_STYLE: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle
}
