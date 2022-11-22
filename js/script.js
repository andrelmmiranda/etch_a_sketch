const componentSquare = (id)=>{
    const square = document.createElement('div')
    square.classList.add('square');
    square.id = id;
    return square;
};

const eventState = {
    mouseDown: false,
    mouseUp: true,
    setMouseDown: ()=> {
        eventState.mouseDown = true;
        eventState.mouseUp = false;
    },
    setMouseUp: ()=> {
        eventState.mouseDown = false;
        eventState.mouseUp = true;
    },
}

const paintState = {
    pencil: true,
    eraser: false,
    setPencil: ()=>{
        paintState.pencil = true;
        paintState.eraser = false;
    },
    setEraser: ()=>{
        paintState.pencil = false;
        paintState.eraser = true;
    }
}

const colorState = {
    color: '#000000',
    setColor: (color)=>{
        colorState.color = color;
    }
}

function changeColor(){
    const color = document.querySelector("[type='color']")
    color.addEventListener('change', ()=> colorState.setColor(color.value));
}

document.querySelector('.fa-palette').addEventListener('click', ()=>{
    document.querySelector("[type=color]").click();
    
    changeColor();
})

const n = document.querySelector("[type='range']").value;

drawGrid();

document.querySelector('.fa-pencil').classList.add('focus');

const p = document.querySelector('div > p');
p.innerHTML = `${n} x ${n}`;

const range = document.querySelector("input[type='range']")
range.addEventListener('mousedown', ()=>{
    range.addEventListener('mousemove', ()=>{
        if(eventState.mouseDown){
            const p = document.querySelector('div > p');
            p.innerHTML = `${range.value} x ${range.value}`;
            drawGrid();
        }
    })
});

function drawGrid(){
    const n = document.querySelector("[type='range']").value;
    const loop = Number(n) * Number(n);
    const grid = document.querySelector('.grid');

    grid.childElementCount === 0 ? generateGrid(grid, loop) : (deleteGrid(grid), generateGrid(grid, loop));

    addGridTemplate(grid, n);

    mouseDown();
    mouseUp();
    
    const squares = document.querySelectorAll('.square');
    squares.forEach(i => i.addEventListener('mouseover', ()=>{
        if(eventState.mouseDown && paintState.pencil){
            i.style.backgroundColor = colorState.color;
        } else if(eventState.mouseDown && paintState.eraser){
            i.style.backgroundColor = 'white'
        }
    }));

    squares.forEach(i => i.addEventListener('mousedown', ()=>{
        if(paintState.pencil){
            i.style.backgroundColor = colorState.color;
        } else if(paintState.eraser){
            i.style.backgroundColor = 'white'
        }
    }))
}

function addGridTemplate(grid, n){
    grid.style.gridTemplateColumns = `repeat(${Number(n)}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${Number(n)}, 1fr)`;
}

function deleteGrid(grid){
    grid.innerHTML = '';
}

function generateGrid(grid, loop){
    for(let i = 0; i < loop; i++){
        grid.appendChild(componentSquare(i+1));
    }
}

function mouseDown(){
    document.body.addEventListener('mousedown', ()=>{
        eventState.setMouseDown();
    });
}

function mouseUp(){
    document.body.addEventListener('mouseup', ()=>{
        eventState.setMouseUp();
    });
}

const pencil = document.querySelector('.fa-pencil')
pencil.addEventListener('click', ()=>{
    console.log('caneta')
    paintState.pencil = true;
    paintState.eraser = false;

    pencil.classList.add('focus');
    eraser.classList.remove('focus');
});

const eraser = document.querySelector('.fa-eraser')
eraser.addEventListener('click', ()=>{
    console.log('borracha')
    paintState.pencil = false;
    paintState.eraser = true;

    pencil.classList.remove('focus');
    eraser.classList.add('focus');
});

document.querySelector('.fa-broom').addEventListener('click', ()=>{
    document.querySelectorAll('.square').forEach(i => {
        i.style.backgroundColor = 'white';
    })
});
