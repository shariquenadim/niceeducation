const express      = require('express'),
      bodyParser   = require('body-parser'),
      indexRoutes  = require("./routes/routes"),
      port         = process.env.PORT || "3000",
      app          = express();

const session = require('express-session');
app.use(session({secret: '12567890', resave: false, saveUninitialized: false}));

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//using routes
app.use(indexRoutes);

app.listen(port , function(){
  console.log(`Running on port ${port}`);
});
