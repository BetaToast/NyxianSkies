using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using NyxianSkies.ServerSide.Server;

namespace NyxianSkies.ServerSide.GameInstance
{
    public class NyxianSkiesGameInstance : MessageBaseGame
    {
        private readonly ConcurrentDictionary<Guid, Player> _myPlayers = new ConcurrentDictionary<Guid, Player>();

        public async Task HandleAction(IJoinGame joinGame)
        {
            if (_myPlayers.ContainsKey(joinGame.PlayerId)) return;

            var player = new Player(joinGame.PlayerId);
            _myPlayers.TryAdd(player.PlayerId, player);
        }

        public async Task HandleAction(ClientDisconnect disconnect)
        {
            
        }

     
    }
}