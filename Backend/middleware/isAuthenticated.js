import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode){
            return res.status(401).json({ message: "Invalid Token" });
        }

        req.user = decode.userId;
        req.id = decode.userId; // Add this line to set req.id
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export default isAuthenticated;