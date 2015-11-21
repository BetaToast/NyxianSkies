using System;
using System.Collections.Generic;
using System.Drawing;
using NyxianSkies.ServerSide.GameInstance;

namespace NyxianSkies.ServerSide.Server
{
    public interface IMainHubClient
    {
        void Pong(long id, string version, double time, double clientTime);
        void YourPlayerId(string connectionId);
        void LoadLevel(string LevelName);
        void GameStart(Guid GameId, List<Player> players);

        void ShipPostionUpdate(Guid PlayerId, PointF Postion, Point velocity, double serverTime);
    }
}