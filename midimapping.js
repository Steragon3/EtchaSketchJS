const TURN_DIRECTIONS = {
    RIGHT: 65,
    LEFT: 63
}
const INPUTS = {
    JOG_WHEEL_RIGHT: 177,
    JOG_WHEEL_LEFT: 176
}
let points = [];

let canvas = document.getElementById("canvas")
let actualheight = canvas.getBoundingClientRect().height
let actualwidth = canvas.getBoundingClientRect().width
canvas.width = actualwidth
canvas.height = actualheight
let x = canvas.width/2
let y = canvas.height/2
let ctx = canvas.getContext('2d')

ctx.clearRect(0,0,actualwidth, actualheight)

ctx.fillStyle = "black"
ctx.strokeStyle ="black"
console.log(actualheight)

let drawPoints = () => {
    ctx.beginPath()
    var i = 0;

    points.forEach(({x,y}, i) => {
        if(i == 0) ctx.moveTo(x,y)
        else {
            ctx.lineTo(x,y)
        }
    })
    
    ctx.stroke();
}

let drawCircle = (x,y) => {
    ctx.beginPath()
    ctx.arc(x,y, 5,0,Math.PI*2)
    ctx.clos
    ctx.stroke();
}

drawCircle(x,y);



let redraw = () => {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.fillStyle = "black"
    drawCircle(x,y)
    drawPoints()
}

let capCoordinates= () => {
    if(x < 5) x = 5
    if(y < 5) y = 5
    if(y >= actualheight-5) y = actualheight-5
    if(x >= actualwidth-5) x = actualwidth-5

    return {x,y}
}

let handleJogWheel = ({type, controlchange, details}) => {

    if(type == INPUTS.JOG_WHEEL_LEFT){
        switch(details){
            case TURN_DIRECTIONS.LEFT:
                y++
                break;
            case TURN_DIRECTIONS.RIGHT:
                y--;    
                break;
        }
        points.push(capCoordinates())
    }
    if(type == INPUTS.JOG_WHEEL_RIGHT){
        switch(details){
            case TURN_DIRECTIONS.LEFT:
                x--
                break;
            case TURN_DIRECTIONS.RIGHT:
                x++    
                break;
        }
        points.push(capCoordinates())
    }
}

export default function map (input){
    let [type, controlchange, details] = input
    switch (type){
        case INPUTS.JOG_WHEEL_RIGHT:
        case INPUTS.JOG_WHEEL_LEFT:
            handleJogWheel({type, controlchange, details})
            break
        default:
            return
    }

    redraw()
}