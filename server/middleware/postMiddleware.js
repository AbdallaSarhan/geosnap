import Post from "../models/PostModel.js"; // Update the path as needed

// Middleware function to get a post by ID
async function getPost(req, res, next) {
	let post;
	try {
		post = await Post.findById(req.params.id);
		if (post == null) {
			return res.status(404).json({ message: "Cannot find post" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.post = post;
	next();
}

export { getPost };
