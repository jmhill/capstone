function isAuthenticated(req, res, next) {
	if (req.user) {
		res.redirect('/my');
	} else {
		next();
	}
}

module.exports = function(app) {
	var index = require('../controllers/index.server.controller');
	app.get('/', isAuthenticated, index.render);
};
