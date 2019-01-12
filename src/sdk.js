/*
*	位数不足用0补足
*   例子:  pad(100,4) = 0100
*/
function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

export{pad}