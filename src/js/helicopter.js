const
    DIRECTION_CHANGE = 0.06,
    SMOOTHING = -0.05;

var Robot = function (x, y) {
    this.x = x;
    this.y = y;
    this.h = 50;
    this.angle = -90;
    this.linearVelocity = {
        x: 0,
        y: 0
    }
};

Robot.prototype.update = function () {
    this.x += MAX_SPEED * Math.cos(Math.PI/180 * this.angle);
    this.y += MAX_SPEED * Math.sin(Math.PI/180 * this.angle);

};
Robot.prototype.render = function () {
    ctx.beginPath();
    ctx.font = this.size + "px Verdana";
    ctx.fillStyle = "#f00";
    ctx.fillText("X: " + this.x, 10, 10);
    ctx.fillText("Y: " + this.x, 10, 30);

    ctx.fillText("Color: " + map[Math.round(this.x)][Math.round(this.y)], 10, 50);
    ctx.closePath();

    ctx.save();
    ctx.translate(this.x + w / 2, this.y + h / 2);
    ctx.rotate(this.angle);
    ctx.translate(-(this.x + w / 2), -(this.y + h / 2));
    ctx.strokeStyle = "#f00";
    ctx.strokeWidth = 2;

    ctx.strokeRect(this.x,this.y, this.h, this.h);

    ctx.stroke();
    ctx.restore();


};

Robot.prototype.turnLeft = function () {
    this.direction =
        normalizeAngle (this.direction - DIRECTION_CHANGE);
};

Robot.prototype.turnRight = function () {
    this.direction =
        normalizeAngle (this.direction + DIRECTION_CHANGE);

};

Robot.prototype.velocityByDirectionCorrection = function () {
    var velocityDirection = this.getVelocityDirection();
    var sideslipAngle = normalizeAngle(velocityDirection - this.direction);
    this.linearVelocity = this.rotate(this.linearVelocity, sideslipAngle * SMOOTHING);
}

Robot.prototype.getVelocityDirection = function (){
    return Math.atan2(this.linearVelocity.x, this.linearVelocity.y) + Math.PI / 2;
}
Robot.prototype.rotate = function() {

    this.x = position.x * Math.cos(this.angle) - position.y * Math.sin(this.angle);
    this.y = position.x * Math.sin(this.angle) + position.y * Math.cos(this.angle);
}

function normalizeAngle(angle) {
    if (angle > Math.PI) {
        return angle - 2 * Math.PI;
    } else
    if (angle < - Math.PI) {
        return angle + 2 * Math.PI;
    }
    return angle;
}
