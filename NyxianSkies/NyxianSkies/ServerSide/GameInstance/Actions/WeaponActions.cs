using System;

namespace NyxianSkies.ServerSide.GameInstance.Actions
{
    public class FirePrimaryWeapon : IPlayerAction, IGameAction
    {
        public long PlayerId { get; set; }
        public Guid GameId { get; set; }
    }

    public class FirePrimaryWeaponStart : IPlayerAction, IGameAction
    {
        public long PlayerId { get; set; }
        public Guid GameId { get; set; }
    }

    public class FirePrimaryWeaponStop : IPlayerAction, IGameAction
    {
        public long PlayerId { get; set; }
        public Guid GameId { get; set; }
    }

    public class FireSecondaryWeapon : IPlayerAction, IGameAction
    {
        public long PlayerId { get; set; }
        public Guid GameId { get; set; }
        public SecondaryWeapon Weapon { get; set; }
    }
}