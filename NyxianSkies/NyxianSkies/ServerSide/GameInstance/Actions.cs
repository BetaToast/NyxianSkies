using System;

namespace NyxianSkies.ServerSide.GameInstance
{
    //Marker Interface for everything that needs to be deserialized from json
    public interface IActions
    {
    }

    public interface IGameActions : IActions
    {
        Guid GameId { get; set; }
    }

    public interface IPlayerActions : IActions
    {
        Guid PlayerId { get; set; }
    }

    public class StartGame : IGameActions
    {
        public Guid GameId { get; set; }
    }

    public class ClientConnection : IPlayerActions
    {
        public Guid PlayerId { get; set; }
    }

    public class ClientDisconnect : IPlayerActions
    {
        public Guid PlayerId { get; set; }
    }

    public class JoinGame : IGameActions, IPlayerActions
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public bool IsBot { get; set; }
    }

    public class JoinSinglePlayerGame : IGameActions, IPlayerActions
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
    }
}