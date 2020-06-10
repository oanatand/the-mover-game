const board = document.querySelector('.board');

const keyMap = {
    TOP: 38,
    RIGHT: 39,
    BOTTOM: 40,
    LEFT: 37,
};

const PLAYER_MOVE_STEP = 20;
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;

class Obstacle {
    element;
    x;
    y;
    width;
    height;

    constructor(x, y, width, height, position = 'top') {
        this._createElement();

        this.x = x;
        this.y = y;
        if (position === 'bottom') {
            this.y = MAP_HEIGHT - height - y;
        }
        this.width = width;
        this.height = height;

        this._setPosition();
    }

    _createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('obstacle');
        board.appendChild(this.element);
    }

    _setPosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
    }
}

const obstacles = [
    new Obstacle(200, 0, 20, 340),
    new Obstacle(300, 0, 20, 100, 'bottom'),
    new Obstacle(400, 0, 20, 240),
    new Obstacle(500, 0, 20, 380, 'bottom'),
    new Obstacle(600, 0, 20, 240),
    new Obstacle(700, 0, 20, 160, 'bottom'),
    new Obstacle(800, 0, 20, 160),
    new Obstacle(900, 0, 20, 300, 'bottom'),
];


class Player {
    element = document.querySelector(".player");
    x = 0;
    y = 0;
    width = PLAYER_WIDTH;
    height = PLAYER_HEIGHT;
    lives = 3;

    constructor() {
        this._initMovement();
    }

    _initMovement() {
        document.addEventListener("keydown", this._handleMovement.bind(this));
    }

    _handleMovement(event) {
        switch (event.keyCode) {
            case keyMap.TOP: {
                this.moveTop();
                break;
            }
            case keyMap.RIGHT: {
                this.moveRight();
                break;
            }
            case keyMap.BOTTOM: {
                this.moveBottom();
                break;
            }
            case keyMap.LEFT: {
                this.moveLeft();
                break;
            }
        }
    }

    resetToInitialPosition() {
        this.x = 0;
        this.y = 0;
        this._updatePosition();
    }

    _updateLives() {
        this.lives = this.lives - 1;
        if (this.lives === 0) {
            alert("You are dead!");
            this.resetToInitialPosition();
            this.lives = 3;
        }
        document.querySelector(".lives").innerHTML = `lives: ${this.lives}`;
    }

    _isCollision(x, y) {
        for (let i = 0; i < obstacles.length; i++) {
            if (checkObjectsCollsion(x, y, obstacles[i])) {
                return true;
            }
          }
        return false;
    }

    moveTop() {
        const newY = this.y - PLAYER_MOVE_STEP;

        if (this._isMoveInBoundaries(this.x, newY)) {
            if (!this._isCollision(this.x, newY)) {
                this.y = newY;
                this._updatePosition();
            } else {
                this._updateLives();
            }
        }
    }

    moveRight() {
        const newX = this.x + PLAYER_MOVE_STEP;

        if (this._isMoveInBoundaries(newX, this.y)) {
            if (!this._isCollision(newX, this.y)) {
                this.x = newX;
                this._updatePosition();
            } else {
                this._updateLives();
            }
        }
    }

    moveBottom() {
        const newY = this.y + PLAYER_MOVE_STEP;

        if (this._isMoveInBoundaries(this.x, newY)) {
            if (!this._isCollision(this.x, newY)) {
                this.y = newY;
                this._updatePosition();
            } else {
                this._updateLives();
            }
        }
    }

    moveLeft() {
        const newX = this.x - PLAYER_MOVE_STEP;

        if (this._isMoveInBoundaries(newX, this.y)) {
            if (!this._isCollision(newX, this.y)) {
                this.x = newX;
                this._updatePosition();
            } else {
                this._updateLives();
            }
        }
    }

    _updatePosition() {
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
    }

    _isMoveInBoundaries(x, y) {
        if (y < 0) {
            return false;
        }

        if (x < 0) {
            return false;
        }

        if (x > MAP_WIDTH - PLAYER_WIDTH) {
            return false;
        }

        if (y > MAP_HEIGHT - PLAYER_WIDTH) {
            return false;
        }
        return true;
    }
}

function checkObjectsCollsion(x, y, obstacle) {
    if (
      x < obstacle.x + obstacle.width &&
      x + PLAYER_WIDTH > obstacle.x &&
      y < obstacle.y + obstacle.height &&
      y + PLAYER_HEIGHT > obstacle.y
    ) {
      return true;
    }
  
    return false;
  }

const p1 = new Player();
