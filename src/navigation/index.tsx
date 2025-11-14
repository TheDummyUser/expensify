import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Home from "../screens/Home";
import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import { useTheme } from "../utils/theme";
export type AuthStackParamList = {
	signup: undefined;
	login: undefined;
	home: undefined;
};


const AuthStack = createNativeStackNavigator<AuthStackParamList>()
const baseStack = createNativeStackNavigator()
const Tab = createNativeBottomTabNavigator()
export const AuthNav = () => {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}  >
			<AuthStack.Screen name="signup" component={Signup} />
			<AuthStack.Screen name="login" component={Login} />

		</AuthStack.Navigator>
	)
}



export const AfterAutnNav = () => {
	return (
		<baseStack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}  >
			<baseStack.Screen name="Tab" component={TabNav} />
		</baseStack.Navigator>

	)
}



const TabNav = () => {
	const theme = useTheme();
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen name="home" component={Home} options={{
				tabBarStyle: {
					backgroundColor: theme.background,
				},

			}} />
		</Tab.Navigator>

	)

}
