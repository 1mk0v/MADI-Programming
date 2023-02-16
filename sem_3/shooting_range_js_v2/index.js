
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//КОНСТАНТЫ
const SPEED = 10; //10px in 500 milliseconds
const STEP = SPEED+3;
const GAME_INTERVAL = 500;
const CASE_STRENGTH = 5; //Прочность корпуса/Жизни

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let blasterOpt;
let blaster;
let ship;
let space;
let score = 0;
let millenniumFalcon; //сокол тысечелетия
let mousePositionX=0;
let mousePositionY=0;
let lastBlasterPositionX = 0;
let lastBlasterPositionY = 0;
let interval; 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', eventsListeners);

function eventsListeners() {
    ship = document.getElementById('spaceship'); 
    let shipIMG = document.getElementById('spaceshipIMG') //Изображение корабля
    blaster = document.getElementById('blaster'); 
    blasterOpt = blaster.getBoundingClientRect(); //Метод Element.getBoundingClientRect() возвращает размер
                                                  //элемента и его позицию относительно viewport (часть страницы,
                                                  // показанная на экране, и которую мы видим).
    space = spaceSize(); //Возвращает объект. Объект — это набор свойств, и каждое свойство состоит из имени и значения.
    millenniumFalcon = new Ship(CASE_STRENGTH, ship, shipIMG); //Созадю экземпляр класса Ship и передаю ему значение прочности корпуса
                                                                //+ элемент корабля, элемент изображения корабля
                                                                //Экземпляр — это объект, содержащий данные и поведение, описанные классом.
    millenniumFalcon.startPositionOfShip(); //Вызываю метод экземпляра, который поставит корабль в его начальные позиции
    millenniumFalcon.startLife(); //Вызываю метод экземпляра, который поставит жизни/прочность корпуса кораблю в интерфейсе

    //Метод EventTarget.addEventListener() регистрирует определённый обработчик события, вызванного на EventTarget.
    //EventTarget может быть Element, Document, Window, или любым другим объектом, поддерживающим события
    document.addEventListener('keydown', keyboardControl); 
    //Обработчики событий на mousemove и click должны быть относительно поля, чтобы он возвращал свойства событий относительно него
    //Например event.offsetX - положение мыши от левого края элемента, в котором он вызван, до курсора. Возвращается в пикселях
    document.getElementById('space').addEventListener("mousemove", mouseMove);
    document.getElementById('space').addEventListener('click', millenniumFalcon.hit.bind(millenniumFalcon)); 
    //Метод bind() создаёт новую функцию,
    // которая при вызове устанавливает в качестве контекста выполнения this предоставленное значение (millenniumFalcon). 
    interval = setInterval(GameRun, GAME_INTERVAL); //Запускаю GameStart c игровым интервалом в GAME_INTERVAL миллисекунд
    //Он циклически вызывает функцию или участок кода с фиксированной паузой между каждым вызовом. Уникальный идентификатор
    //intervalID, возвращаемый методом, позволяет впоследствии удалить запущенный setInterval c помощью clearInterval()
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Классы в JS - разновидность функций 
class Ship {

    //В теле класса, что заключено в фигурные скобки {}, объявляют члены класса (конструктор и методы)

    //Констуруктор - специальный метод, необходимый для создания и инициализации объектов, созданных, с помощью класса. 
    //При создании экземпляра класса, в сам класс можно передавать значения, которые можно будет вытащить из конструктора

    constructor(life,hero,heroIMG) { //Тут я создаю конструктор
        //This указывает на объект, который выполняет текущий кусок JavaScript-кода.
        //Другими словами, this – это ссылка на текущий контекст выполнения. 
        this.life = life, //this указывает на класс Ship
        this.ship = hero,
        this.shipIMG = heroIMG,
        this.shipPositions = this.ship.getBoundingClientRect(); 
    }
    
    startLife() { //Тут объявляю метод класса Ship
        this.lineLife = document.getElementById('lineLife').style; //Свойство style задает стили через JS код
        this.procentOfLife = 100/this.life; //Вычисляю сколько процентов содержит 1 жизнь 
        this.lineLife.width = `${this.procentOfLife*this.life}%` //Длине линии жизни ставлю 100%, чтобы она полностью заполнила div блок
    }

    startPositionOfShip() {
        //lastShipPositionX/Y будет отвечать за последнюю позицию, где находился корабль, чтобы дальше от данной позиции делать шаги
        this.lastShipPositionX = space.width/2 - this.shipPositions.width/2; //Ширина космоса/2 - ширина корабля/2 (середина по оси X)
        this.lastShipPositionY = space.height/2 - this.shipPositions.height/2;//Высота космоса/2 - Высота корабля/2 (середина по оси Y)
        this.ship.style.left = `${this.lastShipPositionX}px`; //Позиция корабля от левого края поля
        this.ship.style.top = `${this.lastShipPositionY}px`;//Позиция корабля от верхнего края поля
    }

    flying() {
        //Новые пути
        let newPathX = this.newRandomPath(); //Берет новое занчение пути
        let newPathY = this.newRandomPath(); //Берет новое занчение пути

        //Через цикл задаю метод setTimeout, который вызывает функцию или выполняет фрагмент кода после указанной задержки.
        // Цикл позволяет сделать вызвать 10 функций с задержкой в time миллисекунд
        //С каждым новым вызовом time увеличивается на 50 
        for (let time = 0; time < GAME_INTERVAL; time+=50) {
            
            //Передвижение
            setTimeout(() => {
                let newShipPositionX = this.lastShipPositionX + newPathX;//Новоя позиция по оси Х
                let newShipPositionY = this.lastShipPositionY + newPathY;//Новоя позиция по оси Y
                
                //Пока новая позиция выходит за пределы поля по оси Х
                while (newShipPositionX < 0 || newShipPositionX > space.width - this.shipPositions.width) {
                    newPathX = this.newRandomPath(); // генерируй новый путь
                    newShipPositionX = this.lastShipPositionX + newPathX; // и прибавляй этот путь к старой позиции по оси Х
                }
                
                //Тоже самое только для оси Y
                while (newShipPositionY < 0 || newShipPositionY > space.height - this.shipPositions.height) {
                    newPathY = this.newRandomPath();
                    newShipPositionY = this.lastShipPositionY + newPathY;
                }
                
                //Поверни изображение на какое-то кол-во градусов 
                this.shipIMG.style.transform = `rotate(${this.rotateTo(newPathX, newPathY)}deg)`;

                this.ship.style.left = `${newShipPositionX}px`; //Присваиваю новую позицию по оси Х
                this.ship.style.top = `${newShipPositionY}px`; //Присваиваю новую позицию по оси Y

                this.lastShipPositionX = newShipPositionX; //Старой позиции присваиваю новую (обновляю старую) по оси X
                this.lastShipPositionY = newShipPositionY; //Старой позиции присваиваю новую (обновляю старую) по оси Y
                
                //Обновляю позиции корабля
                this.shipPositions = this.ship.getBoundingClientRect();
            }, time);
        }
    }

    newRandomPath() {
        let newPath = [-SPEED, 0, SPEED];
        return newPath[Math.floor(Math.random() * 3)]; //Возвразаю рандомно элемент массива newPath
        //Math.random() случайно возвращает число в промежутке от 0 включительно до 1 не включительно [0,1)
        //Маth.random() * 3 - данное выражение позволяет созадать новый числовой промежуток [0,3]
        //Math.floor округляет в меньшую сторону
        //Math.floor(Math.random() * 3) - случайно вернет одно из трех чисел 0, 1, 2
    }

    //Уничтожен ли корабль?
    isDestroyed() {
        if (this.life <= 0) { //Если жизней 0 или меньше нуля, то да
            return true
        }
    }

    // Выстрел произведен
    hit() {
        this.shots() //Счетчик выстрелов
        if (this.isShootMe()) { //Подстрелили ли меня?
            this.life--; //Отнимаем жизни на одну единицу 
            this.lineLife.width = `${this.procentOfLife*this.life}%`; //Присваиваем новые проценты ширины линии жизней
        }

        if (this.isDestroyed()) { //Если уничтожен
            gameOver();//Тогда заканчивай игру
        }

    }

    //Прибавляем выстрелы
    shots() {
        if (!this.isDestroyed()) { //Если корабль не уничтожен
            score++; //Добавляем счетчик выстрелов на 1
        }
        document.getElementById('scoreNum').innerHTML = score; //Меняем содержимое элемента scoreNum на score
    }

    //Подстрелили ли меня?
    isShootMe() {
        let bool = blasterOpt.left > this.shipPositions.left - blasterOpt.width/2 && //вернет true, если вертикаль середины бластера левее левого края корабля 
        blasterOpt.right < this.shipPositions.right + blasterOpt.width/2 && //вернет true, если вертикаль середины бластера левее правого края корабля
        blasterOpt.top > this.shipPositions.top - blasterOpt.height/2 && //вернет true, если горизонталь середины бластера ниже верхнего края корабля
        blasterOpt.bottom < this.shipPositions.bottom + blasterOpt.height/2; //вернет true, если горизонталь середины бластера выше нижнего края корабля
        //Вернет true, если центр бластера находится на корабле
        return bool
    }

        //Повернуть картинку
        rotateTo(x, y) {
            let degrees;
            //Движение вверх
            if (x == 0 && y < 0) {
                degrees = '0';
                return degrees;
            }
            //Движение в верхний правый угол
            if (x > 0 && y < 0) {
                degrees = '45';
                return degrees;
            }
            //Движение вправо
            if (x > 0 && y == 0) {
                degrees = '90';
                return degrees;
            }
            //Движение в нижний правый угол
            if (x > 0 && y > 0) {
                degrees = '135';
                return degrees;
            }
            //Движение вниз
            if (x == 0 && y > 0) {
                degrees = '180';
                return degrees;
            }
            //Движение в нижний левый угол
            if (x < 0 && y > 0) {
                degrees = '225';
                return degrees;
            }
            //Движение влево
            if (x < 0 && y == 0) {
                degrees = '270';
                return degrees;
            }
            //Движение в верхний левый угол
            if (x < 0 && y < 0) {
                degrees = '315';
                return degrees;
            }
        }
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GameRun() {
    millenniumFalcon.flying(); //Вызываю метод flying() экзепляра millenniumFalcon 
}

function gameOver() {
    clearInterval(interval); //Удаляю интервал 
    ship.remove(); //Удаляю элемент корабля
    restartGame(); 
}

function restartGame() {
    document.getElementById("life").remove();//Удаляю жизни
    document.getElementById('score').remove(); //Удаляю счетчик выстрелов
    let div = document.createElement('div'); //Создаю элемент div
    div.innerHTML = 'RESTART GAME' //Призваю значению элемента div текст
    div.id = 'restart'; //Присваиваю id
    div.style.cursor = 'pointer'; //Ставлю стили курсора
    document.getElementById('interface').append(div); //Добавляю новый div элемент в элемент с id interface
    document.getElementById('restart').addEventListener('click', restart); //Ставлю обработчик событий
}

function restart() {
    location.reload();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mouseMove(event) {
    blasterOpt = blaster.getBoundingClientRect(); // Обновляю положения бластера
    mousePositionX = event.offsetX; //Расстояние от левого края элемента космоса до курсора. Возвращается в пикселях 
    mousePositionY = event.offsetY; //Расстояние от верхнего края элемента космоса до курсора. Возвращается в пикселях
    lastBlasterPositionX = mousePositionX+space.startX-blasterOpt.width/2; //Ставлю центр бластера на курсор по оси Х
    lastBlasterPositionY = mousePositionY+space.startY-blasterOpt.height/2; //Ставлю центр бластера на курсор по оси Y
    blaster.style.left = `${lastBlasterPositionX}px`; //Позиция бластера относительно левого края поля
    blaster.style.top = `${lastBlasterPositionY}px`; //Позиция бластера относительно правого края поля
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function spaceSize() {
    let space = document.getElementById('space'); //Возвратит элемент с данным id 
    let height = space.getBoundingClientRect().height; //Возратит высоту объекта
    let width = space.getBoundingClientRect().width; //Возратит ширину объекта
    let startLeft = space.getBoundingClientRect().left; //Возратит расстояние от левого края окна до элемента block
    let startY = space.getBoundingClientRect().top; //Возратит расстояние от верхнего края окна до элемента block
    // Возвращаю объект со свойствами (имя:значение). После к значениям можно будет обратиться через точку
    return {height: height, 
            width: width,
            startX: startLeft,
            startY: startY};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function keyboardControl(event) {

    switch (event.key) {
        case 'w':
        case 'ц':
            toUP();
            break;
        case 'a':
        case 'ф':
            toLEFT();
            break;
        case 'd':
        case 'в':
            toRIGHT();
            break;
        case 's':
        case 'ы':
            toDOWN();
            break;
        case ' ':
            toHIT();
            break;
    }
}

function toUP() {
    blasterOpt = blaster.getBoundingClientRect(); // Обновляю положения бластера
    if (lastBlasterPositionY - STEP  > space.startY) { //Если новая позиция верхнего края бластера по оси Y больше
                                                       //(значит бластер ниже) позиции верхнего края космоса 
        lastBlasterPositionY -= STEP; //тогда делай шаг
        blaster.style.top = `${lastBlasterPositionY}px`;
    }
}

function toLEFT() {
    blasterOpt = blaster.getBoundingClientRect(); // Обновляю положения бластера
    if (lastBlasterPositionX - STEP > space.startX) {//Если новая позиция левого края бластера по оси X больше 
                                                     //(значит бластер правее) позиции левого края космоса
        lastBlasterPositionX -= STEP; //тогда делай шаг
        blaster.style.left = `${lastBlasterPositionX}px`;
    }
}

function toRIGHT() {
    blasterOpt = blaster.getBoundingClientRect(); // Обновляю положения бластера
    if (lastBlasterPositionX + STEP < space.startX+space.width-blasterOpt.width) { //Если новая позиция правого края бластера по оси X меньше 
                                                                                   //(значит бластер левее) позиции правого края космоса
        lastBlasterPositionX += STEP; //тогда делай шаг
        blaster.style.left = `${lastBlasterPositionX}px`;
    }
}

function toDOWN() {
    blasterOpt = blaster.getBoundingClientRect(); // Обновляю положения бластера
    if (lastBlasterPositionY + STEP < space.startY+space.height-blasterOpt.height) {//Если новая позиция нижнего края бластера по оси Y меньше 
                                                                                    //(значит бластер выше) позиции нижнего края космоса
        lastBlasterPositionY += STEP; //тогда делай шаг
        blaster.style.top = `${lastBlasterPositionY}px`;
    }
}

function toHIT() {
    millenniumFalcon.hit(); // Произвожу выстрел
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


