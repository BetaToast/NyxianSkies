using System;

namespace NyxianSkies.ServerSide.GameInstance
{
    public class Player
    {
        public Guid PlayerId { get; private set; }
        public string PlayerName { get; set; }
        public bool Ready { get; set; }

        public Player(Guid playerAddress)
        {
            PlayerId = playerAddress;
        }
    }
}