const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registrationModel = require('./models/registration');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/registration", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.post('/register', (req, res) => {
    registrationModel.create(req.body)
        .then(registration => res.json(registration))
        .catch(err => res.json(err));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await registrationModel.findOne({ email, password }).exec();
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.json({ message: "Login successful" });
    } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
