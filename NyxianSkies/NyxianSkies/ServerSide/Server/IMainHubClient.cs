﻿using System;
using System.Drawing;
using NyxianSkies.ServerSide.GameInstance;

namespace NyxianSkies.ServerSide.Server
{
    public interface IMainHubClient
    {
        void Pong(long id, string version);
        void YourPlayerId(string connectionId);
        void LoadLevel(string LevelName);
        void JoinedGame(Guid GameId, Guid PlayerId);

        void ShipPostionUpdate(Guid PlayerId, Vector2 Postion, Point velocity);
    }
}