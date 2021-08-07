import { Dimensions, Platform } from "react-native";

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);


// --------------------------------- fontSizes For Whole App -------------------------------------

export const definePlatform = ({ ios, android }: { ios: any, android: any }): any => (Platform.OS === "ios" ? ios : android);

export const fontSizes = {
    font8: definePlatform({ ios: screenWidth * 0.025, android: screenWidth * 0.0225 }) as number,
    font9: definePlatform({ ios: screenWidth * 0.0275, android: screenWidth * 0.025 }) as number,
    font10: definePlatform({ ios: screenWidth * 0.03, android: screenWidth * 0.0275 }) as number,
    font11: definePlatform({ ios: screenWidth * 0.0325, android: screenWidth * 0.03 }) as number,
    font12: definePlatform({ ios: screenWidth * 0.035, android: screenWidth * 0.0325 }) as number,
    font13: definePlatform({ ios: screenWidth * 0.0375, android: screenWidth * 0.035 }) as number,
    font14: definePlatform({ ios: screenWidth * 0.04, android: screenWidth * 0.0375 }) as number,
    font15: definePlatform({ ios: screenWidth * 0.0425, android: screenWidth * 0.04 }) as number,
    font16: definePlatform({ ios: screenWidth * 0.0475, android: screenWidth * 0.0425 }) as number,
    font17: definePlatform({ ios: screenWidth * 0.05, android: screenWidth * 0.045 }) as number,
    font18: definePlatform({ ios: screenWidth * 0.0525, android: screenWidth * 0.0475 }) as number,
    font19: definePlatform({ ios: screenWidth * 0.054, android: screenWidth * 0.0506 }) as number,
    font20: definePlatform({ ios: screenWidth * 0.056, android: screenWidth * 0.053 }) as number,
    font22: definePlatform({ ios: screenWidth * 0.058, android: screenWidth * 0.055 }) as number,
    font24: definePlatform({ ios: screenWidth * 0.064, android: screenWidth * 0.062 }) as number,
    font28: definePlatform({ ios: screenWidth * 0.075, android: screenWidth * 0.072 }) as number,
    font32: definePlatform({ ios: screenWidth * 0.085, android: screenWidth * 0.082 }) as number,
    font36: definePlatform({ ios: screenWidth * 0.096, android: screenWidth * 0.09 }) as number,
    font40: definePlatform({ ios: screenWidth * 0.106, android: screenWidth * 0.1 }) as number,
    font44: definePlatform({ ios: screenWidth * 0.1173, android: screenWidth * 0.1168 }) as number,
    font48: definePlatform({ ios: screenWidth * 0.128, android: screenWidth * 0.125 }) as number,
} 