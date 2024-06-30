import Map from "@/components/Map";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
	return (
		<View style={styles.container}>
			<Map />
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
