import { extendTheme } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
  colors: {
    black: {
      600: "#111111",
    },
  },
  shadows: {
    0: {
      shadowColor: "#111",
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 0,
    },
  },

  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins-Light",
      },
      200: {
        normal: "Poppins-Light",
      },
      300: {
        normal: "Poppins-Light",
      },
      400: {
        normal: "Poppins-Regular",
        italic: "Poppins-Italic",
      },
      500: {
        normal: "Poppins-Regular",
      },
      600: {
        normal: "Poppins-SemiBold",
      },
      700: {
        normal: "Poppins-Bold",
      },
      800: {
        normal: "Poppins-Bold",
      },
      900: {
        normal: "Poppins-Bold",
      },
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
  fontSizes: {
    "2xs": RFValue(10, 812),
    xs: RFValue(12, 812),
    sm: RFValue(14, 812),
    md: RFValue(16, 812),
    lg: RFValue(18, 812),
    xl: RFValue(20, 812),
    "2xl": RFValue(24, 812),
    "3xl": RFValue(32, 821),
    "4xl": RFValue(36, 821),
    "5xl": RFValue(40, 812),
  },
  // components: {
  //     Alert: {
  //         color: 'red',
  //         baseStyle: {
  //             _dark: {
  //                 _text: {
  //                     color: 'red',
  //                 },
  //             },
  //         },
  //     },
  //     Button: {
  //         defaultProps: {
  //             size: 'md',
  //             width: '100%',
  //             py: 3,
  //         },
  //         baseStyle: {
  //             rounded: '3xl',
  //             borderWidth: 1,
  //             _pressed: {opacity: 0.5},
  //             _dark: {
  //                 bg: 'apetigo.secondary',
  //                 borderColor: 'light.100',
  //                 _text: {
  //                     color: 'light.100',
  //                 },
  //             },
  //             _disabled: {backgroundColor: 'apetigo.dark'},
  //             _light: {
  //                 bg: 'background.light',
  //                 borderColor: 'apetigo.primary',
  //                 _text: {
  //                     color: 'apetigo.dark',
  //                 },
  //                 _pressed: {backgroundColor: 'background.light'},
  //             },
  //             _text: {
  //                 fontSize: 'md',
  //                 fontWeight: 600,
  //             },
  //         },

  //         variants: {
  //             primary: {
  //                 _light: {
  //                     borderColor: 'apetigo.primary',
  //                     bg: 'apetigo.primary',
  //                     _text: {
  //                         color: 'apetigo.secondary',
  //                     },
  //                 },
  //                 _dark: {
  //                     bg: 'apetigo.primary',
  //                     borderColor: 'apetigo.primary',
  //                     _text: {
  //                         color: 'apetigo.secondary',
  //                     },
  //                 },
  //                 _disabled: {
  //                     bg: 'apetigo.gray',
  //                 },

  //                 _text: {fontSize: 'md', fontWeight: 600},
  //             },
  //             secondary: {
  //                 _light: {
  //                     bg: 'apetigo.white',
  //                     borderColor: 'apetigo.white',
  //                     _text: {
  //                         color: 'apetigo.secondary',
  //                     },
  //                 },
  //                 _dark: {
  //                     bg: 'apetigo.dark',
  //                     borderColor: 'apetigo.dark',
  //                     _text: {
  //                         color: 'apetigo.white',
  //                     },
  //                 },
  //             },
  //             dark: {
  //                 _light: {
  //                     bg: 'apetigo.secondary',
  //                     borderColor: 'apetigo.secondary',
  //                     _text: {
  //                         color: 'apetigo.primary',
  //                     },
  //                 },
  //                 _dark: {
  //                     bg: 'apetigo.secondary',
  //                     borderColor: 'apetigo.secondary',
  //                     _text: {
  //                         color: 'apetigo.primary',
  //                     },
  //                 },
  //             },
  //             disabled: {
  //                 _light: {
  //                     bg: 'apetigo.gray',
  //                     borderColor: 'apetigo.gray',
  //                     _text: {
  //                         color: 'apetigo.darkGray',
  //                     },
  //                 },
  //                 _dark: {
  //                     bg: 'apetigo.gray',
  //                     borderColor: 'apetigo.gray',
  //                     _text: {
  //                         color: 'apetigo.darkGray',
  //                     },
  //                 },
  //             },
  //             text: {
  //                 borderWidth: 0,
  //                 bgColor: 'transparent',
  //                 _dark: {
  //                     _text: {
  //                         color: 'apetigo.white',
  //                     },
  //                 },
  //                 _light: {
  //                     _text: {
  //                         color: 'apetigo.secondary',
  //                     },
  //                 },
  //             },
  //         },
  //     },

  //     Input: {
  //         defaultProps: {
  //             size: 'md',
  //             width: '100%',
  //         },
  //         baseStyle: {
  //             rounded: 'md',
  //             _light: {
  //                 color: 'apetigo.dark',
  //                 selectionColor: 'apetigo.dark',
  //             },
  //             _dark: {
  //                 color: 'apetigo.white',
  //                 selectionColor: 'apetigo.white',
  //             },
  //             borderWidth: 1,
  //             borderColor: 'apetigo.dark',
  //             _focus: {
  //                 borderColor: 'apetigo.dark',
  //             },
  //         },
  //         variants: {
  //             error: {
  //                 borderColor: 'apetigo.error',
  //             },
  //             fullError: {
  //                 borderColor: 'apetigo.error',
  //                 _dark: {
  //                     color: 'apetigo.error',
  //                 },
  //                 _light: {
  //                     color: 'apetigo.error',
  //                 },
  //             },
  //             success: {
  //                 borderColor: 'apetigo.primary',
  //             },
  //             fullSuccess: {
  //                 borderColor: 'apetigo.primary',
  //                 _dark: {
  //                     color: 'apetigo.primary',
  //                 },
  //                 _light: {
  //                     color: 'apetigo.primary',
  //                 },
  //             },
  //         },
  //     },
  //     Skeleton: {
  //         defaultProps: {
  //             width: '100%',
  //         },
  //         baseStyle: {
  //             rounded: 'md',
  //             _dark: {
  //                 startColor: 'apetigo.dark',
  //             },
  //             _light: {
  //                 startColor: 'apetigo.white',
  //             },
  //         },
  //     },
  //     Divider: {
  //         defaultProps: {
  //             width: '100%',
  //         },
  //         baseStyle: {
  //             rounded: 'md',
  //             _dark: {
  //                 bg: 'apetigo.dark',
  //             },
  //             _light: {
  //                 bg: 'apetigo.grayLight',
  //             },
  //         },
  //     },
  // },
});
