using System;
using System.Drawing;

namespace NyxianSkies.ServerSide.GameInstance.Actions
{
    public class Move : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public Point Direction { get; set; }
    }
    public class MoveStart : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public Point Direction { get; set; }
    }
    public class MoveStop : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
    }
}