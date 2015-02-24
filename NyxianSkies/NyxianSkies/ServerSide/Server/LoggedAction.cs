using NyxianSkies.ServerSide.GameInstance.Actions;

namespace NyxianSkies.ServerSide.Server
{
    class LoggedAction
    {
        private long Time { get; set; }
        private IAction action { get; set; }

        public LoggedAction(long time, IAction action)
        {
            Time = time;
            this.action = action;
        }
    }
}