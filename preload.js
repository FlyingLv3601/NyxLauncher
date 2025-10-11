const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  logInput: (text) => ipcRenderer.send('log-input', text),
  theme: (text) => ipcRenderer.send('theme', text)
});
