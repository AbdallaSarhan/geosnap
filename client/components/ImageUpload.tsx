import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Button,
	FlatList,
	ActivityIndicator,
	ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
// import * as Progress from 'react-native-progress';
import * as ImagePicker from "react-native-image-picker";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

// import useStorage from "../hooks/useStorage";

const ImageUpload = ({ setImagesData }) => {
	//   const { pickImage } = useStorage();
	const [images, setImages] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	const removeImage = (uri) => {
		const updatedImages = images.filter((image) => uri != image.uri);
		// console.log(updatedImages)
		setImages(updatedImages);
		setImagesData(updatedImages);
	};

	const uploadButton = () => {
		return (
			<TouchableOpacity
				onPress={() => pickImage()}
				style={{
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "white",
					width: 180,
					height: 180,
					borderColor: "grey",
					borderWidth: 0.5,
					borderRadius: 20,
				}}
			>
				<View style={styles.picturePlaceholder}>
					<Ionicons name="camera-outline" size={45} />
					<Text style={{ color: "grey" }}> Add photo</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const ImageSelectorComponent = () => {
		return (
			<>
				{images.length != 0 ? (
					<FlatList
						horizontal
						style={{
							width: "100%",
							margin: 20,
							paddingBottom: 15,
						}}
						ListHeaderComponent={images.length < 3 ? uploadButton : null}
						data={images}
						keyExtractor={(item: any) => item.uri}
						renderItem={({ item }) => (
							<ImageBackground
								resizeMode="cover"
								source={{ uri: item.uri }}
								style={{
									width: 180,
									height: 180,
									borderRadius: 40,
									marginLeft: 5,
								}}
							>
								<TouchableOpacity
									style={{
										position: "absolute",
										right: 8,
										top: 5,
										backgroundColor: "black",
										padding: 8,
										borderRadius: 16,
										opacity: 0.9,
									}}
									onPress={() => removeImage(item.uri)}
								>
									<FontAwesome name="remove" size={20} color="white" />
								</TouchableOpacity>
							</ImageBackground>
						)}
					/>
				) : (
					<TouchableOpacity
						onPress={() => pickImage()}
						style={{
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "white",
							width: "100%",
							height: 150,
							borderColor: "grey",
							borderWidth: 0.5,
							borderRadius: 40,
						}}
					>
						<View style={styles.picturePlaceholder}>
							<Ionicons name="camera-outline" size={45} color={"black"} />
							<Text style={{ color: "grey" }}> Add photos</Text>
						</View>
					</TouchableOpacity>
				)}
			</>
		);
	};

	const pickImage = async () => {
		try {
			setLoading(true);

			const options: ImagePicker.ImageLibraryOptions = {
				mediaType: "photo",
				quality: 1, // Image quality (0 to 1)
				maxWidth: 800, // Maximum width of the image
				maxHeight: 600, // Maximum height of the image
				selectionLimit: 3 - images.length, // Limit the number of images that can be selected
			};

			// Show image picker
			// ImagePicker.launchImageLibrary
			ImagePicker.launchImageLibrary(
				options,
				(response: ImagePicker.ImagePickerResponse) => {
					if (response.didCancel) {
						console.log("User cancelled image picker");
					} else if (response.error) {
						console.log("ImagePicker Error: ", response.error);
					} else if (response.customButton) {
						console.log("User tapped custom button: ", response.customButton);
					} else {
						// Process the selected images
						response?.assets.forEach((asset) => {
							setImages((prevState) => [
								...prevState,
								{
									uri: asset.uri,
									type: asset.type,
									fileName: asset.fileName,
								},
							]);
							setImagesData((prevState) => [
								...prevState,
								{
									uri: asset.uri,
									type: asset.type,
									fileName: asset.fileName,
								},
							]);
						});
					}
				}
			);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	// useEffect(() => {
	//   console.log({images});
	// }, [images]);

	return (
		<View
			style={{
				// justifyContent: "center",
				alignItems: "center",
				marginTop: 20,
				width: "90%",
			}}
		>
			{loading ? (
				<ActivityIndicator size={"large"} color="black" />
			) : (
				<ImageSelectorComponent />
			)}

			<Text
				style={{
					color: "grey",
					fontSize: 12,
				}}
			>
				3 images max
			</Text>
		</View>
	);
};

export default ImageUpload;

const styles = StyleSheet.create({
	picturePlaceholder: {
		alignItems: "center",
		justifyContent: "center",
	},
});
