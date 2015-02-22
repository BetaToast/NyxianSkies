using System;

namespace NyxianSkies.ServerSide.GameInstance
{
    public class Player
    {
        public Int64 PlayerId { get; private set; }
        public String PlayerName { get; set; }
        public Boolean Ready { get; set; }


        private String PlayerAddress { get; set; }

        public Player(long playerId, String playerAddress)
        {
            PlayerId = playerId;
            PlayerAddress = playerAddress;
        }
    }
}