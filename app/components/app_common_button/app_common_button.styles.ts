import { ViewStyle, TextStyle, Platform } from "react-native"
import { color, typography, spacing } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[3],
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof appCommonButtonStyles

export const appCommonButtonStyles = {
  WRAPPER: {
    justifyContent: 'center',
  } as ViewStyle,
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: color.primary
  } as TextStyle,
  TEXTPRESETS : {
    basic: { 
      ...BASE_TEXT,
      fontSize: 9,
      color: color.palette.white,
      fontFamily: typography.primary,
      textAlign: 'center',
      marginBottom: Platform.OS == 'ios' ? -5 : 0
    } as TextStyle,
    link: {
      ...BASE_TEXT,
      color: color.text,
      paddingHorizontal: 0,
      paddingVertical: 0,
    } as TextStyle,
  }
}
