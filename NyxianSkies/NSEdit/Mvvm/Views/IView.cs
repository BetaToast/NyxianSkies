using NSEdit.Mvvm.ViewModels;

namespace NSEdit.Mvvm.Views
{
    public interface IView<T>
        where T : IViewModel
    {
        T ViewModel { get; set; }
    }
}