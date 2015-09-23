
var mongoose = require('mongoose'),
	Player = mongoose.model('Player'),
	Problem = mongoose.model('Problem');

exports.listPlayers = function(req, res){
	Player.find(function(err, players){
		if(err) console.log(err);

		res.json(players);
	});
}

exports.createPlayer = function(req, res){
	var pl = new Player(req.body);

	pl.save(function(err, fb){
		if(err) console.log(err);
		res.json(fb);
	});
}

exports.getPlayer = function(req, res){
	Player.find({mobile_id : req.params.id}, function(err, player){
		if(err) console.log(err);

		res.json(player);
	});
}

exports.removePlayer = function(req, res){
	Player.remove({mobile_id :  req.params.mobileId}, function(err, player){
		if(err) console.log(err);

		res.json(player);
	})
}

exports.listProblems = function(req, res){
	Problem.find(function(err, problems){
		if(err) console.log(err);

		res.json(problems);
	});
}

exports.getGps = function(req, res){
	Problem.find(req.params.gps, function(err, problem){
		if(err) console.log(err);

		res.json(problem);
	});
}

exports.getProblem = function(req, res){

	Problem.find({_id : req.params.id}, function(err, problem){
		if(err) console.log(err);

		res.json(problem);
	});	
}

exports.addProblem = function(req, res){

	var p = new Problem(req.body);

	p.save(function(err, problem){
		if(err) console.log(err);

		res.json(problem);
	});
}

exports.alterProblem = function(req, res){
	Problem.update({_id : req.params.id}, req.body, function(err, problem){
		
	});
}
