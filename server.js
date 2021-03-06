/**
 * Module dependencies.
 */

var  express = require("express")
	,routes = require("./routes")
	// ,params = require('express-params')
	// globalize = require("globalize"),
	// lingua = require("lingua")
	// i18n = require("i18n")
	;

var app = module.exports = express.createServer();


// Configuration
app.configure(function() {
	app.set("views", __dirname + "/views");
	app.set("view engine", "mustache");
	app.register(".mustache", require("stache"));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
});

app.configure("development", function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure("production", function() {
	app.use('/', express.errorHandler({ dump: true, stack: true }));
});

// Routes
// params.extend(app);
// Only en or fr are available for now...
// app.param("lang", /fr|en/i);
app.get("/", function(req, res) {
	res.redirect("/" + req.headers["accept-language"].substring(0,2).toLowerCase() || "en");
});
app.get("/:lang/", function(req, res) {
	// console.log(req.params);
	console.log(req.params["lang"]);
	res.redirect("/" + req.params.lang);
	// res.redirect("/" + req.params.lang.input.toLowerCase());
});
app.get("/:lang", routes.index);
app.error(function(err, req, res, next) {
	console.log("erreur");
	res.redirect("/");
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);
