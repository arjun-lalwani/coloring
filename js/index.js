'use strict';

// custom images for different levels
let images = {
    'easy': ['cake.gif', 'caterpillar.gif', 'christmas-tree.gif', 'duck.gif', 'elephant.png'],
    'medium': ['boat.gif', 'frog.gif', 'rocket.gif', 'train.gif', 'whale.gif'],
    'hard': ['fish-bowl.jpg', 'horse.gif', 'scarecrow.gif']
};

let state = {
    'color': 'blue',
    'level': 'easy',
    'thickness': '1',
    'eraser': 'Disable',
    'mouseState': ''
}

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let canvasOffset = calcualateOffset();

// makes canvas size responsive
$(function () {
    adjustCanvasSize();
});

$('#dropdown-colors').click(function (event) {
    state.color = event.target.innerText;
    changeColorStatus();
});

$('#dropdown-levels').click(function (event) {
    state.level = event.target.innerText.toLowerCase();
    changeLevelStatus();
});

$('#dropdown-thickness').click(function (event) {
    state.thickness = event.target.innerText;
    $('#status-thickness').text(state.thickness);
});

$('#dropdown-eraser').click(function (event) {
    state.eraser = event.target.innerText;
    $('#status-eraser').text(state.eraser);
    if (state.eraser !== 'Disable') {
        state.color = 'white';
        state.thickness = state.eraser;
    }
});

// used Problem Set 3 code
$('#save').click(function (event) {
    let data = canvas.toDataURL('image/png');
    let a = document.createElement("a");
    a.setAttribute('href', data);
    a.setAttribute('download', 'drawing.png');
    a.click();
});

$('#red-btn, #green-btn, #blue-btn, #purple-btn, #gold-btn, #brown-btn').click(function (event) {
    state.color = event.target.innerText;
    changeColorStatus();
});

$('#easy-btn, #medium-btn, #hard-btn').click(function (event) {
    state.level = event.target.innerText.toLowerCase();
    changeLevelStatus();
});

// generates image depending on state and makes it responsive to center in canvas
$('#generate-img').click(function (event) {

    let ctx = $('canvas')[0].getContext('2d');

    // selects level of difficulty chosen by user
    var lod = state.level;

    // get random index to access from array for each level
    let randomIndex = Math.floor(Math.random() * images[lod].length);

    // generate path for image
    var src = "images/" + lod + "/" + images[lod][randomIndex];

    var img = new Image();
    img.onload = function () {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        let ctxWidth = canvas.width;
        let ctxHeight = canvas.height;
        var imgWidth = 167.5;
        var imgHeight = 205;
        var startX = 90;
        var startY = 40;

        // scale image differently depending on canvas width
        if (ctxWidth === 550) {
            imgWidth = 260;
            imgHeight = 318;
            startX = 160;
            startY = 40;
        } else if (ctxWidth === 700) {
            imgWidth = 350;
            imgHeight = 428;
            startX = 190;
            startY = 30;
        } else if (ctxWidth === 850) {
            imgWidth = 400;
            imgHeight = 489;
            startX = 210;
            startY = 30;
        } else if (ctxWidth === 950) {
            imgWidth = 450;
            imgHeight = 550;
            startX = 240;
            startY = 30;
        }
        ctx.drawImage(img, startX, startY, imgWidth, imgHeight);
    }
    img.src = src;
});

// make canvas responsive when window is resized
$(window).resize(function () {
    adjustCanvasSize();
});

// make offSet for drawing responsive when user scrolls
$(window).scroll(function () {
    canvasOffset = calcualateOffset();
});

// make canvas responsive by determining the right size
function adjustCanvasSize() {
    let canvas = document.querySelector('canvas');
    let window_width = $(window).width();

    if (window_width < 576) {
        canvas.width = 350;
        canvas.height = 300;
    } else if (window_width >= 576 && window_width < 768) {
        canvas.width = 550;
        canvas.height = 400;
    } else if (window_width >= 768 && window_width < 992) {
        canvas.width = 700;
        canvas.height = 500;
    } else if (window_width >= 992 && window_width < 1200) {
        canvas.width = 850;
        canvas.height = 600;
    } else if (window_width >= 1200) {
        canvas.width = 950;
        canvas.height = 700;
    }
}

canvas.addEventListener('mousedown', function (event) {
    state.mouseState = 'mouseDown';
    ctx.strokeStyle = state.color;

    canvasOffset = calcualateOffset();
    ctx.moveTo((event.clientX - canvasOffset.left), (event.clientY - canvasOffset.top));

    // begin path
    ctx.beginPath();
});

canvas.addEventListener('mousemove', function (event) {
    if (state.mouseState === 'mouseDown') {
        ctx.lineWidth = state.thickness;
        canvasOffset = calcualateOffset();
        ctx.lineTo((event.clientX - canvasOffset.left), (event.clientY - canvasOffset.top));
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', function () {
    state.mouseState = "mouseUp";
    ctx.closePath();
});

// calculates the right offset after scrolling on page
function calcualateOffset() {
    let tempCanvasOffSet = $('canvas').offset();
    tempCanvasOffSet.top -= window.scrollY;
    return tempCanvasOffSet;
}

function changeColorStatus() {
    $('#status-color').text(capitalize(state.color));
}

function changeLevelStatus() {
    $('#status-level').text(capitalize(state.level));
}

// found on stack overflow
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$('#clear-btn').click(function () {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
});


