using System;
using System.Drawing;

namespace NyxianSkies.ServerSide.GameInstance
{
    public class Player
    {

        public Guid PlayerId { get; private set; }
        public String PlayerName { get; set; }
        public Boolean Ready { get; set; }

        public int Ship { get; private set; }
        public decimal Health { get; private set; }
        public decimal HullShield { get; private set; }

        public string LoadingLevel { get; set; }
        public PointF Position { get; set; }
        public Point Velocity { get; set; }
        public bool HasUpdate { get; set; }

        //97-112x75
        public RectangleF BoundingRectangle
        {
            get { return new RectangleF(Position, new SizeF(112, 75)); }
        }

        public Player(Guid playerId, int ship)
        {
            PlayerId = playerId;
            Ship = ship;
        }
    }

}