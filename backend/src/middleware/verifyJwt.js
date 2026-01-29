import { asyncHandler } from "../utils/async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import jwt from "jsonwebtoken";
import httpStatus from "http-status-codes"
import { User } from "../model/user.schema.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const accessToken =
      req?.cookies?.accessToken ||
      req?.header("Authorization")?.replace("Bearer", "");

    if(!accessToken){
        return next(new ErrorHandler("Unauthorized Request",httpStatus.UNAUTHORIZED))
    }

    const decodedToken = await jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
    if(!decodedToken){
        return next(new ErrorHandler("Invalid token",400))
    }
    const user = await User.findById(decodedToken._id)
    if(!user){
        return next(new ErrorHandler("Invalid Token ID",400))
    }
    req.user = user;
    next()
  } catch (error) {
    return next(new ErrorHandler("Something went wrong while decoding the access Token",400))
  }
});
