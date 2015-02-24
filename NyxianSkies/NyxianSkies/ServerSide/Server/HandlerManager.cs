using System;
using System.Collections.Generic;
using System.Linq;
using NyxianSkies.ServerSide.GameInstance;

namespace NyxianSkies.ServerSide.Server
{
    internal class HandlerManager
    {
        private static readonly Lazy<HandlerManager> _instance = new Lazy<HandlerManager>();

        public static HandlerManager Instance
        {
            get { return _instance.Value; }
        }

        private readonly Dictionary<string, Type> _knowTypes = new Dictionary<string, Type>();

        //private readonly Dictionary<string, Func<IQueryHandler>> _handlers =
        //    new Dictionary<string, Func<IQueryHandler>>();

        public HandlerManager()
        {
            findMessageTypes();
            findMessageHandlers();
        }

        private void findMessageHandlers()
        {
        }

        private void findMessageTypes()
        {
            var gameActionType = typeof(IAction);
            var typeNameToTypes = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(gameActionType.IsAssignableFrom)
                .Select(t => new
                {
                    ActionName = t.Name,
                    t
                });

            foreach (var a in typeNameToTypes)
                _knowTypes.Add(a.ActionName, a.t);
        }

        public Type StringToType(string actionTypeName)
        {
            if (_knowTypes.ContainsKey(actionTypeName))
                return _knowTypes[actionTypeName];
            return null;
        }
    }
}