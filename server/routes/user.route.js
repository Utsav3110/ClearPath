import { Router } from "express";
import { loginUser, logoutUser, registerUser ,currentUser, getUser} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { allReports, createReport } from "../controller/report.controller.js";

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

route.route("/report").post(
    verifyJWT,
    createReport
)

route.route("/getUser").post(
    getUser
)

route.route("/all-Report").get(
    allReports
)


export default route