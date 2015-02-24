

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
    public class ClientDisconnect : IPlayerAction
    {
        public Int64 PlayerId { get; set; }
    }

}