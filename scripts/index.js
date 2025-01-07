const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [ // tương đương với 7 viên gạch
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white', // để setup khi không có khối gạch nào chiếm board
];
const KEY_CODES = { // lưu hướng
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
};
const WHITE_COLOR_ID = 7; // vị trí màu trắng trong mảng

const BRICK_LAYOUT = [ // khai báo viên gạch
    [ // viên thứ 1
        [ // mặc định
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [ // xoay phải
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];





const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d'); // để sử dụng canvas

ctx.canvas.width = COLS * BLOCK_SIZE; // set kích thước
ctx.canvas.height = ROWS * BLOCK_SIZE;

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = false;
        this.isPlaying = false;

        this.clearAudio = new Audio('../sounds/clear.wav'); // âm thanh
    }

    reset() {
        this.score = 0;
        this.grid = this.generateWhiteBoard();
        this.gameOver = false;
        this.drawBoard();
    }

    generateWhiteBoard() { // trả về 1 array gồm 20 phần tử
        return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
    }

    drawCell(xAxis, yAxis, colorId) { // vẽ 1 ô
        // xAxis => 1 yAxis => 1
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = 'black'; // bọc ô
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);// vẽ viền
    }

    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }

    handleCompleteRows() { // kiểm tra đủ 1 hàng
        const latestGrid = board.grid.filter((row) => { // row => []
            return row.some(col => col === WHITE_COLOR_ID);
        });

        const newScore = ROWS - latestGrid.length; // => newScore = tổng cộng hàng đã hoàn thành
        const newRows = Array.from({ length: newScore }, () => Array(COLS).fill(WHITE_COLOR_ID));

        if (newScore) {
            board.grid = [...newRows, ...latestGrid];
            this.handleScore(newScore * 10);

            this.clearAudio.play();
            console.log({ latestGrid });
        }
    }

    handleScore(newScore) { // cập nhật điểm
        this.score += newScore;
        document.getElementById('score').innerHTML = this.score;   
    }

    handleGameOver() { // xử lý game over
        this.gameOver = true;
        this.isPlaying = false;
        showGameOverScreen();

        const gameOverAudio = new Audio('../sounds/gameover.wav');
        gameOverAudio.play();
    }
    resetScore() {
        this.score = 0;
        document.getElementById('score').textContent = '0';
    }
}

class Brick { // vẽ gạch
    constructor(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id];
        this.activeIndex = 0;
        this.colPos = 3; // vị trí của viên gạch
        this.rowPos = -2;
    }

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id);
                }
            }
        }
    }

    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
                }
            }
        }
    }

    moveLeft() {
        if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos--;
            this.draw();
        }
    }

    moveRight() {
        if (!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    }

    moveDown() {
        if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++;
            this.draw();

            return;
        }

        this.handleLanded();
        generateNewBrick();
    }

    rotate() {
        if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % 4])) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % 4;

            this.draw();
        }
    }
    
    checkCollision(nextRow, nextCol, nextLayout) { // phát hiện va chạm
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[0].length; col++) {
                if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
                    if (col + nextCol < 0 || col + nextCol >= COLS || row + nextRow >= ROWS || board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID)
                        return true;
                }
            }
        }
        return false;
    }

    handleLanded() {
        if (this.rowPos <= 0) {
            board.handleGameOver();
            return;
        }

        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.grid[row + this.rowPos][col + this.colPos] = this.id;
                }
            }
        }

        board.handleCompleteRows();
        board.drawBoard();
    }
}

// hàm game over
function showGameOverScreen() { 
    const gameOverScreen = document.getElementById('game-over-screen');
    const finalScoreElement = document.getElementById('final-score');
    finalScoreElement.textContent = board.score;
    gameOverScreen.style.display = 'flex';
}

// hàm tạo viên gạch ngẫu nhiên  
function generateNewBrick() {  
    const fallingAudio = new Audio('../sounds/falling.wav');   
    brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length); // tạo ra 1 id bất kì nằm từ 0 -> 6
    fallingAudio.play();
}

// Lưu điểm
function saveData() {
    var inputData = document.getElementById('name-text').value;
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'scripts/save_data.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Dữ liệu đã được lưu.');
      }
    };
    
    var data = data - board.score;
    xhr.send(data);
}

board = new Board(ctx);
board.drawBoard();

// nút chơi
const playButton = document.getElementById('play');
playButton.addEventListener('click', () => {
    if (playButton.textContent === 'Play') {
        board.reset();
        board.isPlaying = true;
        // Set isPaused = false khi bat dau game
        isPaused = false; 
        pauseButton.style.display = 'block';
        pauseButton.textContent = 'Pause';
        playButton.textContent = 'Restart';
        board.resetScore();

        generateNewBrick();

        const refresh = setInterval(() => {
            if (!board.gameOver  && board.isPlaying && !isPaused) {
                brick.moveDown();
            } else {
                clearInterval(refresh); // ngung lap lai di chyen vien gach
            }
        }, 1000);
    } else if (playButton.textContent === 'Restart') {
        board.reset();
        board.isPlaying = false;
        // Set isPaused = false khi bat dau game
        isPaused = false; 
        pauseButton.style.display = 'none';
        pauseButton.textContent = 'Pause';
        playButton.textContent = 'Play';
        board.resetScore();
    }
})

// nút dừng
let isPaused = false; 
const pauseButton = document.getElementById('pause');
let intervalId;
pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;

    if (isPaused) {
        pauseButton.textContent = 'Continue';
        clearInterval(intervalId); // dừng vòng lặp
    } else {
        pauseButton.textContent = 'Pause';
        intervalId = setInterval(() => { // Resume vòng lặp game
            if (!board.gameOver && board.isPlaying && !isPaused) {
                brick.moveDown();
            }
        }, 1000);
    }
});

// nút restart ở màn hình game over
const restartButton = document.getElementById('restart-btn');
restartButton.addEventListener('click', () => {
    const gameOverScreen = document.getElementById('game-over-screen');
    gameOverScreen.style.display = 'none';
    pauseButton.style.display = 'none';
    board.reset();
    board.resetScore();

    board.isPlaying = false;
    playButton.textContent = 'Play';
});

//save data
function validateInput() {
    let inputElement = document.querySelector('.form-input');
    let errorElement = document.querySelector('.error-message');
    if(inputElement.value === "") {
        errorElement.innerHTML = "Please enter your name before saving";
    }
    else {
        errorElement.innerHTML = "";
    }
}

const saveButton = document.getElementById('save-btn');
saveButton.addEventListener('click', () => {
    const gameOverScreen = document.getElementById('game-over-screen');
    validateInput();

    let errorElement = document.querySelector('.error-message').innerText;
    console.log(errorElement);
    if(errorElement === ""){
        let name = document.getElementById("name").value;
        let score = board.score;
        console.log(name, score);
        let listResult = localStorage.getItem("list-result") ? JSON.parse(localStorage.getItem("list-result")) : [];
        listResult.push({
            name: name,
            score: score
        })
        localStorage.setItem("list-result", JSON.stringify(listResult));
    }
    document.getElementById("name").value = "";
    gameOverScreen.style.display = 'none';
    pauseButton.style.display = 'none';
    board.reset();
    board.resetScore();

    board.isPlaying = false;
    playButton.textContent = 'Play';
});

function compareScore(obj1, obj2) {
    // Lấy giá trị "score" từ hai đối tượng
    const score1 = obj1.score;
    const score2 = obj2.score;
  
    // So sánh giá trị "score" của hai đối tượng và trả về kết quả
    if (score1 < score2) {
      return -1; // obj1 có điểm thấp hơn obj2
    } else if (score1 > score2) {
      return 1; // obj1 có điểm cao hơn obj2
    } else {
      return 0; // Hai đối tượng có cùng điểm
    }
  }

function renderResults(){
    let listResult = localStorage.getItem("list-result") ? JSON.parse(localStorage.getItem("list-result")) : [];
    listResult.sort(compareScore);
    listResult.reverse();
    listResult.forEach(element => {
        console.log(element);
    });

    let result = "<tr><th>Rank</th><th>Name</th><th>Score</th></tr>";

    listResult.map((value, index) => {
        result += `<tr><td>${index+1}</td><td>${value.name}</td><td>${value.score}</td></tr>`;
    })

    document.getElementById('table-content').innerHTML = result;
}

// nút lịch sử điểm
const historyButton = document.getElementById('score-history-btn');
historyButton.addEventListener('click', () => {
    const historyScreen = document.querySelector('#history-screen.game-over-screen');
    console.log(historyScreen)
    historyScreen.style.display = "block";
    renderResults();
});

const exitButton = document.getElementById('exit-btn');
exitButton.addEventListener('click', () => {
    const historyScreen = document.getElementById('history-screen');
    historyScreen.style.display = "none";
});

document.addEventListener('keydown', (e) => {
    if (!board.gameOver && board.isPlaying) {
        
        switch (e.code) {
            case KEY_CODES.LEFT:
                brick.moveLeft();
                break;
            case KEY_CODES.RIGHT:
                brick.moveRight();
                break;
            case KEY_CODES.DOWN:
                brick.moveDown();
                break;
            case KEY_CODES.UP:
                brick.rotate();
                break;
            default:
                break;
        }
    }
});

const upButton = document.getElementById('up-btn');
upButton.addEventListener('click', () => {
    brick.rotate();
});
const downButton = document.getElementById('down-btn');
downButton.addEventListener('click', () => {
    brick.moveDown();
});
const leftButton = document.getElementById('left-btn');
leftButton.addEventListener('click', () => {
    brick.moveLeft();
});
const rightButton = document.getElementById('right-btn');
rightButton.addEventListener('click', () => {
    brick.moveRight();
});