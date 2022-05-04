const dbconfig = require("../config/dbconfig");
const db = dbconfig.connect();

const controller = {};

controller.getCoursesByCategory = async (req, res) => {
    const category = req.params.category;
    const query = `select * from courses where category = '${category}'`;

    await db.query(query, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: err.message,
            });
        } else {
            res.status(200).json({
                message: "Successfully fetched courses",
                data: result,
            });
        }
    });
};

controller.getCoursesById = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = `select * from courses where _id = '${id}'`;

    await db.query(query, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: err.message,
            });
        } else {
            res.status(200).json({
                message: "Successfully fetched courses",
                data: result,
            });
        }
    });
};

controller.getCourses = async (req, res) => {
    const query = `select * from courses`;
    console.log("result");
    await db.query(query, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: err.message,
            });
        } else {
            res.status(200).json({
                message: "Successfully fetched courses",
                data: result,
            });
        }
    });
};

controller.addCourse = async (req, res) => {
    const data = req.body;
    const query = `Insert into courses (course_name, description,  price, image,offer_price,ratings,category,includes) values ('${data.courseName}', '${data.description}', '${data.price}', '${data.image}', '${data.offerPrice}', "4.5", '${data.category}', '${data.provides}')`;

    await db.query(query, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: err.message,
            });
        } else {
            res.status(200).json({
                message: "Successfully added course",
                data: result,
            });
        }
    });
};

controller.addMyCourse = async (req, res) => {
    const query = `Insert into mycourse (courseId, userId) values ('${req.body.courseId}', '${req.body.customerId}')`;
    const isInMyCourse = `select * from mycourse where courseId = '${req.body.courseId}' and userId = '${req.body.customerId}'`;
    const courseDetails =
        "select * from courses where _id = '" + req.body.courseId + "'";

    await db.query(isInMyCourse, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: err.message,
            });
        } else {
            if (result.length > 0) {
                res.status(200).json({
                    type: "ALREADY_IN_MY_COURSE",
                    message: "Course already in my course",
                });
            } else {
                await db.query(query, async (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            message: err.message,
                        });
                    } else {
                        await db.query(courseDetails, async (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json({
                                    message: err.message,
                                });
                            } else {
                                res.status(200).json({
                                    type: "ADDED_TO_MY_COURSE",
                                    message: "Successfully added course",
                                    data: result,
                                });
                            }
                        });
                    }
                });
            }
        }
    });
};

module.exports = controller;
