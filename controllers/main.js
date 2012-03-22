var jade = require('jade'),
	fs = require('fs'),
	templatePath = __dirname+'/../views/';

module.exports = {

	index : function(req, res) {
		var resume = require('markdown').markdown.toHTML(
			require('fs').readFileSync(__dirname+'/../README.markdown', 'utf8')
		);
		res.render('index', {
			resume : resume
		});
	},

	templates : function(req, res) {
		var whoopdwhoop = jade.compile(
			fs.readFileSync(templatePath+'whoopdwhoop.jade', 'utf8'),
			{
				client:true,
				compileDebug:false,
				filename:templatePath+'layout'
			}
		);
		res.send('Resume.setTemplates({' +
			'whoopdwhoop:'+whoopdwhoop.toString()+
		'});');
	},

	whoopdwhoop : function(req, res) {
		res.render('whoopdwhoop');
	}

};
