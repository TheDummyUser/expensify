import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';

const CustomDropdown = ({ data, placeholder = 'Select items...', onSelectionChange }) => {
	const [selectedItems, setSelectedItems] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (key, value) => {
		const newSelection = [...selectedItems, { key, value }];
		setSelectedItems(newSelection);
		if (onSelectionChange) {
			onSelectionChange(newSelection);
		}
	};

	const handleRemove = (keyToRemove) => {
		const newSelection = selectedItems.filter(item => item.key !== keyToRemove);
		setSelectedItems(newSelection);
		if (onSelectionChange) {
			onSelectionChange(newSelection);
		}
	};

	const availableItems = data.filter(
		item => !selectedItems.some(selected => selected.key === item.key)
	);

	return (
		<View style={styles.container}>
			{/* Selected Items Display */}
			<View style={styles.selectedContainer}>
				{selectedItems.length === 0 ? (
					<Text style={styles.placeholder}>{placeholder}</Text>
				) : (
					<View style={styles.selectedItemsWrapper}>
						{selectedItems.map(item => (
							<View key={item.key} style={styles.selectedItem}>
								<Text style={styles.selectedItemText}>{item.value}</Text>
								<TouchableOpacity
									onPress={() => handleRemove(item.key)}
									style={styles.removeButton}
								>
									<Text style={styles.removeButtonText}>×</Text>
								</TouchableOpacity>
							</View>
						))}
					</View>
				)}
			</View>

			{/* Dropdown Button */}
			<TouchableOpacity
				style={styles.dropdownButton}
				onPress={() => setIsOpen(!isOpen)}
			>
				<Text style={styles.dropdownButtonText}>
					{isOpen ? '▲' : '▼'}
				</Text>
			</TouchableOpacity>

			{/* Dropdown Modal */}
			<Modal
				visible={isOpen}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setIsOpen(false)}
			>
				<TouchableOpacity
					style={styles.modalOverlay}
					activeOpacity={1}
					onPress={() => setIsOpen(false)}
				>
					<View style={styles.dropdownList}>
						<ScrollView>
							{availableItems.length === 0 ? (
								<Text style={styles.noItemsText}>No more items available</Text>
							) : (
								availableItems.map(item => (
									<TouchableOpacity
										key={item.key}
										style={styles.dropdownItem}
										onPress={() => {
											handleSelect(item.key, item.value);
											setIsOpen(false);
										}}
									>
										<Text style={styles.dropdownItemText}>{item.value}</Text>
									</TouchableOpacity>
								))
							)}
						</ScrollView>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
	},
	selectedContainer: {
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
		padding: 12,
		minHeight: 50,
	},
	placeholder: {
		color: '#999',
		fontSize: 16,
	},
	selectedItemsWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	selectedItem: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#007AFF',
		borderRadius: 16,
		paddingVertical: 6,
		paddingLeft: 12,
		paddingRight: 8,
		marginRight: 8,
		marginBottom: 8,
	},
	selectedItemText: {
		color: '#fff',
		fontSize: 14,
		marginRight: 6,
	},
	removeButton: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: 'rgba(255,255,255,0.3)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	removeButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		lineHeight: 18,
	},
	dropdownButton: {
		position: 'absolute',
		right: 12,
		top: 12,
		padding: 8,
	},
	dropdownButtonText: {
		fontSize: 16,
		color: '#666',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		padding: 20,
	},
	dropdownList: {
		backgroundColor: '#fff',
		borderRadius: 8,
		maxHeight: 300,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	dropdownItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	dropdownItemText: {
		fontSize: 16,
		color: '#333',
	},
	noItemsText: {
		padding: 16,
		textAlign: 'center',
		color: '#999',
		fontSize: 14,
	},
});

export default CustomDropdown;
