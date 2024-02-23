"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/main/docker/index.ts
var shell = __toESM(require("shelljs"));
var getDockerImages = () => {
  shell.config.execPath = shell.which("node").toString();
  const imagesLog = shell.exec("docker image ls");
  const stdoutArr = imagesLog.stdout.split("\n");
  const titleArr = ["REPOSITORY", "TAG", "IMAGE ID", "CREATED", "SIZE"];
  const imageInfoList = [];
  if (stdoutArr.length > 1) {
    let i = 1;
    while (i < stdoutArr.length) {
      const imageInfoString = stdoutArr[i];
      const imageInfoArr = imageInfoString.match(/(\S+)/g);
      let info = {};
      if (imageInfoArr) {
        for (let j = 0; j < titleArr.length; j++) {
          info[titleArr[j]] = imageInfoArr[j];
        }
        imageInfoList.push(info);
      }
      i++;
    }
  }
  return { title: titleArr, imageList: imageInfoList };
};
var docker_default = getDockerImages;

// src/preload/index.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("dockerSDk", {
  getDockerImages: docker_default
});
//# sourceMappingURL=index.js.map
