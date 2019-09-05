
const { app, Menu, BrowserWindow,ipcMain } = require('electron');
const path = require('path');
const url = require('url');
var schedule = require("node-schedule");

function setTime(arg){
    let recordwindow
    var job = schedule.scheduleJob(arg, function (){
        console.log("開いたよ");
        recordwindow = new BrowserWindow({ width: 800, height: 600, webPreferences:{
            nodeIntegration: true
        },title:"hitotume"});
        const { closedayOfweek, closehour, closeminute, closesecond } = arg
        var job2 = schedule.scheduleJob({
            dayOfweek :closedayOfweek,
            hour :closehour,
            minute : closeminute,
            second : closesecond,
        }, function (){
            recordwindow.close()
        });
        recordwindow.loadURL(arg.URL)
        recordwindow.on('closed', () => {
            mainrecordwindowWindow = null;
        });
    });
}

function createWindow() {

    subWindow = new BrowserWindow({ width: 520, height: 600, webPreferences:{
        nodeIntegration: true
    } });
    subWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'public/index.html'),
        protocol: 'file:'
    }));
    ipcMain.on('set', (event, arg) => {
        console.log(arg) //ここが送信した中身
        setTime(arg)
    })

    // 開発ツールを有効化
    //subWindow.webContents.openDevTools();

    Menu.setApplicationMenu(null);
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