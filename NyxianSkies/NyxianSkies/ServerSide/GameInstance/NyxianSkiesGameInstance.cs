using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using NyxianSkies.ServerSide.GameInstance.Actions;
using NyxianSkies.ServerSide.Server;

namespace NyxianSkies.ServerSide.GameInstance
{
    public class NyxianSkiesGameInstance : MessageBaseGame
    {
        private readonly ConcurrentDictionary<Int64, Player> _myPlayers = new ConcurrentDictionary<Int64, Player>();

        public NyxianSkiesGameInstance(int numberOfPlayers)
            : base(numberOfPlayers)
        {
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

        
    }
}