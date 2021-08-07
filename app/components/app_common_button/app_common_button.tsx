import * as React from "react"
import { ViewStyle, TouchableOpacity, TextStyle, TouchableOpacityProps, ActivityIndicator } from "react-native"
import { Text } from "../"
import { mergeAll, flatten } from "ramda"
import { appCommonButtonStyles, ButtonPresetNames } from "../app_common_button/app_common_button.styles"
import { color, } from "../../theme"
import { screenHeight, screenWidth } from "../../theme/size"
import { palette } from "../../theme/palette"

export interface AppCommonButtonProps extends TouchableOpacityProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | ViewStyle[]

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: TextStyle | TextStyle[]

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode

  /**
   * when loading is true then it present activityIndicator otherwise not.
   */
  isLoading? : Boolean
  /**
   * Default Name for TextPresent Style.
   */
  basic?: ButtonPresetNames

  /**
   * OnPress Props for TouchableOpacity.
   */
  onPress?: any
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function AppCommonButton(props: AppCommonButtonProps) {
  // grab the props
  const {
    tx,
    basic = "primary",
    text,
    style,
    textStyle: textStyleOverride,
    children,
    isLoading,
    ...rest
  } = props

  const textStyle = mergeAll(
    flatten([appCommonButtonStyles.TEXTPRESETS[basic] || appCommonButtonStyles.TEXTPRESETS.basic, textStyleOverride]),
  )

  const COMMONBUTTON: ViewStyle = {
    height: (screenHeight * 0.069),
    width: (screenWidth * 0.722),
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: color.palette.black,
    borderWidth: 1,
    alignSelf: 'center',
    marginHorizontal: (screenWidth * 0.139),
    marginTop: (screenHeight * 0.015),
    marginBottom: (screenHeight * 0.046),
    justifyContent: 'center',
    alignContent: 'center',
  }

  const viewStyle = mergeAll(
    flatten([COMMONBUTTON, style] || [style])
  )

  const content = children || <Text tx={tx} text={text} style={textStyle} />
  const isLoad =  isLoading ? true : false

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
        { !isLoad ? 
          content
        :
          <ActivityIndicator  size="small" animating={true} color={color.palette.white} />
        }
    </TouchableOpacity>
  )
}
