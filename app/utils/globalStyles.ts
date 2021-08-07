import { ViewStyle, TextStyle, Platform } from "react-native"
import { color, typography } from "../theme"
import { screenWidth } from "../theme/size"

export const APPBOTTOM_VIEW = {
    justifyContent: 'flex-end'
} as ViewStyle

export const APPBOTTOM = {
    width: screenWidth,
    backgroundColor: color.palette.paleGrey,
} as ViewStyle

export const APPBOTTOM_WHITE = {
    width: screenWidth,
    alignSelf: 'flex-end',
    backgroundColor: color.palette.white,
} as ViewStyle

export const MAINVIEW_NAVIGATIONBAR_STYLE = {
    justifyContent: 'space-between',
    backgroundColor: color.palette.darkPurple,
} as ViewStyle

export const CONTAINER_TITLE_TEXT = {
    justifyContent: 'flex-start',
    alignContent:'flex-start',
    flex: 1,
    marginLeft: 0,
    color: color.palette.white,
} as ViewStyle

export const COMMON_BUTTON_STYLE = {
    backgroundColor: color.palette.paleGrey,
    borderWidth: 1,
} as ViewStyle

export const COMMON_BUTTON_ENABLE_STYLE = {
    borderWidth: 0,
    backgroundColor: color.palette.navyBlue,
} as ViewStyle

export const TXT_BUTTON_NAME = {
    fontFamily: typography.primary,
    fontSize: (screenWidth * 0.05),
    letterSpacing: 2,
    marginTop: Platform.OS == "ios" ? 3 : 0,
    color: color.palette.navyBlue,
} as TextStyle

export const TXT_BUTTON_NAME_ENABLE = {
    fontSize: (screenWidth * 0.05),
    color: color.palette.white,
    marginTop: Platform.OS == "ios" ? 3 : 0,
    letterSpacing: 2,
} as TextStyle

export const FULL_PALEGRAY_BACKGROUNDVIEW = {
    flex: 1,
    backgroundColor: color.palette.paleGrey,
} as ViewStyle

export const FULL = {
    flex: 1,
    backgroundColor: color.palette.white,
} as ViewStyle

export const SHOWSHADOWOFNAVIGATION = {
    marginTop: 2
} as ViewStyle

export const SHADOW_ROUNDED_CORNERVIEW = {
    backgroundColor: color.palette.white,
    shadowColor: color.palette.black,
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
} as ViewStyle

export const ACTIVITY_INDICATOR_STYLE = {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
} as ViewStyle