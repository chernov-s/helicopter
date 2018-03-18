let app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

// create a new Sprite from an image path
let bunny = PIXI.Sprite.fromImage('assets/bunny.png');
let direction = 1;
let velocity = {
    x: 0,
    y: 0,
    rotation: 0
};

const maxVel = 5,
    maxAngle = 1;

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

app.ticker.add(function(delta) {

    if (bunny.y < 0) {
        bunny.y = app.screen.height;
    }
    if (bunny.x > app.screen.width) {
        bunny.x = 0;
    }
    if (bunny.x < 0) {
        bunny.x = app.screen.width;
    }
    if (bunny.rotation < maxAngle && direction > 0 || bunny.rotation > -maxAngle && direction < 0) {
        bunny.rotation += (0.08) * direction * delta;
        if (velocity.y < maxVel) {
            velocity.y += 0.08 * (1.2 - Math.abs(bunny.rotation)) * delta;
        }
        velocity.rotation += 0.005 * delta;

    } else {
        velocity.y = 0;
        velocity.rotation = 0;
    }

    bunny.x += (bunny.rotation + velocity.x) * delta;
    bunny.y -= (1 + velocity.y) * delta;

    if (velocity.x < maxVel && bunny.rotation > 0 || velocity.x > -maxVel && bunny.rotation < 0) {
        velocity.x += 0.08 * bunny.rotation * delta;
    }
    if (velocity.rotation < 1
        || velocity.rotation > -1) {

    } else {

    }
});

window.addEventListener('click', function () {
    direction *= -1;
});
