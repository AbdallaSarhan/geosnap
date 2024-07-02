import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
	const [imageData, setImageData] = useState<any>([]);
	return (
		<View style={styles.container}>
			<ImageUpload setImagesData={setImageData} />

			<View style={styles.separator} />
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		// justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
