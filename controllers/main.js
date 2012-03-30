var jade = require('jade'),
	fs = require('fs'),
	templatePath = __dirname+'/../views/';

module.exports = {

	index : function(req, res) {
		res.render('index');
	},

	resume : function(req, res) {
		var resume = require('markdown').markdown.toHTML(
			require('fs').readFileSync(__dirname+'/../README.markdown', 'utf8')
		);
		res.render('resume', {
			resume : resume
		});
	}

};
