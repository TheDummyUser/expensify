import { Animated, View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { useTheme } from '../utils/theme';
import { fonts, fontSize } from '../utils/fonts';

function MyTabBar({ state, descriptors, navigation, position }) {
	const theme = useTheme();
	const { buildHref } = useLinkBuilder();

	return (
		<View style={[styles.container, { backgroundColor: theme.background }]}>
			<View style={[styles.tabBarContainer, { backgroundColor: theme.background }]}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
								? options.title
								: route.name;
					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});
						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name, route.params);
						}
					};

					const onLongPress = () => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};

					return (
						<TouchableOpacity
							key={route.key}
							href={buildHref(route.name, route.params)}
							accessibilityRole={Platform.OS === 'web' ? 'link' : 'button'}
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarButtonTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={[
								styles.tabButton,
								{
									backgroundColor: isFocused ? theme.surface : "transparent",
									elevation: isFocused ? 2 : 0,
									borderColor: isFocused ? theme.borderStrong : "transparent",
									borderWidth: StyleSheet.hairlineWidth
								}
							]}
							activeOpacity={0.7}
						>
							<Animated.Text
								style={[
									styles.tabLabel,
									{
										color: isFocused ? theme.text : theme.textSoft,
										fontFamily: fonts.bold,
									}
								]}
							>
								{label}
							</Animated.Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingTop: 16,
		paddingBottom: 12,
	},
	tabBarContainer: {
		flexDirection: 'row',
		gap: 4,
	},
	tabButton: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabLabel: {
		fontSize: fontSize.base,
		textTransform: 'capitalize',
		fontFamily: fonts.regular,

	},
});

export default MyTabBar;
