using System;
using System.Drawing;

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
        public Vector2 Position { get; set; }
        public Point Velocity { get; set; }

        public Player(Guid playerId)
        {
            PlayerId = playerId;
        }
    }

    public class Vector2
    {
        public Vector2(float x, float y)
        {
            X = x;
            Y = y;
        }

        public float X { get; set; }
        public float Y { get; set; }
    }
}