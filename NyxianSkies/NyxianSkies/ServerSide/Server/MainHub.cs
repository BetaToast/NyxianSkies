using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NyxianSkies.ServerSide.GameInstance.Actions;


namespace NyxianSkies.ServerSide.Server
{
    public class MainHub : Hub<IMainHubClient>
    {
        //put generic  SignalR specific stuff in here
        private readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();
        private readonly MultiInstanceGameManager _multiInstanceGameManager;
        private readonly HandlerManager _handlerManager;

        public string Version { get; set; }

        public MainHub()
        {
            Version = System.Reflection.Assembly.GetExecutingAssembly().GetName().Version.ToString();
            _multiInstanceGameManager = MultiInstanceGameManager.Instance;
            _handlerManager = HandlerManager.Instance;
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            SendAction(new ClientDisconnect { PlayerAddress = Context.ConnectionId });
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnConnected()
        {
            Clients.Caller.YourPlayerId(Context.ConnectionId);
            return base.OnConnected();
        }

        public void SendAction(string jsonActionBatch)
        {
            WriteToConsole(jsonActionBatch, Context.ConnectionId, DateTime.Now);
            //Take jsonActionBatch and break it into its different actions
            var jsonActionCollection = JObject.Parse(jsonActionBatch);
            var rawObject = ConvertJsonToActions(jsonActionCollection);

            SendAction(rawObject);
        }

        private void WriteToConsole(string jsonActionBatch, string connectionId, DateTime now)
        {
            if (jsonActionBatch.Contains("Ping"))
                return;
            Debug.WriteLine("{1,10}-{0,10}:{2,10} {3}", "Message Received", now, connectionId, jsonActionBatch);
        }

        private void SendAction(object rawObject)
        {
            InjectKnownData(ref rawObject);

            try
            {
                if (rawObject is PingServer)
                {
                    var ping = (PingServer)rawObject;
                    var dt = DateTime.UtcNow.ToUniversalTime().Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalMilliseconds;
                    Clients.Caller.Pong(ping.ID, Version, dt, ping.clientTime);
                }
                else
                    _multiInstanceGameManager.SendAction(rawObject);
            }
            catch
            { }
        }

        private void InjectKnownData(ref object rawObject)
        {
            if (rawObject is IJoinGame)
            {
                var player = (IJoinGame)rawObject;
                player.PlayerId = Guid.Parse(Context.ConnectionId);
            }
            if (rawObject is IPlayerAction)
            {
                var player = (IPlayerAction)rawObject;
                player.PlayerId = Guid.Parse(Context.ConnectionId);
            }
        }

        private object ConvertJsonToActions(JToken arg)
        {
            var actionTypeName = arg["action"].Value<string>();
            var actionType = _handlerManager.StringToType(actionTypeName);

            var action = JsonConvert.DeserializeObject(arg.ToString(), actionType);
            return action;
        }
    }
}