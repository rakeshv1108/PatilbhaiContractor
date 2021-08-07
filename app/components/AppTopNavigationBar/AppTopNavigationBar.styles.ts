import { ViewStyle, TextStyle } from "react-native"
import { color, typography } from "../../theme"

export const appTopNavigationBarStyles = {
  WRAPPER: {
    justifyContent: 'center',
  } as ViewStyle,
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: color.palette.black
  } as TextStyle
}
