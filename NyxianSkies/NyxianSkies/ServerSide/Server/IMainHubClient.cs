using System;
using System.Drawing;

namespace NyxianSkies.ServerSide.Server
{
    public interface IMainHubClient
    {
        void Pong(long id);
        void YourPlayerId(string connectionId);
        void LoadLevel(string LevelName);
        void JoinedGame(Guid GameId);
        void StartLevel(string LevelName);

        void ShipPostionUpdate(Guid PlayerId, Point Postion, Point velocity);
    }
}