const express = require("express");
const route = express.Router();
const dbconfig = require("../config/dbconfig");
const courseController = require("../controllers/course-controller");

route.get("/all/:category", courseController.getCoursesByCategory);
route.get("/product/:id", courseController.getCoursesById);
route.get("/all", courseController.getCourses);
route.post("/add", courseController.addCourse);
route.post("/add-mycourse", courseController.addMyCourse);






module.exports = route;
