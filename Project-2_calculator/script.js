let num1 = ''
let num2 = ''
let operator = ''
let total = ''

function calculator(key){
    let btn = key;
    if(btn === 'C' || btn === 'c'){
        num1 = num2 = operator = total = '';
        displayButton(total);
    }
    else if(btn == '='){
        handleEval();
    }
    else{
        displayButton(btn);
    }
}

document.addEventListener('keydown', (e) => {
    calculator(e.key);
});



$('button').on('click', (e) => {
    calculator(e.target.innerHTML);
});

$('input[name="color"]').change(() => {
    var buttonColor = $('input[name="color"]:checked').attr('id');
    $('.enter').css("background-color", buttonColor);
});

function handleEval(){
    var expr = $('.input').text()
    $('.input').text('');
    
    expr = expr.replace("×", "*");
    expr = expr.replace("÷", "/");
    expr = expr.replace("^", "**");
    
    try{
        total = eval(expr);
    }
    catch{
        total = "invalid";
    }
    
    displayButton(total);
}

function displayButton(btn){
    if(btn === '')
        $('.input').text(0);
    else{
        var temp = $('.input').text();
        if(temp == "Hi, Shashank" || temp == 0 || temp == "invalid" || temp == "Infinity")
            temp = '';
        $('.input').text(temp+btn);
    }
}