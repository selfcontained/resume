var express = require('express'),
	app = express.createServer(),
	controllers = require('./controllers');


app.configure(function(){
	app.set('views', __dirname + '/views');
	// app.register('.html', require('jade'));
	app.set('view engine', 'jade');
	app.set('view options', {
		layout: false,
	});
	app.set('view cache', false);

	app.use(express.bodyParser());
	// app.use(express.methodOverride());
	app.use(express.static(__dirname + '/static'));
	app.use(app.router);
});


app.get('/', controllers.index);
app.listen(8001);

require('./stats').register(app);


console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
