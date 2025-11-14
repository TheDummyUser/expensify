import { StatusBar, useColorScheme } from 'react-native';
import {
	SafeAreaProvider,
} from 'react-native-safe-area-context';

import Layout from './src/components/Layout';
import { AuthNav } from './src/navigation';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const TransparentLightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'transparent',
		card: 'transparent',
	},
};

const TransparentDarkTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		background: 'transparent',
		card: 'transparent',
	},
};

const queryClient = new QueryClient()

import { SessionProvider, useSession } from './src/context/SessionProvider';
import { AfterAutnNav } from './src/navigation';


function App() {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<QueryClientProvider client={queryClient}  >
			<SessionProvider>
				<SafeAreaProvider>
					<Layout>
						<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
						<Nav />
					</Layout>
				</SafeAreaProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
}


const Nav = () => {
	const isDarkMode = useColorScheme() === 'dark';
	const { session } = useSession()
	return (
		<NavigationContainer theme={isDarkMode ? TransparentDarkTheme : TransparentLightTheme}>
			{session ? <AfterAutnNav /> : <AuthNav />}
		</NavigationContainer>
	)
}




export default App;
