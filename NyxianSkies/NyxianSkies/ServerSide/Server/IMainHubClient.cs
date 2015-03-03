namespace NyxianSkies.ServerSide.Server
{
    public interface IMainHubClient
    {
        void Pong(long id);
        void YourPlayerId(string connectionId);
    }
}