import { Router } from "express";
import passport from "passport";
const router = Router();

import {
  googleLogin,
  githubLogin,
  getSingleUser,
  logout,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get(
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/auth`,
  }),
  googleLogin,
);

router
  .route("/github")
  .get(passport.authenticate("github", { scope: ["user:email"] }));

router.route("/github/callback").get(
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/auth`,
  }),
  githubLogin,
);

router.route("/user/me").get(verifyJwt, getSingleUser);
router.route("/user/logout").post(verifyJwt, logout);

export default router;
