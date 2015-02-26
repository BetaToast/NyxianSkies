using System.Runtime.CompilerServices;
using NSEdit.Mvvm.ComponentModel;

namespace NSEdit.Mvvm.ViewModels
{
    public abstract class ViewModel
        : NotificationObject, IViewModel
    {
        protected void NotifyPropertyChanged([CallerMemberName] string propertyName = "none")
        {
            OnPropertyChanged(propertyName);
        }

        protected void NotifyPropertyChanging([CallerMemberName] string propertyName = "none")
        {
            OnPropertyChanged(propertyName);
        }
    }
}