using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using NyxianSkies.ServerSide.GameInstance;
using NyxianSkies.ServerSide.GameInstance.Actions;


namespace NyxianSkies.ServerSide.Server
{
    public class MultiInstanceGameManager
    {
        private static readonly Lazy<MultiInstanceGameManager> InstanceManager = new Lazy<MultiInstanceGameManager>();

        public static MultiInstanceGameManager Instance
        {
            get { return InstanceManager.Value; }
        }

        private readonly IHubContext _hub = GlobalHost.ConnectionManager.GetHubContext<MainHub>();

        private readonly ConcurrentDictionary<Guid, MessageBaseGame> _games =
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
            // ReSharper disable once FunctionNeverReturns
        }

        private void SendGameStatsToClients()
        {
            var gamesWaitingForPlayers = _games.Count(c => c.Value.AwaitingPlayers);
            var totalGames = _games.Count();
            _hub.Clients.All.UpdatedGameStats(gamesWaitingForPlayers, totalGames);
        }

        public void SendAction(object action)
        {
            //Clean up all games that are over
            foreach (var a in _games.Where(c => c.Value.GameOver).Select(c => c.Key).ToList())
            {
                MessageBaseGame b;
                _games.TryRemove(a, out b);
            }

            if (action is JoinMultiPlayerGame)
            {
                JoinMultiPlayerGame((JoinMultiPlayerGame)action);
            }
            else if (action is JoinSinglePlayerGame)
            {
                JoinSinglePlayerGame((JoinSinglePlayerGame)action);
            }
            else if (action is ClientDisconnect)
            {
                //For all games this connection is part of, send this action.
                foreach (var a in _games.Values)
                    a.Enqueue((IAction)action);
            }
            else if (action is IGameAction && _games.ContainsKey(((IGameAction)action).GameId))
            {
                var game = _games[((IGameAction)action).GameId];
                game.Enqueue((IGameAction)action);
            }
        }

        private void JoinMultiPlayerGame(JoinMultiPlayerGame managerActionJoin)
        {
            lock (_games)
            {
                if (!_games.Any(c => c.Value.AwaitingPlayers))
                {
                    CreateGame(true);
                }

                var a = _games.FirstOrDefault(c => c.Value.AwaitingPlayers).Value;
                a.Enqueue(managerActionJoin);
            }
        }

        private void JoinSinglePlayerGame(JoinSinglePlayerGame action)
        {
            lock (_games)
            {
                var game = CreateGame(false);
                game.Enqueue(action);
            }
        }

        private NyxianSkiesGameInstance CreateGame(Boolean isMultiPlayer)
        {
            var i = new NyxianSkiesGameInstance(isMultiPlayer ? 2 : 1);
            _games.GetOrAdd(i.GameId, i);
            SendGameStatsToClients();
            return i;
        }
    }
}