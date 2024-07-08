import React, { useState } from "react";
import {
	Text,
	StyleSheet,
	TextInput,
	SafeAreaView,
	FlatList,
	Pressable,
	View,
	TouchableOpacity,
} from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

export default function AutoCompleteScreen(props) {
	const [input, setInput] = useState();
	const [data, setData] = useState([]);

	const onChangeText = async (text) => {
		setInput(text);

		if (text.length > 2) {
			try {
				// let res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=AIzaSyAsvglZm1zOW8MS2kvIurRailAXOK9Vhwk`)
				const res = await fetch(
					`https://api.locationiq.com/v1/autocomplete?key=pk.1ac3285f15bc98edf2207162b5a3d9c7&q=${text}&type=city`
				);

				const data = await res.json();

				// //console.log({ data });
				// //console.log(data.length)

				// if (data.predictions.length > 0) setData(data.predictions);
				if (data.length > 0) setData(data);
			} catch (error) {
				//console.log(error);
			}
		}
	};

	const getItemText = (item) => {
		//console.log({ item });
		// //console.log(item.lat);
		// //console.log(item.lon);

		return (
			<View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
				<MaterialIcons name={"location-pin"} color={"black"} size={30} />
				<View style={{ marginLeft: 10, flexShrink: 1 }}>
					<Text style={{ fontWeight: "700", color: "black" }}>
						{item.address.name}
					</Text>
					<Text style={{ fontWeight: "500", color: "grey" }}>
						{item.address.state} - {item.address.country}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.searchSection}>
				<FontAwesome6
					name={props.icon}
					size={20}
					color="black"
					style={styles.searchIcon}
				/>

				<TextInput
					style={styles.inputField}
					onChangeText={onChangeText}
					autoFocus
					value={input}
					placeholder="Search locations.."
					placeholderTextColor={"grey"}
				/>

				<TouchableOpacity onPress={() => props.changeModalVisibility(false)}>
					<MaterialIcons
						name="cancel"
						size={25}
						color="black"
						style={styles.searchIcon}
					/>
				</TouchableOpacity>
			</View>

			{input && data.length > 0 ? (
				<FlatList
					data={data}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<Pressable
							style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
							onPress={() => {
								let formattedName = "";

								if (
									item.display_place &&
									item.address &&
									item.address.country
								) {
									if (item.display_place === item.address.state) {
										formattedName = `${item.display_place}, ${item.address.country}`;
									} else {
										// Check if state value exists before appending it
										const statePart = item.address.state
											? `${item.address.state}, `
											: "";
										formattedName = `${item.display_place}, ${statePart}${item.address.country}`;
									}
								}
								props.onPressItem({
									location: formattedName,
									coordinates: [Number(item.lon), Number(item.lat)],
								});
							}}
						>
							{getItemText(item)}
						</Pressable>
					)}
					keyExtractor={(item, index) => item.place_id + index}
				/>
			) : (
				<Text
					style={{
						flex: 1,
						alignSelf: "center",

						justifyContent: "center",
						paddingTop: "50%",

						color: "grey",
						fontSize: 16,
					}}
				>
					No Results..
				</Text>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	searchSection: {
		height: 60,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ABABAB",
		borderRadius: 8,
		marginBottom: 16,
		borderRadius: 25,
		width: "90%",
		alignSelf: "center",
	},
	searchIcon: {
		padding: 10,
		marginLeft: 10,
	},
	inputField: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
		color: "black",
		maxWidth: "85%",
		fontSize: 16,
	},
});
