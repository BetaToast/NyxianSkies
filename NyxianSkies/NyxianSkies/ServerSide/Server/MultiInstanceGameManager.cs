using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using NyxianSkies.ServerSide.GameInstance;


namespace NyxianSkies.ServerSide.Server
{
    public class MultiInstanceGameManager
    {
        private static readonly Lazy<MultiInstanceGameManager> _instance = new Lazy<MultiInstanceGameManager>();

        public static MultiInstanceGameManager Instance
        {
            get { return _instance.Value; }
        }

        private readonly IHubContext hub = GlobalHost.ConnectionManager.GetHubContext<MainHub>();

        private readonly ConcurrentDictionary<Guid, MessageBaseGame> _Games =
            new ConcurrentDictionary<Guid, MessageBaseGame>();

        public MultiInstanceGameManager()
        {
            Task.Run(() => StatsBroadcast());
        }

        private void StatsBroadcast()
        {
            while (true)
            {
                SendGameStatsToClients();

                Thread.Sleep(10000);
            }
        }

        private void SendGameStatsToClients()
        {
            int GamesWaitingForPlayers = _Games.Count(c => c.Value.AwaitingPlayers);
            int TotalGames = _Games.Count();
            hub.Clients.All.UpdatedGameStats(GamesWaitingForPlayers, TotalGames);
        }

        public void SendAction(object action)
        {
            //Clean up all games that are over
            foreach (var a in _Games.Where(c => c.Value.GameOver).Select(c => c.Key).ToList())
            {
                MessageBaseGame b;
                _Games.TryRemove(a, out b);
            }

            if (action is StartGame)
            {
                //CreateGame();
            }
            else if (action is JoinGame)
            {
                JoinGame((JoinGame)action);
            }
            else if (action is JoinSinglePlayerGame)
            {
                JoinSinglePlayerGame((JoinSinglePlayerGame)action);
            }
            else if (action is ClientDisconnect)
            {
                //For all games this connection is part of, send this action.
                foreach (var a in _Games.Values)
                    a.ActionQueue.Enqueue((IActions)action);
            }
            else if (action is IGameActions && _Games.ContainsKey(((IGameActions)action).GameId))
            {
                var game = _Games[((IGameActions)action).GameId];
                game.ActionQueue.Enqueue((IGameActions)action);
            }
        }

        private void JoinGame(JoinGame managerActionJoin)
        {
            lock (_Games)
            {
                if (!_Games.Any(c => c.Value.AwaitingPlayers))
                {
                    CreateGame();
                }

                var a = _Games.FirstOrDefault(c => c.Value.AwaitingPlayers).Value;
                a.ActionQueue.Enqueue(managerActionJoin);
            }
        }

        private void JoinSinglePlayerGame(JoinSinglePlayerGame action)
        {
            lock (_Games)
            {
                var game = CreateGame();
                game.ActionQueue.Enqueue(new JoinGame()
                {
                    GameId = game.GameId,
                    PlayerId = action.PlayerId
                });

                Guid playerId = Guid.NewGuid();
                game.ActionQueue.Enqueue(new JoinGame()
                {
                    GameId = game.GameId,
                    PlayerId = playerId,
                    IsBot = true
                });
                game.ActionQueue.Enqueue(new ClientDisconnect()
                {
                    PlayerId = playerId
                });
            }
        }

        private NyxianSkiesGameInstance CreateGame()
        {
            //In the future, we could make this method take a gameType (or figure it out some how) that way it can start any game type
            var i = new NyxianSkiesGameInstance();
            _Games.GetOrAdd(i.GameId, i);
            SendGameStatsToClients();
            return i;
        }
    }
}