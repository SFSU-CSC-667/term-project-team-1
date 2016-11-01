/**
 * Author:      Jose Ortiz
 * File:        LobbyModel.js
 * Date:        Thursday October 27, 2016
 * Description: This class is a lobby model that handles abstractly all the attributes
 *             and values from the user entity.
 *
 */

"use strict";
let DatabaseManager = require('../dbManager.js');

class LobbyModel extends DatabaseManager {
    constructor(userID)
    {
        super();
        this._user = userID;
    }

    private loadLobby (userId)
    {
        var db = super.connectWithPromise();

    }


}
