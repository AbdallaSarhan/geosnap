import express from "express";
import { generatePutPresignedUrl } from "../utils/s3Presigner.js";

const router = express.Router();

router.get("/generate-url", async (req, res) => {
	const { key } = req.query;

	if (!key) {
		return res.status(400).json({ message: "Key is required" });
	}

	try {
		const url = await generatePutPresignedUrl(key);
		res.json({ url });
	} catch (error) {
		res.status(500).json({ message: "Error generating pre-signed URL" });
	}
});

export default router;
