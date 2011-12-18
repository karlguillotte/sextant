/*
 * GET home page.
 */
var markdown = require("markdown").markdown,
	fs = require("fs"),
	_ = require("underscore")._;

var locales = {
	en: fs.readFileSync("locales/en.js").toString(),
	fr: fs.readFileSync("locales/fr.js").toString()
};


// Converting from markdown to html
for (locale in locales) {
	locales[locale] = JSON.parse(locales[locale]);
	locales[locale].sections.forEach(function(section, index) {
		section.content = markdown.toHTML(section.content);
		section.title = markdown.toHTML(section.title);
	});
	locales[locale].footer.title = markdown.toHTML(locales[locale].footer.title);
}
// Defaulting the values
// TODO There is a better way to do it...need a deep defaults...
locales["fr"] = _.defaults(locales["fr"], locales["en"]);
locales["fr"].sextant = _.defaults(locales["fr"].sextant, locales["en"].sextant);
locales["en"].footer.options.forEach(function(option, index) {
	locales["fr"].footer.options[index] = _.defaults(locales["fr"].footer.options[index], option);
});
locales["en"].sections.forEach(function(section, index) {
	locales["fr"].sections[index] = _.defaults(locales["fr"].sections[index], section);
});
for (locale in locales) {
	locales[locale].sextant = JSON.stringify(locales[locale].sextant);
}


exports.index = function(req, res) {
	var lang = req.params["lang"] ||  "";
	if (lang.toLowerCase() !== lang) {
		res.redirect("/" + lang.toLowerCase());
	}
	res.render("index", {
		locals: locales[lang]
	})
};
