using System;

namespace NyxianSkies.ServerSide.GameInstance
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
        Guid PlayerId { get; set; }
    }

    public class ClientDisconnect : IPlayerAction
    {
        public Guid PlayerId { get; set; }
    }

    public interface IJoinGame : IPlayerAction { }

    public class JoinMultiPlayerGame : IJoinGame
    {
        public Guid PlayerId { get; set; }
        public bool IsBot { get; set; }
    }

    public class JoinSinglePlayerGame : IJoinGame
    {
        public Guid PlayerId { get; set; }
    }
}