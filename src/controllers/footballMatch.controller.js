const FootballMatch = require("../models/footballMatch.schema");

const createMatch = function(req, res, next) {
  const match = new FootballMatch(req.body);

  match.save(function(err) {
    if (err) {
      next(err);
    } else {
      res.json(match);
    }
  });
};

const updateMatch = function(req, res, next) {
  FootballMatch.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    function(err, match) {
      if (err) {
        next(err);
      } else {
        res.json(match);
      }
    }
  );
};

const deleteMatch = function(req, res, next) {
  req.match.remove(function(err) {
    if (err) {
      next(err);
    } else {
      res.json(req.match);
    }
  });
};

const getAllMatches = function(req, res, next) {
  FootballMatch.find(function(err, matchs) {
    if (err) {
      next(err);
    } else {
      res.json(matchs);
    }
  });
};

const getOneMatch = function(req, res) {
  res.json(req.match);
};

const getByIdMatch = function(req, res, next, id) {
  FootballMatch.findOne({ _id: id }, function(err, match) {
    if (err) {
      next(err);
    } else {
      req.match = match;
      next();
    }
  });
};

module.exports.createMatch = createMatch;
module.exports.updateMatch = updateMatch;
module.exports.deleteMatch = deleteMatch;
module.exports.getAllMatches = getAllMatches;
module.exports.getOneMatch = getOneMatch;
module.exports.getByIdMatch = getByIdMatch;
