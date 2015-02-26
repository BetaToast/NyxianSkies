using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Windows.Input;
using Microsoft.Win32;
using Newtonsoft.Json;
using NSEdit.Models;
using NSEdit.Mvvm.Commands;
using NSEdit.Mvvm.ViewModels;

namespace NSEdit.ViewModels
{
    public class MainViewModel
        : ViewModel
    {
        #region Properties

        private string _mapName;
        public string MapName
        {
            get { return _mapName; }
            set
            {
                if(_mapName == value) return;
                _mapName = value;
                NotifyPropertyChanged();
            }
        }

        private string _direction;
        public string Direction
        {
            get { return _direction; }
            set
            {
                if(_direction == value) return;
                _direction = value;
                NotifyPropertyChanged();
            }
        }

        private string _bGColor;
        public string BGColor
        {
            get { return _bGColor; }
            set
            {
                if(_bGColor == value) return;
                _bGColor = value;
                NotifyPropertyChanged();
            }
        }

        private string _bGLayer1;
        public string BGLayer1
        {
            get { return _bGLayer1; }
            set
            {
                if(_bGLayer1 == value) return;
                _bGLayer1 = value;
                NotifyPropertyChanged();
            }
        }

        private string _bGLayer2;
        public string BGLayer2
        {
            get { return _bGLayer2; }
            set
            {
                if(_bGLayer2 == value) return;
                _bGLayer2 = value;
                NotifyPropertyChanged();
            }
        }

        private string _width;
        public string Width
        {
            get { return _width; }
            set
            {
                if(_width == value) return;
                _width = value;
                NotifyPropertyChanged();
            }
        }

        private string _height;
        public string Height
        {
            get { return _height; }
            set
            {
                if(_height == value) return;
                _height = value;
                NotifyPropertyChanged();
            }
        }

        private ObservableCollection<GameObject> _gameObjects;
        public ObservableCollection<GameObject> GameObjects
        {
            get { return _gameObjects; }
            set
            {
                if(_gameObjects == value) return;
                _gameObjects = value;
                NotifyPropertyChanged();
            }
        }

        private List<Background> _backgrounds;
        public List<Background> Backgrounds
        {
            get { return _backgrounds; }
            set
            {
                if (_backgrounds == value) return;
                _backgrounds = value;
                NotifyPropertyChanged();
            }
        }

        private List<string> _backgroundNames;
        public List<string> BackgroundNames
        {
            get { return _backgroundNames; }
            set
            {
                if (_backgroundNames == value) return;
                _backgroundNames = value;
                NotifyPropertyChanged();
            }
        }

        private List<string> _gameObjectTypes;
        public List<string> GameObjectTypes
        {
            get { return _gameObjectTypes; }
            set
            {
                if (_gameObjectTypes == value) return;
                _gameObjectTypes = value;
                NotifyPropertyChanged();
            }
        }

        private string _selectedGameObjectType;
        public string SelectedGameObjectType
        {
            get { return _selectedGameObjectType; }
            set
            {
                if (_selectedGameObjectType == value) return;
                _selectedGameObjectType = value;
                if(MainWindow.MapViewer != null) MainWindow.MapViewer.SelectedGameObject = _selectedGameObjectType;
                NotifyPropertyChanged();
            }
        }

        private GameObject _selectedGameObject;
        public GameObject SelectedGameObject
        {
            get { return _selectedGameObject; }
            set
            {
                if (_selectedGameObject == value) return;
                _selectedGameObject = value;
                NotifyPropertyChanged();
            }
        }

        #endregion

        #region Commands

        private ICommand _refreshCommand;
        public ICommand RefreshCommand
        {
            get { return _refreshCommand; }
            set
            {
                if(_refreshCommand == value) return;
                _refreshCommand = value;
                NotifyPropertyChanged();
            }
        }

        private ICommand _deleteObjectCommand;
        public ICommand DeleteObjectCommand
        {
            get { return _deleteObjectCommand; }
            set
            {
                if (_deleteObjectCommand == value) return;
                _deleteObjectCommand = value;
                NotifyPropertyChanged();
            }
        }

        private ICommand _loadMapCommand;
        public ICommand LoadMapCommand
        {
            get { return _loadMapCommand; }
            set
            {
                if (_loadMapCommand == value) return;
                _loadMapCommand = value;
                NotifyPropertyChanged();
            }
        }

        private ICommand _saveMapCommand;
        public ICommand SaveMapCommand
        {
            get { return _saveMapCommand; }
            set
            {
                if (_saveMapCommand == value) return;
                _saveMapCommand = value;
                NotifyPropertyChanged();
            }
        }

        private ICommand _newMapCommand;
        public ICommand NewMapCommand
        {
            get { return _newMapCommand; }
            set
            {
                if (_newMapCommand == value) return;
                _newMapCommand = value;
                NotifyPropertyChanged();
            }
        }

        #endregion

        #region Initialization

        public MainViewModel()
        {
            MapName = "Level";
            BGColor = "#000000";
            Direction = "Vertical";
            Width = "12800";
            Height = "720";
            GameObjects = new ObservableCollection<GameObject>(new List<GameObject>());
            Backgrounds = new List<Background>();
            BackgroundNames = new List<string>();
            GameObjectTypes = new List<string>();
            RegisterCommands();
            LoadContent();
        }

        private void RegisterCommands()
        {
            RefreshCommand = new DelegateCommand(Refresh);
            DeleteObjectCommand = new DelegateCommand(DeleteObject);
            LoadMapCommand = new DelegateCommand(LoadMap);
            SaveMapCommand = new DelegateCommand(SaveMap);
            NewMapCommand = new DelegateCommand(NewMap);
        }

        private void LoadContent()
        {
            GameObjectTypes = Enum.GetNames(typeof(GameObjectTypes)).ToList();
            SelectedGameObjectType = GameObjectTypes.First();

            var files = Directory.GetFiles(".\\Content\\Backgrounds");

            BackgroundNames.Add("None");
            Backgrounds.Add(new Background { Name = "None" });

            BGLayer1 = "None";
            BGLayer2 = "None";

            foreach (var file in files)
            {
                var name = Path.GetFileNameWithoutExtension(file);
                var bg = new Background
                {
                    Path = file,
                    Name = name
                };
                BackgroundNames.Add(name);
                Backgrounds.Add(bg);
            }
        }

        #endregion

        #region Actions

        public void Refresh(object sender = null)
        {
            MainWindow.MapViewer.Width = Convert.ToInt32(Width);
            MainWindow.MapViewer.Height = Convert.ToInt32(Height);
            MainWindow.MapViewer.BGColor = BGColor;
            MainWindow.MapViewer.BGLayer1 = BGLayer1;
            MainWindow.MapViewer.BGLayer2 = BGLayer2;
            MainWindow.MapViewer.Refresh();
        }

        public void DeleteObject(object sender = null)
        {
            var selectedObject = SelectedGameObject;
            GameObjects.Remove(selectedObject);
            SelectedGameObject = null;
            MainWindow.MapViewer.Refresh();
        }

        public void LoadMap(object sender = null)
        {
            var dialog = new OpenFileDialog
            {
                Filter = "Json Map (.json)|*.json"
            };
            var result = dialog.ShowDialog();

            if (result.HasValue)
            {
                var filename = dialog.FileName;
                var json = File.ReadAllText(filename);
                var map = JsonConvert.DeserializeObject<Map>(json);

                GameObjects.Clear();

                MapName = map.Name;
                Direction = map.Direction;
                Width = map.Width.ToString();
                Height = map.Height.ToString();
                BGColor = map.BGColor;
                BGLayer1 = map.BGLayer1;
                BGLayer2 = map.BGLayer2;

                foreach (var gameObject in map.GameObjects)
                {
                    var name = GameObjectTypes[gameObject.Type];
                    var typePath = Path.Combine(Environment.CurrentDirectory, "Content", "Objects", name + ".png");
                    gameObject.Path = typePath;
                    GameObjects.Add(gameObject);
                }

                Refresh();
            }
        }

        public void SaveMap(object sender = null)
        {
            var map = new Map()
            {
                Name = MapName,
                Direction = Direction,
                Width = Convert.ToInt32(Width),
                Height = Convert.ToInt32(Height),
                BGColor = BGColor,
                BGLayer1 = BGLayer1,
                BGLayer2 = BGLayer2,
                GameObjects = GameObjects.ToList()
            };

            var jsonOutput = JsonConvert.SerializeObject(map, Formatting.Indented);

            var dialog = new SaveFileDialog
            {
                Filter = "Json Map (.json)|*.json",
                FileName = MapName + ".json",
                DefaultExt = "json"
            };
            var result = dialog.ShowDialog();

            if (result.HasValue)
            {
                var filename = dialog.FileName;
                File.WriteAllText(filename, jsonOutput);
            }
        }

        public void NewMap(object sender = null)
        {
            MapName = "Level";
            BGColor = "#000000";
            Direction = "Vertical";
            Width = "12800";
            Height = "720";
            GameObjects = new ObservableCollection<GameObject>(new List<GameObject>());
            Refresh();
        }

        #endregion
    }
}