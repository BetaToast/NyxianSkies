using System;
using System.Drawing;

namespace NyxianSkies.ServerSide.Server
{
    public class Enemy
    {
        public Guid Id { get; private set; }
        public PointF Position { get; set; }
        public Point Velocity { get; set; }

        public RectangleF BoundingRectangle
        {
            get { return new RectangleF(Position, new SizeF(112, 75)); }
        }

    }
}