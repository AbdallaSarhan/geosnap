import {
	PutObjectCommand,
	S3Client,
	GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import dotenv from "dotenv";

// dotenv.config();

// Configure the AWS SDK
console.log(process.env.PORT);

const s3Client = new S3Client({ region: process.env.AWS_S3_REGION });

/**
 * Generate a pre-signed URL for uploading a file to S3
 * @param {string} bucketName - The name of the S3 bucket
 * @param {string} key - The key for the object in the S3 bucket
 * @param {number} [expires=60] - The expiration time of the pre-signed URL in seconds
 * @returns {string} - The pre-signed URL
 */

export const generatePutPresignedUrl = async (key) => {
	const command = new PutObjectCommand({
		Bucket: "quiqpost-uploader",
		Key: key,
	});

	const signedUrl = await getSignedUrl(s3Client, command, {
		expiresIn: 3600,
	});
	console.log({ signedUrl });
	return signedUrl;
};
// export function generatePresignedUrl(
// 	bucketName = "geosnap-storage",
// 	key,
// 	expires = 200
// ) {
// 	const params = {
// 		Bucket: bucketName,
// 		Key: key,
// 		Expires: expires,
// 	};

// 	try {
// 		const url = s3.getSignedUrl("putObject", params);
// 		return url;
// 	} catch (error) {
// 		console.error("Error generating pre-signed URL", error);
// 		throw error;
// 	}
// }
