import { ImageStyle, Platform, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { fontSizes, screenHeight, screenWidth } from "../../theme/size"

export const homeScreen = {
  FULL: {
    flex: 1,
    backgroundColor: color.palette.purpple,
  } as ViewStyle,
  BTN_COMMON_LIST: {
    height: screenWidth * 0.22,
    width: screenWidth * 0.75,
    alignSelf: "center",
    marginTop: screenWidth * 0.02,
    backgroundColor: color.palette.offWhite,
    marginBottom: screenWidth * 0.1,
    alignItems: "center",
    borderColor: color.palette.purpple,
    borderWidth: 2,
    justifyContent: "center",
    borderRadius: 10,
  } as ViewStyle,
  TXT_TITLE_STYLE: {
    fontSize: screenWidth * 0.05,
    color: color.palette.white,
    textAlign: "center",
    alignSelf: "flex-start",
    marginLeft: "36%",
  } as TextStyle,
  CONTAINER_BUTTONS: {
    flex: 1,
    marginTop: (screenWidth * 0.06),
    backgroundColor: color.palette.purpple,
  } as ViewStyle,
  VIEW_ACTIVITY_INDICATOR: {
    color: color.palette.white,
  } as ViewStyle,
  BTN_TEXT_STYLE: {
    letterSpacing: 4,
    fontSize: fontSizes.font14,
    color: color.palette.black,
  } as TextStyle,
  MAINVIEW_NAVIGATIONBAR_STYLE: {
    justifyContent: 'space-between',
    backgroundColor: color.palette.darkPurple,
  } as ViewStyle,
}
