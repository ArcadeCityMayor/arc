import { ConfigContext, ExpoConfig } from "@expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_BETA = process.env.APP_VARIANT === "beta";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_DEV ? `[DEV] ${config.name ?? ""}` : config.name ?? "Arc",
  slug: config.slug ?? "arc",
  icon: IS_DEV
    ? "./src/assets/icons/icon-dev.png"
    : IS_BETA
    ? "./src/assets/icons/icon-beta.png"
    : "./src/assets/icons/icon.png",
  android: {
    ...config.android,
    package: IS_DEV ? "arcade.labs.arc.devclient" : "arcade.labs.arc",
  },
});
