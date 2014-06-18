var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
 
canvas.width = 600;
canvas.height = 400;
 
var player = {
    x: 200,
    y: 200,
    width: 15,
    height: 15,
    speed: 150,
    color: '#c00'
};

// Create the background images
var image = new Image();
image.src = 'assets/images/grasstile.png';
var image2 = new Image();
image2.src = 'assets/images/walltile.jpg';

// Set the map and tile size
var tileSize = 32;
var x = 20;
var y = 15;

var randomImage = function(){
    var randomImg = Math.floor(Math.random() * 2) * 1;
    if(randomImg == 0){
        return image;   
    } else {
        return image2;   
    }
}

var map = [];

function randomImageArray(){
    
    var mapArray = [];
    var length = x * y;
    var arrayLength = 0;
    while(arrayLength < length){
        var randomImg = Math.floor(Math.random() * 2) * 1;
        if(randomImg == 0){
            //mapArray.push('0');
            map.push(0);
            arrayLength += 1; 
        } else {
           // mapArray.push('1');
            map.push(1);
            arrayLength += 1;   
        }
    }
    console.log("Random array generated..");
} 


var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});

function update(mod) {
    if (37 in keysDown || 65 in keysDown) {
        if(player.x < 0){
            
        } else {
            player.x -= player.speed * mod;
            ctx.clearRect(player.x, player.y, player.width, player.height);
            drawBackground();
        }
    } 
    if (38 in keysDown || 87 in keysDown) {
        if(player.y < 0){
            
        } else {
            player.y -= player.speed * mod;
            ctx.clearRect(player.x, player.y, player.width, player.height);
            drawBackground();
        }
    }
    if (39 in keysDown || 68 in keysDown) {
        if(player.x > canvas.width - player.width){   
            
        } else {
            player.x += player.speed * mod;
            ctx.clearRect(player.x, player.y, player.width, player.height);
            drawBackground();
        }
    }
    if (40 in keysDown || 83 in keysDown) {
        if(player.y > canvas.height - player.height){
            
        } else {
            ctx.clearRect(player.x, player.y, player.width, player.height);
            drawBackground();
            player.y += player.speed * mod;
            
        }
    }
}

// Draw the background
function drawBackground() {
    var tileX,
        tileY,
        imageIdx;

    for (tileX = 0; tileX < x; tileX ++) {
        for (tileY = 0; tileY < y; tileY++) {
            imageIdx = map[tileX * tileY];
            if (imageIdx === 0) {
                ctx.drawImage(image, tileX * tileSize,tileY * tileSize , tileSize, tileSize);
            } else if (imageIdx === 1) { 
                ctx.drawImage(image2, tileX * tileSize,tileY * tileSize , tileSize, tileSize);   
            }
        }
    }
    
}

/* Collision detection (NOT WORKING)
TODO: Make image2 an object with its own width and height for each tile
Replace object2 with the object from image2 (WALL);
Stop the player from moving in its current direction if it collides with the wall
*/
function collision(){
    if (player.x < object2.x + object2.width  && player.x + player.width  > object2.x &&
            player.y < object2.y + object2.height && player.y + player.height > object2.y) {
    // The objects are touching
    }
}

// Render the player
function render() {    
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Run loop
function run() {
    update((Date.now() - time) / 1000);
    render();
    time = Date.now();
}

function initialize(){
    randomImageArray();
    drawBackground();
    console.log('Background drawed..');
}
 
var time = Date.now();
setInterval(run, 10);