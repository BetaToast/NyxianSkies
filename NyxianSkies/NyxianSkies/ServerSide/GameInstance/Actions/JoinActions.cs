using System;

namespace NyxianSkies.ServerSide.GameInstance.Actions
{
    public interface IJoinGame : IPlayerAction
    {
        //ShipType Ship { get; set; }
        int Ship { get; set; }
    }

    public class JoinMultiPlayerGame : IJoinGame
    {
        //public ShipType Ship { get; set; }
        public Guid PlayerId { get; set; }
        public int Ship { get; set; }
    }

    public class JoinSinglePlayerGame : IJoinGame
    {
        //public ShipType Ship { get; set; }
        public Guid PlayerId { get; set; }
        public int Ship { get; set; }
    }
}