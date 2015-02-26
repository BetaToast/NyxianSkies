using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
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
        private readonly List<JoinMultiPlayerGame> waittingLobby = new List<JoinMultiPlayerGame>();


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
            var gamesWaitingForPlayers = waittingLobby.Count();
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

                lock (waittingLobby)
                {
                    waittingLobby.RemoveAll(
                        c => c.PlayerAddress == ((ClientDisconnect)action).PlayerAddress
                        );
                }
            }
            else if (action is IGameAction && _games.ContainsKey(((IGameAction)action).GameId))
            {
                var game = _games[((IGameAction)action).GameId];
                game.Enqueue((IGameAction)action);
            }
        }

        private void JoinMultiPlayerGame(JoinMultiPlayerGame managerActionJoin)
        {
            lock (waittingLobby)
            {
                if (waittingLobby.Count > 0)
                {
                    var game = CreateGame(true);
                    var player1 = waittingLobby.First();
                    game.Enqueue(player1);
                    waittingLobby.Remove(player1);
                    game.Enqueue(managerActionJoin);
                }
                else
                {
                    waittingLobby.Add(managerActionJoin);
                }
            }
        }

        private void JoinSinglePlayerGame(JoinSinglePlayerGame action)
        {
            var game = CreateGame(false);
            game.Enqueue(action);
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