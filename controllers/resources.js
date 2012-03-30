var fs = require('fs'),
	path = require('path'),
	jade = require('jade'),
	resourceDir = path.normalize(__dirname+'/../resources/');

function combineScripts(scripts) {
	var payload = [];
	(scripts||[]).forEach(function(script) {
		payload.push('\n/** '+script+'*/\n', fs.readFileSync(resourceDir+script, 'utf8'));
	});
	return payload.join('');
}

function combineTemplates(templates) {
	var compiledTemplates = [];
	(templates||[]).forEach(function(template) {
		var templateFunc = jade.compile(
			fs.readFileSync(resourceDir+template, 'utf8'),
			{
				client:true,
				compileDebug:false,
				filename:resourceDir+template
			}
		);
		var key = template.match(/(.+)\.jade$/)[1];
		compiledTemplates.push(key+':'+templateFunc.toString());
	});
	return '\n/** Templates */\nResume.setTemplates({'+compiledTemplates.join(',')+'});';
}

module.exports = {

	index : function(req, res) {
		var resources = require(resourceDir+'resources.json'),
			payload = [];

		payload.push(combineScripts(resources.scripts));
		payload.push(combineTemplates(resources.templates));

		res.contentType('text/javascript');
		res.send(payload.join(''));
	}

}
