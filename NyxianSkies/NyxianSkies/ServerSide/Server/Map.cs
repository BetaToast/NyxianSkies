using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using NSEdit.Models;

namespace NyxianSkies.ServerSide.Server
{
    internal class Map
    {
        public string Name;
        [JsonConverter(typeof(StringEnumConverter))]
        public Direction Direction;
        public int Width;
        public int Height;

        public List<GameObject> GameObjects = new List<GameObject>();
    }

    internal class GameObject
    {
        public GameObjectType Type;
        public dPoint Location = new dPoint();

        public double X
        {
            get { return Location.X; }
            set { Location.X = value; }
        }
        public double Y
        {
            get { return Location.Y; }
            set { Location.Y = value; }
        }
    }

    internal class dPoint
    {
        public double X;
        public double Y;
    }

    internal enum Direction
    {
        Vertical,
        Horizontal
    }
}