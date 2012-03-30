var Resume = {

	templates : null,

	setTemplates : function(templates) {
		this.templates = templates;
	},

	render : function(template, data) {
		return this.templates[template](data);
	},

	init : function() {
		$('#content li[data-template]').on('click', function() {
			var template = $(this).attr('data-template');

			if(template) {
				$.colorbox({
					html:Resume.render(template),
					width: 600
				});
			}
		});
		$('#content li[data-href]').on('click', function() {
			var href = $(this).attr('data-href');

			if(href) {
				document.location = href;
			}
		})
	}

};
$(Resume.init);
