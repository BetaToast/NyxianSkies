using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using NyxianSkies.ServerSide.GameInstance.Actions;
using NyxianSkies.ServerSide.Server;

namespace NyxianSkies.ServerSide.GameInstance
{
    public class NyxianSkiesGameInstance : MessageBaseGame
    {

        private List<Map> maps = new List<Map>();


        public NyxianSkiesGameInstance(int numberOfPlayers)
            : base(numberOfPlayers)
        {
            LoadMap();
        }

        public async Task HandleAction(IJoinGame joinGame)
        {
            //This seems like it should be handled by the base class
            {
                if (_myPlayers.ContainsKey(joinGame.PlayerId)) return;
                var player = new Player(joinGame.PlayerId);
                _myPlayers.TryAdd(player.PlayerId, player);
                await hub.Groups.Add(joinGame.PlayerId.ToString(), GameId.ToString());
                hub.Clients.Client(joinGame.PlayerId.ToString()).JoinedGame(GameId);
            }

            StartGameCheck();
        }

        public async Task HandleAction(ClientDisconnect disconnect)
        {
            //TODO:  What shall we do whena player disconnects
        }

        public async Task HandleAction(StartGame startGame)
        {
            IsStarted = true;

            foreach (var p in _myPlayers)
            {
                p.Value.LoadingLevel = "Earth";
                p.Value.Ready = false;
            }

            hub.Clients.Group(GameId.ToString()).LoadLevel("Earth");

        }

        public async Task HandleAction(StartLevel startLevel)
        {
            GameTime.Start();

            foreach (var p in _myPlayers.Values)
            {
                p.Position = new Vector2(1280 / 3, 700);
                p.Velocity = new Point(0, 0);
                hub.Clients.Client(p.PlayerId.ToString()).ShipPostionUpdate(p.PlayerId, p.Position, p.Velocity);
            }
        }

        public async Task HandleAction(MapLoadedAndReady playerReady)
        {
            foreach (var p in _myPlayers.Where(c => c.Value.PlayerId == playerReady.PlayerId).Select(c => c.Value))
            {
                p.LoadingLevel = string.Empty;
                p.Ready = true;
            }

            if (_myPlayers.All(c => c.Value.Ready))
            {
                hub.Clients.Group(GameId.ToString()).StartLevel("Earth");
                Enqueue(new StartLevel { Level = "Earth" });
            }
        }

        public async Task HandleAction(MoveStop stopPlayer)
        {
            if (_myPlayers.ContainsKey(stopPlayer.PlayerId))
                _myPlayers[stopPlayer.PlayerId].Velocity = new Point(0, 0);
        }

        public async Task HandleAction(MoveStart startPlayer)
        {
            if (_myPlayers.ContainsKey(startPlayer.PlayerId))
            {
                _myPlayers[startPlayer.PlayerId].Velocity = startPlayer.Direction;
            }

        }
        private void StartGameCheck()
        {
            if (_myPlayers.Count == NumberOfPlayers)
            {
                Enqueue(new StartGame());
            }
        }

        private void LoadMap()
        {
            var s = HttpContext.Current.Server.MapPath(@"~\assets\maps\Earth.json");
            var mapfile = System.IO.File.ReadAllText(s);

            var map = JsonConvert.DeserializeObject<Map>(mapfile);
            maps.Add(map);
        }

        protected override void UpdateGame(long elapsedTime)
        {
            //TODO:  Ok, great..  We have started a level...
            //  lets figure out how to actually do something.
            //  You can do this Xeno.  Everything is ready to go.
            //  Perhaps send a message to the clients letting them know where there ships are?
            //     --Past Xeno


            float speed = ((1280 / 3f) / 1000f) * elapsedTime;
            foreach (var player in _myPlayers.Values.Where(player => player.Velocity.X != 0 || player.Velocity.Y != 0))
            {
                player.Position = new Vector2(
                    player.Position.X + player.Velocity.X * speed
                    , player.Position.Y + player.Velocity.Y * speed
                );
                hub.Clients.Client(player.PlayerId.ToString())
                    .ShipPostionUpdate(player.PlayerId, player.Position, player.Velocity);
            }
        }
    }
}