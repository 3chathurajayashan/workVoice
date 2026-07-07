import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./Configs/swagger.js";

const app = express();
import authRoutes from './Routes/auth.routes.js'
import postRoutes from './Routes/post.routes.js'
import commentRoutes from './Routes/Comment.Routes.js'
import notificationRoutes from './Routes/notification.routes.js'
import followRoutes from './Routes/follow.routes.js'
import saveRoutes from './Routes/Save.Routes.js'
import companyRoutes from './Routes/company.routes.js'
import searchRoutes from './Routes/Search.Routes.js'
import profileRoutes from './Routes/Profile.Routes.js'
import FeedRoutes from './Routes/feed.routes.js'
import LikeRoutes from './Routes/like.routes.js'
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
    Middlewares
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(cookieParser());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

/*
    Health Check
*/

 

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to WorkVoice API"
    });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/follow", followRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/saved", saveRoutes);
app.use("/api/v1/company", commentRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/feed",FeedRoutes );
app.use("/api/v1/likes", LikeRoutes);
app.use("/api/v1/profile", profileRoutes);
export default app;