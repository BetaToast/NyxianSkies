using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NyxianSkies.ServerSide.GameInstance.Actions;


namespace NyxianSkies.ServerSide.Server
{
    public class MainHub : Hub
    {
        //put generic  SignalR specific stuff in here
        private readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();
        private readonly MultiInstanceGameManager _multiInstanceGameManager;
        private readonly HandlerManager _handlerManager;

        public MainHub()
        {
            _multiInstanceGameManager = MultiInstanceGameManager.Instance;
            _handlerManager = HandlerManager.Instance;
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            SendAction(new ClientDisconnect());
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnConnected()
        {
            Clients.Caller.YourPlayerId(Context.ConnectionId);
            return base.OnConnected();
        }

        public void SendAction(string jsonActionBatch)
        {
            //Take jsonActionBatch and break it into its different actions
            var jsonActionCollection = JObject.Parse(jsonActionBatch);
            var rawObject = ConvertJsonToActions(jsonActionCollection);

            SendAction(rawObject);
        }

        private void SendAction(object rawObject)
        {
            InjectKnownData(ref rawObject);

            try
            {
                if (rawObject is PingServer)
                {
                    var ping = (PingServer)rawObject;
                    Clients.Caller.Pong(ping.ID);
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
                player.PlayerAddress = Context.ConnectionId;
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