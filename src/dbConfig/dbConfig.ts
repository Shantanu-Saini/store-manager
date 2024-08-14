import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        })

        connection.on("error", (err) => {
            console.error("Error connecting to MongoDB:", err);
        })

    } catch (error) {
        console.log("Error Ocurred while DB Connection : ", error)
    }
}