import { useState } from "react";
import axios from "../axios";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const usePosts = () => {
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [currentMessage, setCurrentMessage] = useState("");
	const [posts, setPosts] = useState([]);

	const getPresignedUrl = async (key) => {
		setCurrentMessage("Getting presigned urls...");
		const headers = {
			"Content-Type": "application/json",
		};

		try {
			const response = await axios.get(`/upload/generate-url?key=${key}`, {
				headers: headers,
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	const handleImageUpload = async (key, image) => {
		try {
			const { url } = await getPresignedUrl(key);
			setProgress(0.5);
			const response = await uploadImage(url, image);
			console.log({ response });

			return response;
		} catch (error) {
			console.error("Error uploading image:", error);
			return false;
		}
	};

	const uploadImage = async (presignedUrl, image) => {
		console.log("uploading image..");

		setCurrentMessage("Uploading images to S3...");

		const imageBlob = await getBlob(image.uri);
		console.log({ imageBlob });
		console.log("Blob Type:", typeof imageBlob);

		try {
			setProgress(0.75);
			const response = await fetch(presignedUrl, {
				method: "PUT",
				body: imageBlob,
				headers: {
					"Content-Type": imageBlob.type, // Use the MIME type of the blob
				},
			});
			setProgress(1);
			console.log("Image uploaded successfully");

			setCurrentMessage("Image uploaded!");

			return response.ok;
		} catch (error) {
			console.error("Image upload failed:", error);
			setCurrentMessage("Something went wrong while trying to upload image");
		}
	};

	const uploadPost = async (image, locationData) => {
		setLoading(true);
		setProgress(0.25);
		try {
			const uniqueId = uuidv4();

			const key = `${locationData.location.split(" ")[0]}-${uniqueId}`;
			const uploaded = await handleImageUpload(key, image);
			// if storing was successful, presist data in database
			const response = await notifyServerWithPostDetails(key, locationData);
			console.log(response._id);

			return response._id;
		} catch (error) {
			console.log(error);
			setCurrentMessage("Something went wrong");
		} finally {
			setLoading(false);
			setProgress(0);
		}
	};

	const getBlob = async (fileUri) => {
		const resp = await fetch(fileUri);
		const imageBody = await resp.blob();
		return imageBody;
	};

	const notifyServerWithPostDetails = async (key, locationData) => {
		// Send a request to the server with post details and image reference
		const data = {
			locationData,
			imageKey: key,
		};

		const headers = {
			"Content-Type": "application/json",
		};

		try {
			const response = await axios.post("/posts", data, {
				headers: headers,
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	const getAllPosts = async () => {
		try {
			const response = await axios.get("/posts");
			setPosts(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		uploadPost,
		getAllPosts,
		posts,
		loading,
		progress,
		currentMessage,
	};
};
