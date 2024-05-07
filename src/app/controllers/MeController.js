const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {

    // [GET] /me/courses/course
    storedCourses(req, res, next) {


        let courseQuery = Course.find({})

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.countDocumentsWithDeleted({ deleted: true })])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(next)

        // Course.countDocumentsWithDeleted({ deleted: true })
        //     .then((deletedCount) => {
        //         console.log(deletedCount)
        //     })
        //     .catch(() => { })

        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: multipleMongooseToObject(courses)
        //     }))
        //     .catch(next)

    }

    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then(courses => res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new MeController