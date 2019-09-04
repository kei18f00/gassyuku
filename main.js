
const { app, Menu, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
var schedule = require("node-schedule");
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences:{
        nodeIntegration: true
    },title:"hitotume"});
    subWindow = new BrowserWindow({ width: 800, height: 600, webPreferences:{
        nodeIntegration: true
    } });
        
    var job = schedule.scheduleJob({
        dayOfWeek :2,
        hour :17,
        minute :05,
        second :00,
    }, function (){
        console.log("開いたよ");
        mainWindow.loadURL("https://www.nhk.or.jp/radio/player/?ch=r1")
        subWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:'
        }));
    });

    var job = schedule.scheduleJob({
        dayOfWeek :2,
        hour :17,
        minute :05,
        second : 30,    }, function (){
        mainWindow.close()
    });
    //mainWindow.loadURL("https://www.nhk.or.jp/radio/player/?ch=r1")

    // 開発ツールを有効化
     subWindow.webContents.openDevTools();

    Menu.setApplicationMenu(null);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});