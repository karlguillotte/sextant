/**
 * Module dependencies.
 */

var  express = require("express")
	,routes = require("./routes")
	,params = require('express-params')
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
	app.use(express.errorHandler());
});

// Routes
params.extend(app);
// Only en or fr are available for now...
app.param("lang", /fr|en/i);
app.get("/", function(req, res) {
	res.redirect("/" + req.headers["accept-language"].substring(0,2).toLowerCase() || "en");
});
app.get("/:lang/", function(req, res) {
	res.redirect("/" + req.params.lang.input.toLowerCase());
});
app.get("/:lang", routes.index);
app.error(function(err, req, res, next) {
	console.log("erreur");
	res.redirect("/");
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
