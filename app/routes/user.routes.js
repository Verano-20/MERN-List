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

    app.post('/user/getList', [authJwt.verifyToken], controller.getList);

    app.post('/user/newTask', [authJwt.verifyToken], controller.newTask);

    app.post('/user/deleteTask', [authJwt.verifyToken], controller.deleteTask);

    app.post('/user/completedTask', [authJwt.verifyToken], controller.completedTask);
};