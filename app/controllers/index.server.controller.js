
exports.render = function(req, res) {
	res.render('pages/index', {
		title: 'Capstone Project',
		userFirstName: req.user ? req.user.firstName : ''
	});
};
