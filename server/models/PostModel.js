import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
	locationData: {
		coordinates: {
			type: [Number], // Array of Numbers for latitude and longitude
			required: true,
		},
		location: {
			type: String, // Location name
			required: true,
		},
	},
	imageKey: {
		type: String, // Reference to the image in S3
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
export const Post = mongoose.model("Post", postSchema);
