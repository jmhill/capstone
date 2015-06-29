exports.render = function(req, res) {
	res.render('pages/index', {
		title: 'Capstone Project',
		places: [
			{ city: 'Exampleville', country: 'USA'}
		],
		userFirstName: req.user ? req.user.firstName : ''
	});
};
