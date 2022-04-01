const parecordService = require('../services/parecord.service')
const userService = require("../services/user.service");
module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord
};

function createPArecord(req, res, next) {
    //TODO: DONE via parecordSerice you should add a PA record and respond to the client confirming that the record was successfully added.
    console.log(req.body);
    console.log(req.user);
    let userInfo = JSON.parse(JSON.stringify(req.user));
    let user = userInfo['sub'];
    console.log('My Create PA Record By: ' + user);
    parecordService.addPArecord(req.body, user)
        .then(parecord => res.json(parecord))
        .catch(err => next(err));
}
function getPArecords(req,res,next){
//TODO: DONE return all parecords from the database and send to the client.
    parecordService.getAllPArecords()
        .then(parecords => res.json(parecords))
        .catch(err => next(err));
}

function deletePArecord(req,res,next){
//TODO: DONE delete parecord from the database and respond to the client by conforming the action.
    console.log (req.params.date);
    let userInfo = JSON.parse(JSON.stringify(req.user));
    let user = userInfo['sub'];
    console.log('Delete record for: ' + req.params.date + ' User: ' + user);
    parecordService.deletePArecord(req.params.date, user)
        .then(parecord => res.json(parecord))
        .catch(err => next(err));
}