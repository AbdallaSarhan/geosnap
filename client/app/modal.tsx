import { StatusBar } from "expo-status-bar";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	ScrollView,
	FlatList,
} from "react-native";
import PostItem from "../components/PostItem";
import { usePosts } from "@/hooks/usePosts";
import { useEffect, useState } from "react";

export default function ModalScreen() {
	const { getAllPosts, posts } = usePosts();

	useEffect(() => {
		getAllPosts();
	}, []);
	return (
		<View style={styles.container}>
			<FlatList
				style={{ width: "100%" }}
				data={posts}
				keyExtractor={(post) => post._id}
				renderItem={({ item }) => (
					<PostItem
						locationData={item.locationData}
						presignedUrl={item.presignedUrl}
					/>
				)}
			/>

			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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
