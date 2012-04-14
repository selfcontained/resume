var fs = require('fs'),
	path = require('path'),
	jade = require('jade'),
	resourceDir = path.normalize(__dirname+'/../resources/'),
	cachedPayload;

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

function compress(code) {
	var uglify = require('uglify-js'),
		parser = uglify.parser,
		compressor = uglify.uglify,
		ast,
		compressed = '';

	try {
		ast = uglify.parser.parse(code);
		ast = compressor.ast_mangle(ast);
		ast = compressor.ast_squeeze(ast);
		compressed = compressor.gen_code(ast);
	}catch(e) {
		compressed = e.toString();
	}
	return compressed;
}

module.exports = {

	index : function(req, res) {
		if(!cachedPayload) {
			var resources = require(resourceDir+'resources.json'),
				payload = [];

			payload.push(combineScripts(resources.scripts));
			payload.push(combineTemplates(resources.templates));

			cachedPayload = compress(payload.join(''));
		}
		res.contentType('text/javascript');
		res.send(cachedPayload);
	}

};
