using System;
using System.Drawing;

namespace NyxianSkies.ServerSide.GameInstance
{
    internal class Bullet
    {
        public Int64 ObjectId { get; set; }
        public PointF Position { get; set; }
        public Point Velocity = new Point(0, -1);

        public RectangleF BoundingRectangle
        {
            get { return new RectangleF(Position, new SizeF(13, 13)); }
        }
    }
}