import ImageUpload from "@/components/ImageUpload";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import LocationSelectComponent from "@/components/LocationSelectComponent";
import * as Progress from "react-native-progress";
import { usePosts } from "../../hooks/usePosts";
import { useToast } from "react-native-toast-notifications";

interface ImageData {
	fileName: string;
	type: string;
	uri: string;
}

interface LocationData {
	location: string;
	coordinates: number[];
}

const Page = () => {
	const [imageData, setImageData] = useState<ImageData | null>();
	const [locationData, setLocationData] = useState<LocationData>({
		location: "Add location",
		coordinates: [0, 0],
	});
	const { uploadPost, loading, progress, currentMessage } = usePosts();
	const toast = useToast();

	const post = async () => {
		const response_id = await uploadPost("testupload", imageData, locationData);

		if (response_id) {
			toast.show("Posted!", {
				type: "success",
				placement: "top",
				animationType: "slide-in",
			});
			setImageData(null);

			setLocationData({ location: "Add location", coordinates: [0, 0] });
		}
	};

	useEffect(() => {
		console.log(imageData);
		console.log(locationData);
	}, [imageData, locationData]);
	return (
		<View style={styles.container}>
			<ImageUpload imageData={imageData} setImagesData={setImageData} />

			<LocationSelectComponent
				locationData={locationData}
				setLocationData={setLocationData}
			/>

			<TouchableOpacity
				onPress={post}
				style={{
					backgroundColor: "green",
					padding: 20,
					borderRadius: 20,
					width: "90%",
					alignItems: "center",
					marginTop: 20,
					opacity:
						!imageData ||
						locationData.location == "Add Location" ||
						locationData.coordinates == null
							? 0.5
							: 1,
				}}
				disabled={
					!imageData ||
					locationData.location == "Add Location" ||
					locationData.coordinates === null
				}
			>
				{loading ? (
					<ActivityIndicator size={"large"} color={"white"} />
				) : (
					<Text style={{ fontSize: 20, color: "white" }}>Post</Text>
				)}
			</TouchableOpacity>
			{loading ? (
				<>
					<Progress.Bar
						progress={progress}
						width={300}
						color="green"
						style={{ marginTop: 30, marginBottom: 20 }}
					/>
					<Text>{currentMessage}</Text>
				</>
			) : null}
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
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
