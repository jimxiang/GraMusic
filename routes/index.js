var express = require('express');
var router = express.Router();
var confirm = false;

/* GET home page. */
router.get('/', function(req, res, next) {
	// confirm = false;
	res.render('index', {title: 'GraMusic', action: 'Join me', action1: 'Login', action2: 'Signup'});
});

router.route('/login')
.get(function(req, res) {
	res.render('login', {title: 'Login', action1: 'Back', action2: 'Signup'});
})
.post(function(req, res) {
	var user = {
		username: 'admin',
		password: '123456'
	};
	// console.log('username:' + req.param('username'));
	if (req.param('username') === user.username && req.param('password') === user.password) {
		confirm = true;
		res.redirect('/home');
	} else {
		res.redirect('/login');
	}
});

router.route('/signup')
.get(function(req, res) {
	res.render('signup', {title: 'Signup', action: 'Login'});
})
.post(function(req, res) {
	res.redirect('/home');
})

router.get('/logout', function(req, res) {
	res.redirect('/');
	confirm = false;
});

router.get('/home', function(req, res) {
	if (!confirm) {
		res.redirect('/login');
	} else {
		var user = {
			username: 'admin'
		};
		res.render('home', { title: 'Home', user: user});
	}
});

router.get('/home/map', function(req, res) {
	if (confirm) {
		res.render('map', { title: 'Map'});
	} else {
		res.redirect('/');
	}
})

router.get('/home/topTen', function(req, res) {
	if (confirm) {
		res.render('topTen', { title: 'TopTen'});
	} else {
		res.redirect('/');
	}
})

router.get('/home/playList', function(req, res) {
	if (confirm) {
	 	res.render('playList', { title: 'PlayList'});
	} else {
		res.redirect('/');
	}
})

module.exports = router;
