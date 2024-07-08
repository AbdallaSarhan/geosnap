import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ActivityIndicator,
	ImageBackground,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "react-native-image-picker";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const ImageUpload = ({ imageData, setImagesData }) => {
	const [loading, setLoading] = useState(false);

	const removeImage = () => {
		setImagesData({});
	};

	const UploadButton = () => {
		return (
			<TouchableOpacity
				onPress={() => pickImage()}
				style={{
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "white",
					width: "100%",
					height: 300,
					borderColor: "grey",
					borderWidth: 0.5,
					borderRadius: 40,
					marginBottom: 20,
				}}
			>
				<View style={styles.picturePlaceholder}>
					<Ionicons name="camera-outline" size={45} color={"black"} />
					<Text style={{ color: "grey" }}> Add photos</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const ImageSelectorComponent = () => {
		return (
			<>
				{imageData?.uri != null ? (
					<View
						style={{
							width: "100%",
							margin: 20,
							paddingBottom: 15,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<ImageBackground
							resizeMode="cover"
							source={{ uri: imageData.uri }}
							style={{
								width: "100%",
								height: 300,
								marginLeft: 5,
								overflow: "hidden",
								borderRadius: 20,
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
								onPress={() => removeImage()}
							>
								<FontAwesome name="remove" size={20} color="white" />
							</TouchableOpacity>
						</ImageBackground>
					</View>
				) : (
					<UploadButton />
				)}
			</>
		);
	};

	const pickImage = async () => {
		try {
			setLoading(true);

			const options = {
				mediaType: "photo",
				quality: 1, // Image quality (0 to 1)
				maxWidth: 800, // Maximum width of the image
				maxHeight: 600, // Maximum height of the image
				selectionLimit: 1,
			};

			// Show image picker
			ImagePicker.launchImageLibrary(options, (response) => {
				if (response.didCancel) {
					console.log("User cancelled image picker");
				} else if (response.error) {
					console.log("ImagePicker Error: ", response.error);
				} else if (response.customButton) {
					console.log("User tapped custom button: ", response.customButton);
				} else {
					// Process the selected images
					console.log(response.assets);

					setImagesData({
						uri: response.assets[0].uri,
						type: response.assets[0].type,
						fileName: response.assets[0].fileName,
					});
				}
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View
			style={{
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
