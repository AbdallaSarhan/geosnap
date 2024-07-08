import {
	PutObjectCommand,
	S3Client,
	GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configure the AWS SDK
console.log(process.env.PORT);

/**
 * Generate a pre-signed URL for uploading a file to S3
 * @param {string} bucketName - The name of the S3 bucket
 * @param {string} key - The key for the object in the S3 bucket
 * @param {number} [expires=60] - The expiration time of the pre-signed URL in seconds
 * @returns {string} - The pre-signed URL
 */

export const generatePutPresignedUrl = async (key) => {
	console.log(process.env.AWS_S3_REGION);

	console.log({ key });
	const s3Client = new S3Client({ region: process.env.AWS_S3_REGION });
	const command = new PutObjectCommand({
		Bucket: process.env.BUCKET_NAME,
		Key: key,
	});

	const signedUrl = await getSignedUrl(s3Client, command, {
		expiresIn: 3600,
	});
	console.log({ signedUrl });
	return signedUrl;
};
