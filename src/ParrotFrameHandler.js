const fs = require('fs');
const config = require("./config");
const Canvas = require('canvas');
const Image = Canvas.Image;

function ParrotFrameHandler() {
    this.context = new Canvas(config.WIDTH, config.HEIGHT).getContext('2d');
    this.context.fillStyle = "rgba(255, 255, 255, 0)";
    this.context.fillRect(0, 0, config.WIDTH, config.HEIGHT);
}

ParrotFrameHandler.prototype.addImage = function(image, offsetX, offsetY) {
    this.context.drawImage(image, offsetX || 0, offsetY || 0);
}

ParrotFrameHandler.prototype.addResizedImage = function(image, offsetX, offsetY, width, height, flipX, flipY) {
    this.context.drawImage(image, (offsetX || 0)+flipOffset(flipX, width), (offsetY || 0)+flipOffset(flipY, height), width*flip(flipX), height*flip(flipY));
}

function flip(flipB){
    if flipB==true return -1;
    return 1;
}

function flipOffset(flipB, size){
    if flipB==true return size;
    return 0;
}

ParrotFrameHandler.prototype.getFrame = function() {
    return this.context;
}

module.exports = ParrotFrameHandler;
