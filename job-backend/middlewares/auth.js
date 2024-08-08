import { cathAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import User from "../modals/userSchema.js";

export const isAuthorized = cathAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token is present
  if (!token) {
    return next(new ErrorHandler("User not authorized", 400));
  }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user by ID
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Proceed to the next middleware
    next();
});
