import { Router } from "express";
import { loginUser, logoutUser, registerUser ,currentUser} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const route = Router();


// route.get("/hello", (req, res)=>{
//     res.send("hello");
// })

route.route("/register").post(registerUser);

route.route("/login").post(loginUser);


route.route("/logout").post(
    verifyJWT,
    logoutUser);

route.route("/current-user").get(
    verifyJWT,
    currentUser
)


export default route