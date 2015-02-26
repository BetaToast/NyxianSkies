using System;
using System.Windows;
using NSEdit.Mvvm.ViewModels;

namespace NSEdit.Mvvm.Views
{
    public abstract class View<T>
        : FrameworkElement, IView<T>
        where T : IViewModel
    {
        public T ViewModel { get; set; }

        protected View()
        {
            ViewModel = (T)Activator.CreateInstance(typeof(T));
            DataContext = ViewModel;
        }
    }
}