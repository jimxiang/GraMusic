var express = require('express');
var router = express.Router();

var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');

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
		res.render('home', { title: 'Home', subtitle: 'GraMusic', user: user});
	}
});

router.get('/home/map', function(req, res) {
	if (confirm) {
		res.render('map', { title: 'Map', subtitle: 'Music & Map'});
	} else {
		res.redirect('/');
	}
})

router.get('/home/topTen', function(req, res) {
	if (confirm) {
		res.render('topTen', { title: 'TopTen', subtitle: 'Music & TopTen'});
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

router.get('/home/rss', function(req, response) {
	if (confirm) {
		// 虾米音乐RSS API: http://www.xiami.com/collect/feed?spm=0.0.0.0.z7jD9b
		// 网易云音乐RSS API: http://yunmusic.lofter.com/rss
		request({uri: 'http://www.xiami.com/collect/feed?spm=0.0.0.0.z7jD9b'}, function(err, res, body) {
		    if (err) return next(err);
		    if (res.statusCode != 200)
		      return next(new Error('Abnormal response status code'))

		    var handler = new htmlparser.RssHandler();
		  	var parser = new htmlparser.Parser(handler);
		  	parser.parseComplete(body);

		  	if (!handler.dom.items.length)
		    	return next(new Error('No RSS items found'));

		  	item = handler.dom.items;
		  	console.log(item[0]);
			response.render('rss', { title: 'RSS', subtitle: 'Music & RSS', 
				rssTitle1: item[0].title, rssLink1: item[0].link, rssAuthor1: item[0].description.substr(13), rssPubDate1: item[0].pubDate,
				rssTitle2: item[1].title, rssLink2: item[1].link, rssAuthor2: item[1].description.substr(13), rssPubDate2: item[1].pubDate,
				rssTitle3: item[2].title, rssLink3: item[2].link, rssAuthor3: item[2].description.substr(13), rssPubDate3: item[2].pubDate,
				rssTitle4: item[3].title, rssLink4: item[3].link, rssAuthor4: item[3].description.substr(13), rssPubDate4: item[3].pubDate,
				rssTitle5: item[4].title, rssLink5: item[4].link, rssAuthor5: item[4].description.substr(13), rssPubDate5: item[4].pubDate,
				rssTitle6: item[5].title, rssLink6: item[5].link, rssAuthor6: item[5].description.substr(13), rssPubDate6: item[5].pubDate,
				rssTitle7: item[6].title, rssLink7: item[6].link, rssAuthor7: item[6].description.substr(13), rssPubDate7: item[6].pubDate,
				rssTitle8: item[7].title, rssLink8: item[7].link, rssAuthor8: item[7].description.substr(13), rssPubDate8: item[7].pubDate,
				rssTitle9: item[8].title, rssLink9: item[8].link, rssAuthor9: item[8].description.substr(13), rssPubDate9: item[8].pubDate,
				rssTitle10: item[9].title, rssLink10: item[9].link, rssAuthor10: item[9].description.substr(13), rssPubDate10: item[9].pubDate
				// rssTitle1: item[0].title.substring(8, item[0].title.length-2), rssLink1: item[0].link,
				// rssTitle2: item[1].title.substring(8, item[1].title.length-2), rssLink2: item[1].link,
				// rssTitle3: item[2].title.substring(8, item[2].title.length-2), rssLink3: item[2].link,
				// rssTitle4: item[3].title.substring(8, item[3].title.length-2), rssLink4: item[3].link,
				// rssTitle5: item[4].title.substring(8, item[4].title.length-2), rssLink5: item[4].link,
				// rssTitle6: item[5].title.substring(8, item[5].title.length-2), rssLink6: item[5].link,
				// rssTitle7: item[6].title.substring(8, item[6].title.length-2), rssLink7: item[6].link,
				// rssTitle8: item[7].title.substring(8, item[7].title.length-2), rssLink8: item[7].link,
				// rssTitle9: item[8].title.substring(8, item[8].title.length-2), rssLink9: item[8].link,
				// rssTitle10: item[9].title.substring(8, item[9].title.length-2), rssLink10: item[9].link
			});
		});
	} else {
		response.redirect('/');
	}

})
module.exports = router;
