using System;

namespace NyxianSkies.ServerSide.GameInstance.Actions
{
    public class StartGame : IAction { }

    public class StartLevel : IAction
    {
        public string Level { get; set; }
        public Guid GameId { get; set; }
    }
}