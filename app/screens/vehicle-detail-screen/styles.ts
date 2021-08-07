import { ImageStyle, Platform, TextStyle, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { fontSizes, screenHeight, screenWidth } from "../../theme/size"

export const vehicleDetailScreen = {
  FULL: {
    flex: 1,
    backgroundColor: color.palette.darkPurple,
  } as ViewStyle,
  CONTAINEROF_SERVICE: {
    flexDirection: "row",
    flex: 1,
    marginTop: 20,
    marginHorizontal: 30,
    marginBottom: 10,
  } as ViewStyle,
}
