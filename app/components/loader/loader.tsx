import * as React from "react"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { loaderStyles } from "./loader.styles"
import { mergeAll } from "ramda"
import { Text } from ".."
export interface LoaderProps {
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
  style?: ViewStyle

  /**
   * Pass Indicator color in screen.
   */
  indicatorColor?: string

  /**
   * Pass Indicator size in screen.
   */
  indicatorSize?: number | 'small' | 'large';

  /**
   * Loading message show in screen.
   */
  loadingMessage?: string
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function Loader(props: LoaderProps) {
  // grab the props
  const { style, indicatorColor, indicatorSize, loadingMessage } = props
  
  const CONTAINERVIEWSTYLE = mergeAll([loaderStyles.CONTAINERVIEW_LOADING, style])
  const SIZE_OF_INDICATOR = indicatorSize == undefined ? "large" : indicatorSize
  const COLOR_OF_INDICATOR = indicatorColor == undefined ? color.palette.white : indicatorColor
  const loadingText = loadingMessage == undefined ? "" : loadingMessage

  return (
    <View style={CONTAINERVIEWSTYLE} >
      <ActivityIndicator size={SIZE_OF_INDICATOR} color={COLOR_OF_INDICATOR} />
      {loadingText != "" ? <Text style={loaderStyles.TXTLOADINGMESSAGE} text={loadingText} /> : null}
    </View>
  )
}
