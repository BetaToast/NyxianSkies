using System;
using System.Windows.Input;
using NSEdit.Controls;
using NSEdit.ViewModels;

namespace NSEdit
{
    public partial class MainWindow
    {
        public static MapViewer MapViewer { get; set; }
        public static MainViewModel MainViewModel { get; set; }

        public MainWindow()
        {
            InitializeComponent();
            MapViewer = mapViewer;
            MainViewModel = ViewModel;
        }

        protected override void OnActivated(EventArgs e)
        {
            MapViewer.SelectedGameObject = MainViewModel.SelectedGameObjectType;
            MapViewer.Refresh();
            base.OnActivated(e);
        }

        private void BGLayer1_OnMouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            var index = MainViewModel.BackgroundNames.IndexOf(MainViewModel.BGLayer1);
            index++;
            if (index > MainViewModel.BackgroundNames.Count - 1) index = 0;
            MainViewModel.BGLayer1 = MainViewModel.BackgroundNames[index];
            MainViewModel.Refresh();
        }

        private void BGLayer2_OnMouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            var index = MainViewModel.BackgroundNames.IndexOf(MainViewModel.BGLayer2);
            index++;
            if (index > MainViewModel.BackgroundNames.Count - 1) index = 0;
            MainViewModel.BGLayer2 = MainViewModel.BackgroundNames[index];
            MainViewModel.Refresh();
        }

        private void Direction_OnMouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            if (MainViewModel.Direction == "Vertical") MainViewModel.Direction = "Horizontal";
            else MainViewModel.Direction = "Vertical";
        }
    }
}