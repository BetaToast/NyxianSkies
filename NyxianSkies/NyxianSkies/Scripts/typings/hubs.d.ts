﻿// Get signalr.d.ts.ts from https://github.com/borisyankov/DefinitelyTyped (or delete the reference)
/// <reference path="signalr/signalr.d.ts" />
/// <reference path="jquery/jquery.d.ts" />
 
////////////////////
// available hubs //
////////////////////
//#region available hubs
 
interface SignalR {
 
    /**
      * The hub implemented by NyxianSkies.ServerSide.Server.MainHub
      */
    mainHub : MainHub;
}
//#endregion available hubs
 
///////////////////////
// Service Contracts //
///////////////////////
//#region service contracts
 
//#region MainHub hub
 
interface MainHub {
    
    /**
      * This property lets you send messages to the MainHub hub.
      */
    server : MainHubServer;
 
    /**
      * The functions on this property should be replaced if you want to receive messages from the MainHub hub.
      */
    client : MainHubClient;
}
 
interface MainHubServer {
 
    /** 
      * Sends a "sendAction" message to the MainHub hub.
      * Contract Documentation: ---
      * @param jsonActionBatch {string} 
      * @return {JQueryPromise of void}
      */
    sendAction(jsonActionBatch : string) : JQueryPromise<void>;
}
 
interface MainHubClient
{
 
    /**
      * Set this function with a "function(connectionId : string){}" to receive the "yourPlayerId" message from the MainHub hub.
      * Contract Documentation: ---
      * @param connectionId {string} 
      * @return {void}
      */
    yourPlayerId : (connectionId : string) => void;
 
    /**
      * Set this function with a "function(id : number){}" to receive the "pong" message from the MainHub hub.
      * Contract Documentation: ---
      * @param id {number} 
      * @return {void}
      */
    pong : (id : number) => void;
}
 
//#endregion MainHub hub
 
//#endregion service contracts
 
 
 
////////////////////
// Data Contracts //
////////////////////
//#region data contracts
 
//#endregion data contracts
 