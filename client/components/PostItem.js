import { View, Text, Image } from "react-native";
import React from "react";
import pin from "../assets/images/pin.png";

const PostItem = ({ locationData, presignedUrl }) => {
	return (
		<View
			style={{
				alignItems: "center",
				marginVertical: 10,
			}}
		>
			<Image
				style={{ width: "100%", height: 200, marginBottom: 20 }}
				resizeMode="contain"
				source={{ uri: presignedUrl }}
			/>
			<Text>{locationData.location}</Text>
		</View>
	);
};

export default PostItem;
