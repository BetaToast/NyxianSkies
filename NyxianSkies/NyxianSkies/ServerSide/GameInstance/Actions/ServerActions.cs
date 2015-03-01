

using System;

namespace NyxianSkies.ServerSide.GameInstance.Actions
{

    public class PingServer : IAction
    {
        public long ID { get; set; }
    }
    public class PingGame : IGameAction
    {
        public Guid GameId { get; set; }
        public string ID { get; set; }
    }
    public class ClientDisconnect : IAction
    {
        public String PlayerAddress { get; set; }
    }

    public class MapLoadedAndReady : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
    }
}