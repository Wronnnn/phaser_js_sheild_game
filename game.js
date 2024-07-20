var config = {
    width: 800,
    height: 600,
    backgroundColor: 0x6f83d6,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var rotate = 0;

var game = new Phaser.Game(config);

function preload(){

    // shield.setOrigin(game.config.x / 2, game.config.y/2);
    // shield.setRotation(0.7);
    // shield.rotate(10);

    // shield.lineTo(140, 100);
    // shield.arc(140, 145, 5, 1.5 * Math.PI,0.5 * Math.PI);
    // shield.closePath();
    // shield.fillPath();
    // shield.stroke();

    // shield.beginPath(100, 100);
    // shield.arc(100, 120, 20, 0, Math.PI);
    // // shield.moveTo(100, 140);
    // // shield.lineTo(100, 100)
    // shield.closePath();
    // shield.fillPath();


    // shield.fillStyle(0x000000, 1);
    // shield.beginPath(20, 0);
    // shield.lineTo(60, 0);
    // shield.arc(80, 20, 20, 0, 180);
    // // shield.arc(80, 20, 20, 0, 90);
    // // shield.quadraticCurveTo(80, 40, 60, 40);
    // shield.lineTo(20, 40);
    // shield.arc(20, 20, 20, 180, 0);
    // // siehld.quadraticCurveTo(0, 40, 0, 20);
    // // sheild.quadraticCurveTo(0, 0, 20, 0);
    // shield.closePath();
    // shield.fillPath();
}

function create(){
    shield = this.add.graphics();
    shield.fillStyle(0x000000, 1);
    // shield.moveTo(100, 100);
    shield.fillRect(-50, -5, 100, 10);
    shield.setX(game.config.width / 2);
    shield.setY(game.config.height / 2);
    // console.log(shield.rotation);
    // shield.setRotation(4);
    cursor = this.input.keyboard.createCursorKeys();
    this.input.on('pointermove', (pointer) => {
        console.log(getAngle(400, 400, pointer.x, pointer.y));
        let angle = getAngle(400, 400, pointer.x, pointer.y) * -1 - 1.570796
        shield.setRotation(angle);
        let coord = getPostionOnCircle(400, 400, 100, angle);
        shield.setPosition(coord.resoultX, coord.resoultY);
        console.log(pointer.x + ' ' + pointer.y);
    });
}

function update(){
    // console.log(cursor);
    // rotate += 0.01;
    // shield.setRotation(shield.rotation + 0.01);
    // // shield.rotate(0.01);
    // console.log(shield.rotation);
}

function getAngle(x1, y1, x2, y2){
    let resoult;
    if(y2 <= y1){
        if(x2 >= x1){
            resoult = 0;
        } else {
            let temp = y2;
            y2 = x2;
            x2 = temp;
            resoult = 1.570796;
            x2 += (x1 - x2) * 2;
        }
    } else {
        if(x2 <= x1){
            y2 -= (y2 - y1) * 2;
            resoult = 3.141593;
            x2 += (x1 - x2) * 2;
        } else {
            // let temp = y2;
            // y2 = x2;
            // x2 = temp;
            resoult = 6.283185;
        }
    }
    let distanceBetweenPoints = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
    let sinA = (y1 - y2) / distanceBetweenPoints;
    return (Math.asin(sinA) + resoult);
}

function getPostionOnCircle(x, y, r, angle){
    angle += 1.570796 * 3;
    //let resoultX, resoultY;
    let sinA = Math.sin(angle);
    let cosA = Math.cos(angle);
    console.log({sinA, cosA});
    let resoultX = x - (cosA * r);
    let resoultY = y - (sinA * r);
    // resoultY = r / sinA + y;
    // resoultY = y - (sinA * r);
    // resoultX = x + r - Math.sqrt(Math.abs(Math.pow(r, 2) - Math.pow(resoultY, 2)));
    // resoultX = Math.sqrt(Math.abs(Math.pow(r, 2) - Math.pow(resoultY - y, 2))) + x;
    // resoultY += y;
    return {resoultX, resoultY};
}

function actualiseShield(pointer){

}