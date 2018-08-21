const express = require('express');
const app = express();
bodyParser = require('body-parser');
var uuid = require('uuid-v4');
const teams = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 5000, function() {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.use(function(req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Content-Type', 'application/json');
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', PUT);
    //return res.status(200).json({});
  }
  next();
});

app.get('/', function(req, res) {
  res.send('Server running');
});

app.post('/addNewTeam', function(req, res) {
  let team = req.body;
  let i = teams.findIndex(item => {
    return item.Name === team.Name;
  });
  if (i == -1) {
    team.teamID = uuid();
    team.is_still_in = true;
    teams.push(team);
    console.log(teams.length);
    res.status(200).send('Added');
  } else {
    res.status(400).send('Error: Team already added');
  }
});

app.get('/stats/:teamName', function(req, res) {
  let Name = req.params.teamName;
  let i = teams.findIndex(item => {
    return item.Name === Name;
  });
  if (i == -1) res.status(400).send('Error: No team found');
  else {
    res.status(200).send(JSON.stringify(teams[i], null, 2));
  }
});

app.put('/update/:teamName', function(req, res) {
  let Name = req.params.teamName;
  let i = teams.findIndex(item => {
    return item.Name === Name;
  });
  if (i == -1) {
    res.status(400).send('Error: No team found');
  } else {
    teams[i].Name = Name;
  }
});

app.put('/update/:teamName/matches', function(req, res) {
  let Name = req.params.teamName;
  let i = teams.findIndex(item => {
    return item.Name === Name;
  });
  if (i == -1) {
    res.status(400).send('Error: No team found');
  } else {
    match = req.body;
    teams[i].matches.push(match);
    res.status(200).send('Ok');
  }
});

//debug
app.get('/teams', function(req, res) {
  for (var x in teams) {
    console.log(teams[x]);
  }
  res.status(200).send('Ok');
});
