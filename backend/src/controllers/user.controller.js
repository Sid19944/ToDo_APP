import { asyncHandler } from "../utils/async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { User } from "../model/user.schema.js";
import statusCode from "http-status-codes";
import { generateAccessAndRefreshToken } from "../middleware/genAccAndRefToken.js";

export const googleLogin = asyncHandler(async (req, res, next) => {
  const userExist = await User.findOne({ authId: req.user._json.sub });

  if (!userExist) {
    const user = await User.create({
      authId: req.user._json.sub,
      name: req.user._json.name,
      firstName: req.user._json.given_name,
      lastName: req.user._json.family_name,
      avatar: req.user._json.picture,
      email: req.user._json.email,
    });

    if (!user) {
      return next(new ErrorHandler("Something went wrong", 500));
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user);

    if (!accessToken || !refreshToken) {
      return next(
        new ErrorHandler("Something went wrong while generate token", 500),
      );
    }

    return (
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
        })
        // .json({ message: "User Registered Successfully", user });
        .redirect(process.env.FRONTEND_URL)
    );
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(userExist);

  return (
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 12 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      // .json({ message: "User Logged In Successfully", user: userExist })
      .redirect(process.env.FRONTEND_URL)
  );
});

export const githubLogin = asyncHandler(async (req, res, next) => {
  const userExist = await User.findOne({ authId: req.user.id });
  if (!userExist) {
    const user = await User.create({
      authId: req.user.id,
      name: req.user.displayName,
      avatar: req.user.photos[0].value,
      provider: req.user.provider,
    });

    if (!user) {
      return next(new ErrorHandler("Something went wrong", 500));
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user);

    if (!accessToken || !refreshToken) {
      return next(
        new ErrorHandler("Something went wrong while generate token", 500),
      );
    }

    return (
      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 12 * 60 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        // .json({ message: "User Registered Successfully", user });
        .redirect(process.env.FRONTEND_URL)
    );
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(userExist);

  if (!accessToken || !refreshToken) {
    return next(
      new ErrorHandler("Something went wrong while generate token", 500),
    );
  }

  return (
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 12 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      // .json({ message: "User Lodded In  Successfully", userExist });
      .redirect(process.env.FRONTEND_URL)
  );
});

export const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("Invalid ID", 400));
  }

  return res.status(200).json({
    success: true,
    message: "user found successfully",
    user,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req?.user?._id, {
    $unset: {
      refreshToken: 1,
    },
  });

  return res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "User logged out successfully",
    });
});
