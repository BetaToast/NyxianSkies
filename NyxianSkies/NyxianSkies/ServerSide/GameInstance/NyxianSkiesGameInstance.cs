using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using NyxianSkies.ServerSide.Server;

namespace NyxianSkies.ServerSide.GameInstance
{
    public class NyxianSkiesGameInstance : MessageBaseGame
    {
        private readonly ConcurrentDictionary<Guid, Player> myPlayers = new ConcurrentDictionary<Guid, Player>();
        private readonly List<IActions> allGameActions = new List<IActions>();

        internal override async void ProcessAction(IActions playerAction)
        {
            allGameActions.Add(playerAction);
            await ((dynamic)this).HandleAction((dynamic)playerAction);
        }


    }
}