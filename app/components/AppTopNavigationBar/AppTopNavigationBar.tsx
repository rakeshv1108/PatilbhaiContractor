import * as React from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity, ImageStyle, Platform } from "react-native"
import { color, typography } from "../../theme"
import { Text } from '../text/text'
import { mergeAll } from "ramda"
import { Icon } from "../icon/icon"
import { IconTypes } from "../icon/icons"
import { screenWidth } from "../../theme/size"

export interface AppTopNavigationBarProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

   /**
   * Text of Right Button which is looked up via i18n.
   */
  rightButtonText?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * Navigation Title Style (Header) of the screen.
   */
  textStyle?: TextStyle | TextStyle[]

  /**
   * Container Style of Title Text in Navigation Bar.
   */
  textContainerStyle?: ViewStyle

  /**
   * Navigation Left Button Style of the screen.
   */
  btnLeftStyle?: ViewStyle

  /**
   * Navigation Right Button Style of the screen.
   */
  btnRightStyle?: ViewStyle

  /**
   * Navigation Right Text Button Style of the screen.
   */
  rightTextBtnStyle?: TextStyle

  /**
  * Handle show or hide Right Button in screen.
  */
  isRightButtonShow?: Boolean

  /**
  * Handle show or hide Left Button in screen.
  */
  isLeftButtonShow?: Boolean

  /**
  * Handle show or hide Right Text Button in screen.
  */
  isRightTextButtonShow? : Boolean

  /**
   * Left Icon in Navigation Bar on screen.
   */
  leftIcon?: IconTypes

  /**
  * Right Icon in Navigation Bar on screen.
  */
  rightIcon?: IconTypes

  /**
  * If Another Image need to add in Navigation Bar excluding left and right icon.
  */
  isAnotherImage?: IconTypes

  /**
  * If Notification is unreadable then it will recive true value otherwise false
  */
  isNotificationAvailable?: Boolean

  /**
  * Handle Left Button Event in screen.
  */
  onLeftButtonPress?: () => void

  /**
   * Handle Right Button Event in screen.
   */
  onRightButtonPress?: () => void

  /**
   *  Right Icon Style in screen.
   */
  rightButtonIconStyle?: ImageStyle | undefined | [ImageStyle]
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function AppTopNavigationBar(props: AppTopNavigationBarProps) {
  // grab the props
  const {
    tx,
    text,
    rightButtonText,
    style,
    textStyle,
    btnLeftStyle,
    btnRightStyle,
    textContainerStyle,
    isRightButtonShow,
    isLeftButtonShow,
    isRightTextButtonShow,
    rightTextBtnStyle,
    leftIcon,
    rightIcon,
    isAnotherImage,
    isNotificationAvailable,
    rightButtonIconStyle,
    onLeftButtonPress,
    onRightButtonPress,
    ...rest
  } = props

  const COMMONTXTSTYLE: TextStyle = {
    shadowOpacity: 0,
    color: 'black',
    shadowRadius: 0,
    shadowOffset: { height: 0, width: 0 },
    fontFamily: typography.primary,
    fontSize: (screenWidth * 0.053),
    alignSelf: 'center',
    marginTop: Platform.OS === "ios" ? 5 : 0,
  }

  const COMMONNAVIGATIONBAR: ViewStyle = {
    height: (screenWidth * 0.12),
    width: '100%',
    borderTopWidth: 0,
    borderBottomWidth: 0.5,
    elevation: 3,
    borderBottomColor: color.palette.lighterGrey,
    borderTopColor: color.palette.white,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowColor: color.palette.black,
    shadowOffset: { height: 2, width: 0 },
    flexDirection: 'row',
    backgroundColor: color.palette.white,
    alignContent: 'center',
    justifyContent: 'space-between',
  }

  const COMMONBACKBUTTON = {
    height: (screenWidth * 0.08),
    width: (screenWidth * 0.08),
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'center'
  } as ViewStyle

  const TXTCONTAINER = {
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  } as ViewStyle

  const backImageStyle = {
    height: (screenWidth * 0.08),
    width: (screenWidth * 0.08),
    resizeMode: "center",
    tintColor: 'white',
  } as ImageStyle

  const btnNotificationImageStyle = {
    height: (screenWidth * 0.025),
    width: (screenWidth * 0.025),
    position: "absolute",
    left: 16,
    top: -23,
  } as ImageStyle

  const RIGHTTEXTBUTTON = {
    color: color.palette.pink,
    alignSelf: 'center',
  } as TextStyle

  const viewStyle = mergeAll([COMMONNAVIGATIONBAR, style])
  const txtContainerStyle = mergeAll([TXTCONTAINER, textContainerStyle])
  const txtStyle = mergeAll([COMMONTXTSTYLE, textStyle])
  const rightTextStyle = mergeAll([RIGHTTEXTBUTTON, rightTextBtnStyle])

  const btn_LeftStyle = mergeAll([COMMONBACKBUTTON, btnLeftStyle])
  const btn_RightStyle = mergeAll([COMMONBACKBUTTON, btnRightStyle])

  const defaultIconLeft: IconTypes = leftIcon == undefined ? "back" : leftIcon
  const defaultIconRight: any = rightIcon == undefined ? "back" : rightIcon

  const rightIconStyle = mergeAll([backImageStyle, rightButtonIconStyle])

  return (
    <View style={viewStyle} {...rest}>
      {isLeftButtonShow ?
        <TouchableOpacity onPress={onLeftButtonPress} style={btn_LeftStyle} {...rest}>
          <Icon style={backImageStyle} icon={defaultIconLeft} />
        </TouchableOpacity> : null
      }
      <View style={txtContainerStyle}>
        <Text tx={tx} text={text} style={txtStyle} />
      </View>
      {isRightButtonShow ?
        <TouchableOpacity onPress={onRightButtonPress} style={btn_RightStyle} {...rest}>
          {isNotificationAvailable ?
            <View>
              <Icon style={backImageStyle} icon={defaultIconRight} />
              <Icon style={btnNotificationImageStyle} icon="bullet" />
            </View>
            :
            <Icon style={rightIconStyle} icon={defaultIconRight} />
          }
        </TouchableOpacity> : null
      }
      {isRightTextButtonShow ?
        <TouchableOpacity onPress={onRightButtonPress} style={btn_RightStyle} {...rest}>
             <Text tx={rightButtonText} text={text} style={rightTextStyle} />
        </TouchableOpacity> : null
      }
    </View>
  )
}
