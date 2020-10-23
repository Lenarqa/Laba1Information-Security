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
    let letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 
        'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];

    let letfRight = document.getElementById('leftRight').value; //получаем направление;
    let step = document.getElementById('step').value; //получаем шаг

    switch (letfRight) {
        case 'left':
            for (let i = 0; i < clearInputText.length; i++) {

                for (let j = 0; j < clearInputText[i].length; j++) {
                    let letterIndex = letters.indexOf(clearInputText[i][j].toUpperCase());

                    if(letterIndex == 0 && clearInputText[i][j] != ' ') {
                        res[i][j] = letters[letters.length - step];
                    }else if((letterIndex - step == 0) && (clearInputText[i][j] != ' ')) {
                        res[i][j] = letters[0];
                    }else if ((letterIndex - step < 0) && (clearInputText[i][j] != ' ')) {
                        while(letterIndex > -1) {
                            letterIndex--;
                        }

                        let newIndex = letters.length + letterIndex;
                        res[i][j] = letters[newIndex];
                    }else if(clearInputText[i][j] == ' '){
                        res[i][j] = '*';
                    }else {
                        res[i][j] = letters[letterIndex - step];
                    }
                }
            }

            document.querySelector('.result-btn').addEventListener('click', ()=>{
                var text = String.toString(res);
                document.write(
                    '<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(text) + '" download="text.txt">text.txt</a>'
                )
            });
            break;

        case 'right':

            for (let i = 0; i < clearInputText.length; i++) {


                for (let j = 0; j < clearInputText[i].length; j++) {
                    let letterIndex = letters.indexOf(clearInputText[i][j].toUpperCase());

                    if(letterIndex == 32 && clearInputText[i][j] != ' ') {
                        res[i][j] = letters[step-1];
                    }else if((letterIndex + Number.parseInt(step) == 32) && (clearInputText[i][j] != ' ')) {
                        res[i][j] = letters[32];
                    }else if ((letterIndex + Number.parseInt(step) > 32) && (clearInputText[i][j] != ' ')) {
                        let newLetterIndex = 0;
                        newLetterIndex = (letterIndex + Number.parseInt(step)) - 32;
                        res[i][j] = letters[newLetterIndex];
                    }else if(clearInputText[i][j] == ' '){
                        res[i][j] = '*';
                    }else {
                        res[i][j] = letters[letterIndex + Number.parseInt(step)];
                    }
                }
            }

        document.querySelector('.result-btn').addEventListener('click', ()=>{
            for(var i=0; i < res.length; i++) {
               res[i] = res[i].join('');
            }

            document.write(
                '<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(res) + '" download="text.txt">text.txt</a>'
            )
        });
        break;
    }
}


