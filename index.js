var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8557);

function getParamList (query) {
    var list = [];
    for (var key in query) {
        list.push({
            'name': key,
            'value': query[key]
        });
    }
    return list;
}

//GET request
app.get('/', function (req, res) {
    console.log(req.query);
    var context = {};
    context.paramList = getParamList(req.query);
    res.render('get', context);
});

//POST request
app.post('/',function (req, res) {
    var context = {};
    context.paramList = getParamList(req.query);
    context.bodyList = getParamList(req.body);
    res.render('post', context);
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});