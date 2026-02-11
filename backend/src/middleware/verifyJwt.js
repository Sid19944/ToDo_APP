import { asyncHandler } from "../utils/async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import jwt from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { User } from "../model/user.schema.js";
import { generateAccessAndRefreshToken } from "./genAccAndRefToken.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const cookie =
      req?.cookies || req?.header("Authorization")?.replace("Bearer", "");

    if (!cookie || (!cookie.accessToken && !cookie.refreshToken)) {
      return next(
        new ErrorHandler("Unauthorized Access", httpStatus.UNAUTHORIZED),
      );
    }

    const decodedToken = await jwt.verify(
      cookie.accessToken || cookie.refreshToken,
      cookie.accessToken
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET,
    );
    if (!decodedToken) {
      return next(new ErrorHandler("Invalid token", 400));
    }
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return next(new ErrorHandler("Invalid Token ID", 400));
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

    req.user = user;
    next();
  } catch (error) {
    return next(
      new ErrorHandler(
        "Something went wrong while decoding the access Token",
        400,
      ),
    );
  }
});
