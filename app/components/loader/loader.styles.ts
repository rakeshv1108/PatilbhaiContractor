import { ViewStyle, TextStyle } from "react-native"
import { color, typography } from "../../theme"
import { fontSizes, screenWidth } from '../../theme/size';

export const loaderStyles = {
  WRAPPER: {
    justifyContent: 'center',
  } as ViewStyle,
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: color.primary
  } as TextStyle,
  CONTAINERVIEW_LOADING : {
    flex: 1,
    justifyContent: "center",  
  } as ViewStyle,
  TXTLOADINGMESSAGE: {
    textAlign: 'center',
    fontFamily: typography.primary,
    marginTop: (screenWidth * 0.09),
    marginHorizontal: (screenWidth * 0.08),
    color: color.palette.pinkishTwo,
    fontSize: fontSizes.font15,
  } as TextStyle,
}
