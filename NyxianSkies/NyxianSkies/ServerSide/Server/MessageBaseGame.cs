﻿using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using NyxianSkies.ServerSide.GameInstance;
using NyxianSkies.ServerSide.GameInstance.Actions;


namespace NyxianSkies.ServerSide.Server
{
    public abstract class MessageBaseGame
    {
        public Guid GameId { get; private set; }
        public Boolean IsStarted { get; set; }
        public Boolean GameOver { get; set; }
        //public Boolean AwaitingPlayers { get; protected set; }

        protected long CurrentGameTime { get { return GameTime.ElapsedMilliseconds; } }

        protected readonly IHubContext hub = GlobalHost.ConnectionManager.GetHubContext<MainHub>();

        protected readonly int NumberOfPlayers;
        protected readonly ConcurrentDictionary<Guid, Player> _myPlayers = new ConcurrentDictionary<Guid, Player>();
        protected readonly ConcurrentDictionary<Guid, Enemy> _myEnemies = new ConcurrentDictionary<Guid, Enemy>();

        private readonly List<LoggedAction> _allGameActions = new List<LoggedAction>();
        private ConcurrentQueue<IAction> ActionQueue = new ConcurrentQueue<IAction>();
        protected Stopwatch GameTime = new Stopwatch();

        private Int64 previousMilliseconds = 0;
        private Int64 previousClientUpdateMilliseconds = 0;

        protected MessageBaseGame(int numberOfPlayers)
        {
            GameId = Guid.NewGuid();
            //AwaitingPlayers = true;
            NumberOfPlayers = numberOfPlayers;
            for (int x = 0; x < 100; x++)
            {
                var g = Guid.NewGuid();
                _myEnemies.TryAdd(g, new Enemy { Id = g, Position = new PointF(100, 100), Velocity = new Point(0, 0) });
            }
            Task.Run(() => GameLoop());
        }


        private void GameLoop()
        {
            while (true)
            {
                //Get Inputs
                IAction ga;
                if (ActionQueue.TryDequeue(out ga))
                {

                    //Do something with the event
                    _processAction(ga);

                    //Then start loop over
                    Thread.Sleep(0);
                    continue;
                }

                var elapsedTime = CurrentGameTime - previousMilliseconds;
                previousMilliseconds = CurrentGameTime;

                //Update Game
                UpdateGame(elapsedTime);

#if(DEBUG)
                const int minimumUpdateTime = 150;
#else
                const int minimumUpdateTime = 35;
#endif
                if (CurrentGameTime - previousClientUpdateMilliseconds > minimumUpdateTime)
                {
                    UpdateClients();
                    previousClientUpdateMilliseconds = CurrentGameTime;
                }

                if (GameTime.Elapsed.TotalMinutes >= 10 || GameOver)
                    return;
                Thread.Sleep(1);
            }
        }

        protected abstract void UpdateClients();

        protected abstract void UpdateGame(long elapsedTime);

        private void _processAction(IAction action)
        {
            _allGameActions.Add(new LoggedAction(CurrentGameTime, action));
            ProcessAction(action);
        }

        //internal abstract void ProcessAction(IAction playerAction);
        internal async void ProcessAction(IAction playerAction)
        {
            await ((dynamic)this).HandleAction((dynamic)playerAction);
        }

        public void Enqueue(IAction action)
        {
            ActionQueue.Enqueue(action);
        }

    }
}