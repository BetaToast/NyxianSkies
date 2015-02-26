using System;
using System.IO;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using NSEdit.Models;

namespace NSEdit.Controls
{
    public partial class MapViewer
    {
        private Canvas _canvas;
        
        public double X { get; set; }
        public double Y { get; set; }

        public int Width { get; set; }
        public int Height { get; set; }
        public string BGColor { get; set; }
        public string BGLayer1 { get; set; }
        public string BGLayer2 { get; set; }

        public string SelectedGameObject { get; set; }

        public MapViewer()
        {
            InitializeComponent();
            _canvas = canvas;
            Width = 12800;
            Height = 720;
            BGColor = "#000000";
        }

        protected override void OnMouseMove(MouseEventArgs e)
        {
            var pos = e.MouseDevice.GetPosition(_canvas);
            X = pos.X;
            Y = pos.Y;
            base.OnMouseMove(e);
        }

        protected override void OnMouseLeftButtonDown(MouseButtonEventArgs e)
        {
            var typeIndex = MainWindow.MainViewModel.GameObjectTypes.IndexOf(SelectedGameObject);
            var typePath = Path.Combine(Environment.CurrentDirectory, "Content", "Objects", SelectedGameObject + ".png");
            
            var gameObject = new GameObject
            {
                X = X,
                Y = Y,
                Type = typeIndex,
                Path = typePath
            };
            MainWindow.MainViewModel.GameObjects.Add(gameObject);

            Refresh();
            
            base.OnMouseLeftButtonDown(e);
        }

        public void Refresh()
        {
            // Clear Canvas
            _canvas.Children.Clear();
            _canvas.Width = Width;
            _canvas.Height = Height;

            // Set BG Color
            var color = (Color)ColorConverter.ConvertFromString(BGColor);
            _canvas.Background = new SolidColorBrush(color);
            
            // Set BG Layer 1
            if (!string.IsNullOrEmpty(BGLayer1) && BGLayer1.ToLower() != "none")
            {
                var pathBGLayer1 = Path.Combine(Environment.CurrentDirectory, "Content", "Backgrounds", BGLayer1 + ".png");
                var uriBGLayer1 = new Uri(pathBGLayer1);
                var bmpBGLayer1 = new BitmapImage(uriBGLayer1);
                var w = (int)bmpBGLayer1.Width;
                var h = (int)bmpBGLayer1.Height;
                
                for (var y = 0; y < Height; y += h)
                {
                    for (var x = 0; x < Width; x += w)
                    {
                        var img = new Image
                        {
                            Width = bmpBGLayer1.Width,
                            Height = bmpBGLayer1.Height,
                            Source = bmpBGLayer1
                        };
                        _canvas.Children.Add(img);
                        Canvas.SetLeft(img, x);
                        Canvas.SetTop(img, y);
                    }
                }
            }

            // Set BG Layer 2
            if (!string.IsNullOrEmpty(BGLayer2) && BGLayer2.ToLower() != "none")
            {
                var pathBGLayer2 = Path.Combine(Environment.CurrentDirectory, "Content", "Backgrounds", BGLayer2 + ".png");
                var uriBGLayer2 = new Uri(pathBGLayer2);
                var bmpBGLayer2 = new BitmapImage(uriBGLayer2);
                var w = (int)bmpBGLayer2.Width;
                var h = (int)bmpBGLayer2.Height;

                for (var y = 0; y < Height; y += h)
                {
                    for (var x = 0; x < Width; x += w)
                    {
                        var img = new Image
                        {
                            Width = bmpBGLayer2.Width,
                            Height = bmpBGLayer2.Height,
                            Source = bmpBGLayer2
                        };
                        _canvas.Children.Add(img);
                        Canvas.SetLeft(img, x);
                        Canvas.SetTop(img, y);
                    }
                }
            }

            // Set Game Objects
            foreach (var gameObject in MainWindow.MainViewModel.GameObjects)
            {
                var uri = new Uri(gameObject.Path);
                var bmp = new BitmapImage(uri);
                var img = new Image
                {
                    Width = bmp.Width,
                    Height = bmp.Height,
                    Source = bmp
                };

                _canvas.Children.Add(img);
                Canvas.SetLeft(img, gameObject.X);
                Canvas.SetTop(img, gameObject.Y);
            }
        }
    }
}
