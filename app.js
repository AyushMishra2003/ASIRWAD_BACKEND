import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorMiddleware from "./middleware/error.middleware.js";
import multer from "multer";
import productRoute from "./routes/product.routes.js";

import teamRouter from "./routes/team.routes.js";
import academicRoute from "./routes/academic.route.js";
import noticeRouter from "./routes/notice.route.js";
import libraryRoute from "./routes/library.route.js";
import mainRoute from "./routes/main.route.js";
import galleryRoute from "./routes/gallery.routes.js";
import iqacRoute from "./routes/iqac,routes.js";
import { addInquiry } from "./controller/gallery.controller.js";



config();

// Initialize Express app
const app = express();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://ranipadmawatiasm.in",
      "https://www.ranipadmawatiasm.in",
      "https://master.ranipadmawatiasm.in",
      "https://www.master.ranipadmawatiasm.in",
      "https://dashboard-college.netlify.app"
    ],
    credentials: true,
  })
);



app.use(morgan("dev"));


 
// router



app.use("/api/v1/product",productRoute)
app.use("/api/v1/team",teamRouter)
app.use("/api/v1/team",teamRouter)
app.use("/api/v1/academic",academicRoute)
app.use("/api/v1/notice",noticeRouter)
app.use("/api/v1/library",libraryRoute)
app.use("/api/v1/main",mainRoute)
app.use("/api/v1/gallery",galleryRoute)
app.use("/api/v1/iqac",iqacRoute)



// app.get("/test", (req, res) => {
//   res.status(200).json({
//     message: "testis running and ready.",
//   });
// });

// Default route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running and ready.",
  });
});

// Catch-all route for undefined endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Oops! pagal h kya  Not Found",
  });
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
