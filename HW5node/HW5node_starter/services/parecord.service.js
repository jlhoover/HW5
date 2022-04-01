const db = require('../_helpers/database');
const PArecord = db.PArecord;
const User = db.User;
module.exports = {
    getAllPArecords,
    addPArecord,
    deletePArecord
}

//TODO: DONE write the necessary functions that will address the needs of parecord.controller. Hint: look at the signatures in the module.exports.
// Hint2: look at user.service to see how you can interact with the database. Hint3: look at the class material.
async function getAllPArecords() {
    return await PArecord.find().select('-hash');
}
async function deletePArecord(date, username) {
    // validate
    if (await PArecord.findOne({ createdBy: username, createdDate: date  })) {
        console.log ("Found record, delete it");
        await PArecord.deleteOne({ createdBy: username, createdDate: date  });
    }
    else {
        throw 'Could not delete - wrong user !!';
    }
}
async function addPArecord(parecord, username) {
    // validate
    if (await PArecord.findOne({ createdBy: username, createdDate: parecord.createdDate  })) {
        throw 'Parecord created by"' + parecord.createdBy +" on "+ parecord.createdDate +'" already exists';
    }
    else if(!username){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }
    //populate missing fields in the parecord object
    const user = await User.findOne({ _id: username });
    console.log ('Add PA record User NAME of ' + user.username);
    let newrecord = parecord;
    parecord.createdBy = username;
    parecord.createdDate =  Date.now();
    parecord.createdName = user.username;
    let dbrecord = new PArecord(newrecord);
    // save the record
    await dbrecord.save();
    console.log("Record saved");
}