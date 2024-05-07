const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {

    // [GET] /
    async index(req, res) {
        try {
            let courses = await Course.find({});
            res.render('home', { courses: multipleMongooseToObject(courses) })
        } catch (error) {
            res.status(400).json({ error: 'ERROR' })
        }
    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController