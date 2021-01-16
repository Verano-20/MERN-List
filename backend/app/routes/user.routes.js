const {authJwt} = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    // DONT FORGET TO ADD TOKEN VERIFICATION

    app.get('/user/getList', controller.getList);

    app.post('/user/newTask', controller.newTask);

    app.post('/user/deleteTask', controller.deleteTask);

    app.post('/user/completedTask', controller.completedTask);
};