import { TextInputProps, TextStyle, ViewStyle, KeyboardType } from "react-native"

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: string

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: string

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: ViewStyle | ViewStyle[]

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: TextStyle | TextStyle[]

  /**
   * Various look & feels.
   */
  preset?: "default"

  /**
   * Next TextFiled Refrence.
   */
  forwardedRef?: any

  /**
   * Current TextFiled Refrence.
   */
  currentRef?: any

  /**
   * Textfield Above Label Style.
   */
  labelStyle?: TextStyle

  /**
   * TextField is editable or not.
   */
  isEditable?: boolean
  /**
   * To give Keyboard Type Email,Password,Number or etc.
   */
  keyboardtype?: KeyboardType

  /**
  * To set initial Value to the textinput in screen.
  */
  initialValue?: string

  /**
  * If Multiline is available then put text on the top of the textfield.
  */ 
  ismultilineAvailable? : boolean

  /**
  * If Auto Correct is false then suggestion and correction will be not done automatically.
  */ 
  isAutoCorrect?: boolean
}
