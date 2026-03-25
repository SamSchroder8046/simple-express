import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // check if user exists already

        const exists = await User.findOne({ email: email.toLowerCase() });
        if (exists) {
            return res.status(400).json({ message: "User already exists." });
        }

        // create user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        })

        res.status(201).json({
            message: "User registered",
            user: { id: user._id, email: user.email, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const logInUser = async (req, res) => {
    try {
        // check if the user already exists
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found."
            });
        }

        // Compare passwords
        const match = await user.comparePassword(password);
        if (!match) return res.status(400).json({
            message: "Invalid credentials."
        });

        res.status(200).json({
            message: "User logged in.",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const logOutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        })

        if (!user) return res.status(404).json({
            message: "User not found."
        });

        res.status(200).json({
            message: "Log out successful."
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error."
        });
    }
}

export {
    registerUser,
    logInUser,
    logOutUser
};
