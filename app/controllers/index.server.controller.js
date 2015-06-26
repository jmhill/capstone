exports.render = function(req, res) {
	res.render('pages/index', {
		title: 'Testing',
		places: [
			{ city: 'Exampleville', country: 'USA'}
		],
		userFirstName: req.user ? req.user.firstName : 'Traveler'
	});
};
