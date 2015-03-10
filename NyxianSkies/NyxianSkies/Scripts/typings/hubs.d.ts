// Get signalr.d.ts.ts from https://github.com/borisyankov/DefinitelyTyped (or delete the reference)
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
      * Set this function with a "function(id : number, version : string){}" to receive the "pong" message from the MainHub hub.
      * Contract Documentation: ---
      * @param id {number} 
      * @param version {string} 
      * @return {void}
      */
    pong : (id : number, version : string) => void;
 
    /**
      * Set this function with a "function(connectionId : string){}" to receive the "yourPlayerId" message from the MainHub hub.
      * Contract Documentation: ---
      * @param connectionId {string} 
      * @return {void}
      */
    yourPlayerId : (connectionId : string) => void;
 
    /**
      * Set this function with a "function(LevelName : string){}" to receive the "loadLevel" message from the MainHub hub.
      * Contract Documentation: ---
      * @param LevelName {string} 
      * @return {void}
      */
    loadLevel : (LevelName : string) => void;
 
    /**
      * Set this function with a "function(GameId : Guid, PlayerId : Guid){}" to receive the "joinedGame" message from the MainHub hub.
      * Contract Documentation: ---
      * @param GameId {Guid} 
      * @param PlayerId {Guid} 
      * @return {void}
      */
    joinedGame : (GameId : Guid, PlayerId : Guid) => void;
 
    /**
      * Set this function with a "function(PlayerId : Guid, Postion : Vector2, velocity : Point){}" to receive the "shipPostionUpdate" message from the MainHub hub.
      * Contract Documentation: ---
      * @param PlayerId {Guid} 
      * @param Postion {Vector2} 
      * @param velocity {Point} 
      * @return {void}
      */
    shipPostionUpdate : (PlayerId : Guid, Postion : Vector2, velocity : Point) => void;
}
 
//#endregion MainHub hub
 
//#endregion service contracts
 
 
 
////////////////////
// Data Contracts //
////////////////////
//#region data contracts
 
 
/**
  * Data contract for System.Drawing.Point
  */
interface Point {
    IsEmpty : boolean;
    X : number;
    Y : number;
}
 
 
/**
  * Data contract for NyxianSkies.ServerSide.GameInstance.Vector2
  */
interface Vector2 {
    X : number;
    Y : number;
}
 
 
/**
  * Data contract for System.Guid
  */
interface Guid {
}
 
//#endregion data contracts
 
