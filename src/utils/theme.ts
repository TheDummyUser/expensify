import { useColorScheme } from "react-native"
import { darkMono, lightMono } from "./colors"


export const useTheme = () => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === "dark" ? darkMono : lightMono;
  return theme;
}



