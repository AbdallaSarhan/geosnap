import express from "express";

// import getPost from ".././middleware/postMiddleware";
import { getPost } from "../middleware/postMiddleware.js";
import { Post } from "../models/PostModel.js";

// Create the router
const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get a specific post
router.get("/:id", getPost, (req, res) => {
	res.json(res.post);
});

// Create a new post
router.post("/", async (req, res) => {
	console.log(req.body);
	try {
		const post = new Post({
			locationData: {
				coordinates: req.body.locationData.coordinates, // Coordinates as numbers
				location: req.body.locationData.location,
			},
			imageKey: req.body.imageKey,
		});
		const newPost = await post.save();
		res.status(201).json(newPost);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete a post
router.delete("/:id", getPost, async (req, res) => {
	try {
		await res.post.remove();
		res.json({ message: "Deleted Post" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

export default router;
