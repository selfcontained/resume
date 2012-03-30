var less = require('less'),
	fs = require('fs');

module.exports = {

	compile : function(req, res) {
		var lessString = fs.readFileSync(__dirname+'/../resources/'+req.param('filename')+'.less', 'utf8');

		var parser = new less.Parser();
		parser.parse(lessString, function(e, tree) {
			res.header('Content-Type', 'text/css');
			res.send(e||tree.toCSS({ compress: true }));
		});
	}

};
