using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using NyxianSkies.ServerSide.GameInstance.Actions;
using NyxianSkies.ServerSide.Server;

namespace NyxianSkies.ServerSide.GameInstance
{
    public class NyxianSkiesGameInstance : MessageBaseGame
    {
        private readonly ConcurrentDictionary<Int64, Player> _myPlayers = new ConcurrentDictionary<Int64, Player>();

        private List<Map> maps = new List<Map>();
        public NyxianSkiesGameInstance(int numberOfPlayers)
            : base(numberOfPlayers)
        {
            LoadMap();
        }

        public async Task HandleAction(IJoinGame joinGame)
        {
            if (_myPlayers.ContainsKey(joinGame.PlayerId)) return;

            var player = new Player(joinGame.PlayerId, joinGame.PlayerAddress);
            _myPlayers.TryAdd(player.PlayerId, player);
        }

        public async Task HandleAction(ClientDisconnect disconnect)
        {
            //TODO:  What shall we do whena player disconnects
        }

        private void LoadMap()
        {
            var s = HttpContext.Current.Server.MapPath(@"~\assets\maps\Earth.json");
            var mapfile = System.IO.File.ReadAllText(s);

            var map = JsonConvert.DeserializeObject<Map>(mapfile);
            maps.Add(map);
        }

    }
}