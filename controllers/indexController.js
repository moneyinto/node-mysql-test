/**
 * Created by Administrator on 2015/10/24 0024.
 */
var db = require('../config/config.js');

var indexController = function (app) {
    app.get('/', function(req, res) {
        db.query('select name from user where id = 1', function (error, response) {
            if (error) console.log(error);
            console.log(response)
            res.render('index', {
                title: 'Express',
                myName: response[0].name
            });
        })
    });
};

module.exports = indexController;