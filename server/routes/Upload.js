import express from "express";
import { generatePutPresignedUrl } from "../utils/s3Presigner.js";

const router = express.Router();

router.get("/generate-url", async (req, res) => {
	const bucketName = process.env.BUCKET_NAME;
	const { key } = req.query;
	console.log({ bucketName });

	if (!bucketName || !key) {
		return res
			.status(400)
			.json({ message: "Bucket name and key are required" });
	}

	try {
		const url = await generatePutPresignedUrl(bucketName, key);
		res.json({ url });
	} catch (error) {
		res.status(500).json({ message: "Error generating pre-signed URL" });
	}
});

export default router;
