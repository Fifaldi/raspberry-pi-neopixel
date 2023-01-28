module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets/",
            "@store": "./app/store/",
            "@services": "./app/services/",
            "@shared": "./app/shared/",
            "@router": ["./app/router/"],
            "@components": "./app/components/",
            "@screens": "./app/screens",
            "@core": "./app/core/",
            "@theme": "./app/theme/",
            "@utils": "./app/utils/",
            "@constants": "./app/constants/",
          },
        },
      ],
    ],
  };
};
