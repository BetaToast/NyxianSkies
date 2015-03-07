using Newtonsoft.Json;

namespace NSEdit.Models
{
    public class GameObject
    {
        public int Type { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        
        [JsonIgnore]
        public string Path { get; set; }

        public override string ToString()
        {
            return string.Format("[{0},{1}] {2}", X, Y, (GameObjectType) Type);
        }
    }
}