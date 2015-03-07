using System;
using System.Windows;
using NSEdit.Mvvm.ViewModels;

namespace NSEdit.Mvvm.Views
{
    public abstract class WindowView<T>
        : Window, IView<T>
        where T : IViewModel
    {
        public T ViewModel { get; set; }

        protected WindowView()
        {
            ViewModel = (T)Activator.CreateInstance(typeof(T));
            DataContext = ViewModel;
        }
    }
}