using System;
using System.Drawing;

namespace NyxianSkies.ServerSide.GameInstance.Actions
{
    public class FirePrimaryWeapon : IPlayerAction, IGameAction
    {
        public Guid PlayerId { get; set; }
        public Guid GameId { get; set; }
        public Int64 ObjectId { get; set; }
        public PointF StartLocation { get; set; }
    }

    //public class FirePrimaryWeaponStart : IPlayerAction, IGameAction
    //{
    //    public Guid PlayerId { get; set; }
    //    public Guid GameId { get; set; }
    //}

    //public class FirePrimaryWeaponStop : IPlayerAction, IGameAction
    //{
    //    public Guid PlayerId { get; set; }
    //    public Guid GameId { get; set; }
    //}

    //public class FireSecondaryWeapon : IPlayerAction, IGameAction
    //{
    //    public Guid PlayerId { get; set; }
    //    public Guid GameId { get; set; }
    //    public SecondaryWeapon Weapon { get; set; }
    //}
}