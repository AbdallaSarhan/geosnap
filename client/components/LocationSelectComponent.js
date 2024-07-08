import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import AutoCompleteModal from "./AutoCompleteModal";

const LocationSelectComponent = (props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const changeModalVisibility = (bool) => {
		setIsModalVisible(bool);
	};

	useEffect(() => {
		console.log(props.locationData);
	}, [props.locationData]);

	return (
		<View style={{ width: "90%" }}>
			<TouchableOpacity
				style={styles.searchSection}
				onPress={() => changeModalVisibility(true)}
			>
				<FontAwesome6
					name={"location-dot"}
					style={styles.searchIcon}
					size={20}
					color="#000"
				/>

				<Text style={styles.inputField}>
					{props.locationData?.location || "Enter Image Location"}
				</Text>
			</TouchableOpacity>

			<Modal
				animationType="slide"
				visible={isModalVisible}
				onRequestClose={() => changeModalVisibility(false)}
			>
				<AutoCompleteModal
					changeModalVisibility={changeModalVisibility}
					setData={props.setLocationData}
					icon={"location-dot"}
				/>
			</Modal>
		</View>
	);
};

export default LocationSelectComponent;

const styles = StyleSheet.create({
	input: {
		marginVertical: 8,
		paddingHorizontal: 15,
		paddingVertical: 12,
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "#fff",
		flexDirection: "row",
		alignItems: "center",
	},
	searchSection: {
		height: 60,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "grey",
		borderRadius: 8,
		marginBottom: 16,
		borderRadius: 25,
	},
	searchIcon: {
		padding: 10,
	},
	inputField: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
		color: "Black",
		maxWidth: "85%",

		fontSize: 15,
	},
});
