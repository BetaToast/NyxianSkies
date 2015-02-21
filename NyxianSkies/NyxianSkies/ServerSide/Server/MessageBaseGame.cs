using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using NyxianSkies.ServerSide.GameInstance;


namespace NyxianSkies.ServerSide.Server
{
    public abstract class MessageBaseGame
    {
        public Guid GameId { get; private set; }
        public bool IsStarted { get; set; }
        public bool GameOver { get; set; }
        public bool AwaitingPlayers { get; protected set; }

        public ConcurrentQueue<IActions> ActionQueue = new ConcurrentQueue<IActions>();

        private Stopwatch GameTime = new Stopwatch();
        protected readonly IHubContext hub = GlobalHost.ConnectionManager.GetHubContext<MainHub>();

        protected MessageBaseGame()
        {
            GameId = Guid.NewGuid();
            AwaitingPlayers = true;
            Task.Run(() => GameLoop());
        }

        private void GameLoop()
        {
            while (true)
            {
                GameTime.Stop();

                //Process New Events
                IGameActions ge;


                //Do game actions
                IActions ga;
                if (ActionQueue.TryDequeue(out ga))
                {
                    //Do something with the event
                    ProcessAction(ga);

                    //Then start loop over
                    Thread.Sleep(10);
                    continue;
                }
                //Then start loop over

                //Validate Actions
                //For each new event added, restart loop

                //if nothing was done, just sleep.
                GameTime.Start();
                if (GameTime.Elapsed.TotalMinutes >= 10 || GameOver)
                    return;
                Thread.Sleep(100);
            }
        }

        internal abstract void ProcessAction(IActions playerAction);
    }
}