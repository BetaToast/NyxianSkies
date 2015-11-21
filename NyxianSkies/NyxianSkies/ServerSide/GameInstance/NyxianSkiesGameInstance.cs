using System;
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
        private List<Bullet> bullets = new List<Bullet>();

        public NyxianSkiesGameInstance(int numberOfPlayers)
            : base(numberOfPlayers)
        {
            LoadMap();
        }

        public async Task HandleAction(ClientDisconnect disconnect)
        {
            //TODO:  What shall we do whena player disconnects
        }

        public async Task HandleAction(IJoinGame joinGame)
        {
            //This seems like it should be handled by the base class
            {
                if (_myPlayers.ContainsKey(joinGame.PlayerId)) return;
                var player = new Player(joinGame.PlayerId, joinGame.Ship);
                _myPlayers.TryAdd(player.PlayerId, player);
                await hub.Groups.Add(joinGame.PlayerId.ToString(), GameId.ToString());
            }

            StartGameCheck();
        }

        private void StartGameCheck()
        {
            if (_myPlayers.Count == NumberOfPlayers)
            {
                Enqueue(new StartGame());
            }
        }

        public async Task HandleAction(StartGame startGame)
        {
            IsStarted = true;

            var i = 1;
            foreach (var p in _myPlayers)
            {
                p.Value.LoadingLevel = "Earth";
                p.Value.Ready = false;
                p.Value.Position = new PointF(i * (1280 / 3), 700);
                p.Value.Velocity = new Point(0, 0);
                i++;
            }

            hub.Clients.Group(GameId.ToString()).GameStart(GameId, _myPlayers.Values.ToList());
            hub.Clients.Group(GameId.ToString()).LoadLevel("Earth");
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
        public async Task HandleAction(StartLevel startLevel)
        {
            GameTime.Start();


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

        public async Task HandleAction(FirePrimaryWeapon weaponFired)
        {
            var bullet = new Bullet
            {
                ObjectId = weaponFired.ObjectId,
                Position = new PointF(weaponFired.StartLocationX, weaponFired.StartLocationY)
            };

            bullets.Add(bullet);
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
            var shipSpeed = ((1280 / 3f) / 1000f) * elapsedTime;
            var bulletSpeed = ((720 / 1f) / 1000f) * elapsedTime;
            foreach (var player in _myPlayers.Values.Where(player => player.Velocity.X != 0 || player.Velocity.Y != 0))
            {
                var newPosition = new PointF(player.Position.X + player.Velocity.X * shipSpeed, player.Position.Y + player.Velocity.Y * shipSpeed);
                if (newPosition.X < 0)
                    newPosition.X = 0;
                if (newPosition.X > 1280)
                    newPosition.X = 1280;
                if (newPosition.Y < 0)
                    newPosition.Y = 0;
                if (newPosition.Y > 720)
                    newPosition.Y = 720;

                if (!FreeFromCollisions(player, newPosition))
                    continue;
                player.Position = newPosition;
                player.HasUpdate = true;
            }

            foreach (var b in bullets)
            {
                var newPosition = new PointF(b.Position.X + b.Velocity.X * bulletSpeed, b.Position.Y + b.Velocity.Y * bulletSpeed);
                b.Position = newPosition;
                Enemy enemy;
                if (CheckForCollision(b, out enemy))
                {
                    //ok, we have a hit.

                }
            }

            bullets.RemoveAll(c => c.Position.Y < -256);
        }

        private bool CheckForCollision(Bullet bullet, out Enemy outEnemy)
        {
            outEnemy = null;
            var bulletLocation = bullet.BoundingRectangle;
            foreach (var enemy in _myEnemies.Select(c => c.Value).Where(enemy => enemy.BoundingRectangle.IntersectsWith(bulletLocation)))
            {
                outEnemy = enemy;
                return true;
            }
            return false;
        }

        private bool FreeFromCollisions(Player movingPlayer, PointF newPosition)
        {
            var newPostionRectangle = new RectangleF(newPosition, new SizeF(112, 75));
            foreach (var otherPlayer in _myPlayers.Where(c => c.Key != movingPlayer.PlayerId).Select(c => c.Value))
            {
                if (otherPlayer.BoundingRectangle.IntersectsWith(newPostionRectangle))
                    return false;
            }
            return true;
        }

        protected override void UpdateClients()
        {
            foreach (var player in _myPlayers.Values.Where(c => c.HasUpdate))
            {
                hub.Clients.Group(GameId.ToString()).ShipPostionUpdate(player.PlayerId, player.Position, player.Velocity, DateTime.UtcNow.ToUniversalTime().Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalMilliseconds);
                player.HasUpdate = false;
            }
        }
    }
}