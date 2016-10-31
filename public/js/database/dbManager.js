/**
 * Author:      Jose Ortiz
 * Date:        Thursday October 27, 2016
 * Description: This class is handles the connection to the database.
 *
 */
"use strict";
let connection;
let globals = require('../config/globals'); // gets config constants
let user = require('../core/User.js');

class DatabaseManager {

    constructor() {
        this._databaseProvider = globals.DATABASE_PROVIDER;
        this._databaseUsername = globals.DATABASE_USERNAME;
        this._databasePassword = globals.DATABASE_PASSWORD;
        this._databaseURL = globals.DATABASE_URL;
        this._databaseName = globals.DATABASE_NAME;
        // saves the connection
        this._databaseConnectionUrl = this._databaseProvider + this._databaseUsername + ":" +
            this._databasePassword + this._databaseURL + this._databaseName

    }

    set databaseProvider(databaseProvider) {
        this._databaseProvider = databaseProvider
    }

    set databaseUsername(username) {
        return this._databaseUsername = username;
    }

    set databasePassword(password) {
        return this._databasePassword = password;
    }

    set databaseURL(url) {
        this._databaseURL = url
    }


    set databaseConnectionUrl(databaseConnectionUrl) {
        this._databaseConnectionUrl = databaseConnectionUrl;
    }

    set databaseName(databaseName) {
        this._databaseName = databaseName;
    }

    get isRemoteConnection() {
        return this._connectionMode;
    }

    /*
     *   Connects to database
     */
    connect() {


        var pg = require('pg');
        var databaseConnUrl = "";
        connection = new pg.Client(this._databaseConnectionUrl);
        connection.connect();
        return connection;
    }

    connectWithPromise ()
    {
        var pgp = require('pg-promise')();
        var db = pgp(this._databaseConnectionUrl);
        return db;

    }

    connect2 ()
    {
        const results = [];
        var pg = require('pg');
        // Get a Postgres client from the connection pool
        pg.connect(this._databaseConnectionUrl, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Select Data
            const query = client.query('SELECT * FROM users ORDER BY id ASC;');
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log(results.rows);
            });
        });
    }

    closeConnection() {
        connection.end();
    }
}

/* Don't comment or remove this line. This allows the global scope of this file */
module.exports = DatabaseManager;