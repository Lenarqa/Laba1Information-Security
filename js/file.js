const input = document.querySelector('input[type="file"]');
input.addEventListener('change', (e)=>{
    console.log(input.files);

    const reader = new FileReader();

    reader.onload = ()=>{
        // получаем исходный текст из файла и выводим его на сайт
        let inputText = reader.result.split('\n');

        let clearInputText = inputText.filter( item => {
            if((item != '\r') && (item != '')) {
                return item;
            }
        });
        
        let divInput = document.getElementById('main');
        let i = 0;
        while(i < clearInputText.length) {
            var p = document.createElement("p");
            p.classList = 'outputStyle';
            p.innerHTML = clearInputText[i];
            divInput.appendChild(p);
            i++
        }
        
        //Зашифровываем текст из файла
        let outputText = Encrypt(clearInputText);
    }
    reader.readAsText(input.files[0], 'UTF-8');
},false);

function Encrypt(clearInputText) {
    let res = [[]];
    let outputText = clearInputText.map(i => i);
    let letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 
        'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];

    let letfRight = document.getElementById('leftRight').value; //получаем направление;
    let step = document.getElementById('step').value; //получаем шаг
    // console.log('step '+ typeof step + " = " + step);

    switch (letfRight) {
        case 'left':
            for (let i = 0; i < clearInputText.length; i++) {
                console.log("clearInputText.length = " + clearInputText.length);
                console.log("clearInputText[0].length = " + clearInputText[0].length);

                for (let j = 0; j < clearInputText[i].length; j++) {
                    let letterIndex = letters.indexOf(clearInputText[i][j].toUpperCase());
                    console.log(letterIndex)

                    if(letterIndex == 0 && clearInputText[i][j] != ' ') {
                        console.log('letterIndex == 0');
                        res[i][j] = letters[letters.length - step];
                        console.log(res);
                    }else if((letterIndex - step == 0) && (clearInputText[i][j] != ' ')) {
                        console.log('letterIndex - step == 0');
                        res[i][j] = letters[0];
                        console.log(res);
                    }else if ((letterIndex - step < 0) && (clearInputText[i][j] != ' ')) {
                        console.log('letterIndex - step < 0');
                        while(letterIndex > -1) {
                            letterIndex--;
                        }

                        console.log("letterIndex = " + letterIndex);
                        console.log("letters.length = " + letters.length)
                        let newIndex = letters.length + letterIndex;
                        console.log('newIndex = ' + newIndex);
                        res[i][j] = letters[newIndex];
                        console.log(res);
                    }else if(clearInputText[i][j] == ' '){
                        res[i][j] = '*';
                    }else {
                        res[i][j] = letters[letterIndex - step];
                    }
                }
            }
            console.log("==== result ==== ");
            console.log(res);
            break;

        case 'right':
            console.log('----- right -----');

            for (let i = 0; i < clearInputText.length; i++) {
                console.log("clearInputText= " + clearInputText);
                // console.log("clearInputText[0].length = " + clearInputText[0].length);
                // console.log('letter lenght = ' + letters.length);
                // console.log('letter[32] = ' + letters[32]);
                console.log('begin');

                for (let j = 0; j < clearInputText[i].length; j++) {
                    let letterIndex = letters.indexOf(clearInputText[i][j].toUpperCase());
                    // console.log(letterIndex)

                    if(letterIndex == 32 && clearInputText[i][j] != ' ') {
                        console.log('letterIndex == 0');
                        res[i][j] = letters[step-1];
                        console.log(res);
                    }else if((letterIndex + Number.parseInt(step) == 32) && (clearInputText[i][j] != ' ')) {
                        console.log('letterIndex + step == 32');
                        res[i][j] = letters[32];
                        console.log(res);
                    }else if ((letterIndex + Number.parseInt(step) > 32) && (clearInputText[i][j] != ' ')) {
                        console.log('letterIndex + step > 32');
                        let newLetterIndex = 0;
                        newLetterIndex = (letterIndex + Number.parseInt(step)) - 32;
                        console.log("letterIndex = " + letterIndex);
                        console.log("Step = " +  step);
                        console.log("newLetterIndex = " + newLetterIndex);
                        res[i][j] = letters[newLetterIndex];
                        console.log(res);

                    }else if(clearInputText[i][j] == ' '){
                        res[i][j] = '*';
                    }else {
                        res[i][j] = letters[letterIndex + Number.parseInt(step)];
                    }
                }
            }
            console.log("==== result ==== ");
            console.log(res);

        break;
    }

    return outputText;
}