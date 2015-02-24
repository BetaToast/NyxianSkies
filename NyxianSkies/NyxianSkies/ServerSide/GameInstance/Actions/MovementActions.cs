using System;

namespace NyxianSkies.ServerSide.GameInstance.Actions
{
    public class MoveUp : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveUpStart : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveUpStop : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveRight : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveRightStart : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveRightStop : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveDown : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveDownStart : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveDownStop : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveLeft : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveLeftStart : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
    public class MoveLeftStop : IGameAction, IPlayerAction
    {
        public Guid GameId { get; set; }
        public long PlayerId { get; set; }
    }
}