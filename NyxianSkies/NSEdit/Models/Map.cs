using System.Collections.Generic;

namespace NSEdit.Models
{
    public class Map
    {
        public string Name { get; set; }
        public string Direction { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string BGColor { get; set; }
        public string BGLayer1 { get; set; }
        public string BGLayer2 { get; set; }

        public List<GameObject> GameObjects { get; set; }

        public Map()
        {
            GameObjects = new List<GameObject>();
        }
    }
}