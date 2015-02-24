using System;

namespace NyxianSkies.ServerSide.GameInstance.Actions
{
    public interface IJoinGame : IPlayerAction
    {
        String PlayerAddress { get; set; }
        ShipType Ship { get; set; }
    }

    public class JoinMultiPlayerGame : IJoinGame
    {
        public String PlayerAddress { get; set; }
        public ShipType Ship { get; set; }
        public Int64 PlayerId { get; set; }
    }

    public class JoinSinglePlayerGame : IJoinGame
    {
        public String PlayerAddress { get; set; }
        public ShipType Ship { get; set; }
        public Int64 PlayerId { get; set; }
    }
}