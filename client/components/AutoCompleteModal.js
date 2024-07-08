import {
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import React from "react";
import AutoCompleteScreen from "./AutoCompleteScreen";

const ModalAutoCompleteSearch = (props) => {
	const onPressItem = (option) => {
		props.changeModalVisibility(false);
		props.setData(option);
	};

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => props.changeModalVisibility(false)}
		>
			<AutoCompleteScreen
				icon={props.icon}
				changeModalVisibility={props.changeModalVisibility}
				onPressItem={onPressItem}
			/>
		</TouchableOpacity>
	);
};

export default ModalAutoCompleteSearch;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modal: {
		backgroundColor: "white",
		borderRadius: 10,
		flex: 1,
	},
	option: {
		borderRadius: 1,
		borderColor: "#dbdbdb",
		borderWidth: 0.5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	text: {
		margin: 20,
		fontSize: 17,
	},
});
