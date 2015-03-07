using System.ComponentModel;
using System.Runtime.CompilerServices;
using NSEdit.Annotations;

namespace NSEdit.Mvvm.ComponentModel
{
    public abstract class NotificationObject
        : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        [NotifyPropertyChangedInvocator]
        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            var handler = PropertyChanged;
            if (handler != null) handler(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}