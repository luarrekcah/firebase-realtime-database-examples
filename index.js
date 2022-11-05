/**
 * @author luarrekcah
 * Follow me on github!
 */

// requires functions
const { pushUserData, getAllUsers } = require('./database/user');

// Just to initialize firebase
require('./database');

/**
 * Main file to test firebase functions located in path ./database (NOT ./database.js)
 * 
 * Obs: All the functions returns/log data.
 **/ 

//pushUserData('raulrodrigues', 'raul@gmail.com', 'pfpURL');

getAllUsers();
