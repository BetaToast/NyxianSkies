using System;


namespace NyxianSkies.ServerSide.GameInstance.Actions
{
    //Marker Interface for everything that needs to be deserialized from json
    public interface IAction { }

    //Actions that effect the game and not associated with a player
    public interface IGameAction : IAction
    {
        Guid GameId { get; set; }
    }

    //Actions that are specific to a player not related to a game
    public interface IPlayerAction : IAction
    {
        Int64 PlayerId { get; set; }
    }


}