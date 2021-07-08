const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    // write your solution here
    expr = expr.replace(/11/g, '-');
    expr = expr.replace(/10/g, '.');
    expr = expr.replace(/0/g, '_');
    expr = expr.replace(/\*/g, ' ');
    expr = expr.replace(/          /g, '#');

    let oneLet = '';
    let phrase = '';
    let num = '';
    let oneStr, endStr, superStr = '';

    if ( expr.includes('#') ) {

        for (let i = 0; i < expr.length; i++) {

            if (expr[i] != '_' && expr[i] != '#') {

                oneLet += expr[i];

            } else if (expr[i] == '_' && expr[i] != '#' && oneLet != '') {

                if (MORSE_TABLE[oneLet]) {
                    phrase += MORSE_TABLE[oneLet];

                    oneLet = '';
                } else {

                    for (let i = 0; i <= oneLet.length; i++) {

                        num += oneLet[i];

                        if ( (i + 1) % 5 == 0) {

                            phrase += MORSE_TABLE[num];

                            num = '';
                        }
                    }
                }

            } else if (expr[i] == '#' && oneLet != '') {

                if (MORSE_TABLE[oneLet]) {

                    phrase += MORSE_TABLE[oneLet] + ' ';

                    oneLet = '';
                } else {

                    for (let i = 0; i <= oneLet.length; i++) {

                        num += oneLet[i];

                        if ( (i + 1) % 5 == 0) {

                            phrase += MORSE_TABLE[num];

                            num = '';
                        }
                    }
                }

            } else if (expr[i] == '#' && oneLet == '') {

                phrase += ' ';
            } 
        }

        if (MORSE_TABLE[oneLet]) {

            phrase += MORSE_TABLE[oneLet];
        } else {

            for (let i = 0; i <= oneLet.length; i++) {

                num += oneLet[i];

                if ( (i + 1) % 5 == 0) {

                    phrase += MORSE_TABLE[num];

                    num = '';
                }
            }
        }

    } else {


        expr = expr.split('_');
        arr = [];

        // очистим массив от пустых элементов
        for (let i = 0; i < expr.length; i++) {

            if (expr[i] != "") {

                arr.push(expr[i]);
            }
        }
        
        // распарсим массив
        for (let val of arr) {

            oneStr = val;

            if (oneStr.length < 5) { // буквы-одиночки

                phrase += MORSE_TABLE[val];

            } else { // буква и цифры

                while (oneStr.length > 5) {

                    endStr = oneStr.substr( oneStr.length - 5, 5 );

                    oneStr = oneStr.substring(0, oneStr.length - 5);

                    superStr += MORSE_TABLE[endStr];
                } 
                
                superStr += MORSE_TABLE[oneStr];
                
                superStr = superStr.split("").reverse().join("");

                phrase += superStr;

                superStr = '';
            }
        }
    }

    return phrase;
}

module.exports = {
    decode
}