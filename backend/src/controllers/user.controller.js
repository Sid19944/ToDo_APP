import { asyncHandler } from "../utils/async.Handler.js";
import ErrorHandler from "../utils/Error.Handler.js";
import { User } from "../model/user.schema.js";
import statusCode from "http-status-codes";

const generateAccessAndRefreshToken = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {}
};

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
// const registerUser = asyncHandler(async (req, res, next) => {
//   const {  email, name, password } = req.body;
//   const userExist = await User.findOne({ $or: [{ email, username }] });

//   if (userExist) {
//     return next(
//       new ErrorHandler("User with username or email already registered", 400),
//     );
//   }

//   if (!username || !name || !password || !email) {
//     return next(new ErrorHandler("Please Enter All Field", 400));
//   }
//   if ([ name, password, email].some((item) => item?.trim() === "")) {
//     return next(new ErrorHandler("please Enter All Field"));
//   }

//   const user = await User.create({
//     email: email.toLowerCase().trim(),
//     name: name.trim(),
//     password: password?.trim(),
//   });

//   if (!user) {
//     return next(new ErrorHandler("Internal Server Error", 500));
//   }
//   const { accessToken, refreshToken } =
//     await generateAccessAndRefreshToken(user);

//   return res
//     .status(statusCode.OK)
//     .cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: true,
//       expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
//       sameSite: "none",
//     })
//     .cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: true,
//       expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//       sameSite: "none",
//     })
//     .json({
//       success: true,
//       message: "User Register Successfully",
//       user: user,
//     });
// });

// const loginUser = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new ErrorHandler("Enter email and password", 400));
//   }

//   const user = await User.findOne({
//     email: email?.toLowerCase()?.trim(),
//   }).select("+password");

//   if (!user) {
//     return next(new ErrorHandler("Invalid Email ID", 400));
//   }

//   const isPasswordCorrect = await user.isPasswordCorrect(password);

//   if (!isPasswordCorrect) {
//     return next(new ErrorHandler("Invalid Password", 400));
//   }

//   const { accessToken, refreshToken } =
//     await generateAccessAndRefreshToken(user);

//   user.password = null;

//   return res
//     .status(statusCode.OK)
//     .cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: true,
//       expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
//       sameSite: "none",
//     })
//     .cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: true,
//       expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//       sameSite: "none",
//     })
//     .json({
//       success: true,
//       message: `${user.name}, Login Successfully`,
//       user,
//       accessToken,
//       refreshToken,
//     });
// });

// const updateUser = asyncHandler(async (req, res, next) => {
//   const newData = {
//     name: req?.body?.name?.trim(),
//     email: req?.body?.email?.toLowerCase()?.trim(),
//   };

//   const user = await User.findByIdAndUpdate(req?.user?._id, newData, {
//     new: true,
//   });

//   return res.status(200).json({
//     success: true,
//     message: "User updated successfully",
//     user,
//   });
// });

// const updatePassword = asyncHandler(async (req, res, next) => {
//   const { currentPassword, newPassword, confirmPassword } = req.body;

//   if (!currentPassword || !newPassword || !confirmPassword) {
//     return next(new ErrorHandler("Enter all field", 400));
//   }
//   const user = await User.findById(req.user._id).select("+password");
//   if (!user) {
//     return next(new ErrorHandler("User not logged in", 400));
//   }
//   const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);
//   if (!isPasswordCorrect) {
//     return next(new ErrorHandler("Invalid password", 400));
//   }

//   if (newPassword != confirmPassword) {
//     return next(
//       new ErrorHandler("new password and confirm password did't match"),
//     );
//   }

//   user.password = newPassword.trim();
//   await user.save();

//   return res.status(200).json({
//     success: true,
//     message: "Password updated successfully",
//   });
// });

// export {
//   registerUser,
//   loginUser,
//   logoutUser,
//   updateUser,
//   updatePassword,
//   getSingleUser,
// };
