module.exports = {

	index : function(req, res) {
		var resume = require('markdown').markdown.toHTML(
			require('fs').readFileSync(__dirname+'/../README.markdown', 'utf8')
		);
		res.render('index', {
			resume : resume
		});
	}

};
