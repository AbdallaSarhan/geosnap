import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(
	"mongodb+srv://root:abdalla@cluster0.qjz1dik.mongodb.net/quiqpost"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
	console.log("Connected to MongoDB");
});

app.get("/items", (req, res) => {
	res.json({ message: "Get all items" });
});
