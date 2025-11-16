import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Signup from "../screens/Signup"
import Login from "../screens/Login"
import { NavigationContainer } from "@react-navigation/native"
import { useTheme } from "../utils/theme"
import Home from "../screens/Home"
import { useSession } from "../context/SessionProvider"

import { fonts, fontSize } from "../utils/fonts"
import MyTabBar from "./MyTabBar"
import CustomHeader from "../components/CustomHeader"
import Expenses from "../screens/Expenses"
import Profile from "../screens/Profile"
import HeaderBack from "../components/HeaderBack"


export const RootNav = () => {
	const { session } = useSession()
	return (
		<NavigationContainer >
			{session ? <AfterAutnNav /> : <AuthNav />}
		</NavigationContainer>
	)
}

export const AuthNav = () => {
	const AuthStack = createNativeStackNavigator()
	const theme = useTheme();
	return (
		<AuthStack.Navigator
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: theme.background },
			}}
		>

			<AuthStack.Screen name="signup" component={Signup} />
			<AuthStack.Screen name="login" component={Login} />
		</AuthStack.Navigator>
	)
}



export const AfterAutnNav = () => {
	const baseStack = createNativeStackNavigator()
	const theme = useTheme();
	return (
		<baseStack.Navigator screenOptions={{
			headerShown: false, animation: "fade", contentStyle: {
				backgroundColor: theme.background
			}
		}}  >
			<baseStack.Screen name="Tab" component={TopNavBar} options={{
				headerShown: true,
				header: () => <CustomHeader />
			}} />
			<baseStack.Screen name="profile" component={Profile} options={{
				headerShown: true,
				// header: () => <HeaderBack title="profile" />
				headerStyle: {
					backgroundColor: theme.background
				},
				headerTitleStyle: {
					fontFamily: fonts.regular,
					fontSize: fontSize.xxl,

				},

				headerTintColor: theme.textMuted,
				headerShadowVisible: false
			}} />
		</baseStack.Navigator>

	)
}




const TopNavBar = () => {
	const theme = useTheme();
	const TopNav = createMaterialTopTabNavigator();
	return (
		<TopNav.Navigator screenOptions={{
			tabBarLabelStyle: { fontSize: 12, fontFamily: fonts.bold, color: theme.text, textTransform: "capitalize" },
			tabBarItemStyle: { width: 100 },
			tabBarStyle: { backgroundColor: theme.background },
			sceneStyle: {
				backgroundColor: theme.background
			}
		}}
			tabBar={(props) => <MyTabBar {...props} />}
		>
			<TopNav.Screen name="home" component={Home} />
			<TopNav.Screen name="expenses" component={Expenses} />
		</TopNav.Navigator>

	)

}
