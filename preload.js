const { contextBridge } = require("electron");
const getDockerImages = require('./src/main/docker')


contextBridge.exposeInMainWorld("dockerSDk", {
  getDockerImages: getDockerImages,
});
