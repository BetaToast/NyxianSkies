using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
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
        private readonly List<LoggedAction> _allGameActions = new List<LoggedAction>();
        private ConcurrentQueue<IAction> ActionQueue = new ConcurrentQueue<IAction>();
        private Stopwatch GameTime = new Stopwatch();

        protected MessageBaseGame(int numberOfPlayers)
        {
            GameId = Guid.NewGuid();
            //AwaitingPlayers = true;
            NumberOfPlayers = numberOfPlayers;
            Task.Run(() => GameLoop());
        }

        private void GameLoop()
        {
            while (true)
            {
                GameTime.Stop();

                //Do game actions
                IAction ga;
                if (ActionQueue.TryDequeue(out ga))
                {

                    //Do something with the event
                    _processAction(ga);

                    //Then start loop over
                    GameTime.Start();
                    Thread.Sleep(0);
                    GameTime.Stop();
                    continue;
                }
                //Then start loop over

                //if nothing was done, just sleep.
                GameTime.Start();
                if (GameTime.Elapsed.TotalMinutes >= 10 || GameOver)
                    return;
                Thread.Sleep(0);
            }
        }

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