using System;

namespace NyxianSkies.ServerSide.GameInstance
{
    public class Player
    {
        public Guid PlayerId { get; private set; }
        public String PlayerName { get; set; }
        public Boolean Ready { get; set; }

        public ShipType Ship { get; private set; }
        public decimal Health { get; private set; }
        public decimal HullShield { get; private set; }

        public string LoadingLevel { get; set; }
        public Player(Guid playerId)
        {
            PlayerId = playerId;
        }
    }
}