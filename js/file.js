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

                for (let j = 0; j < clearInputText[0].length; j++) {
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

            // console.log("res = " + res);
            // for (let i = 0; i < clearInputText.length; i++) {
            //     for (let j = 0; j < clearInputText[i].length; j++) {
            //         // console.log("1. clear test = " + [j] + " " + clearInputText[i][j]);
            //         let index = letters.indexOf(clearInputText[i][j].toUpperCase());
            //         console.log(`index = ${index}`);
                   
            //         if(index == 0 && clearInputText[i][j] != ' ') {
            //             // console.log("(index == 0) || (index - step == 0)")
            //             res.push(letters[letters.length - step]);
            //         }else if ((index - step == 0) && (clearInputText[i][j] != ' ')){
            //             res.push(letters[index - step]);
            //         }else if(((index - step) < 0) && (clearInputText[i][j] != ' ')) {
            //             let tempIndex = index;

            //             // console.log('temp index = ' + tempIndex);
                        
            //             let leftStep = 0;
            //             while(tempIndex >= 0){
            //                 leftStep++;
            //                 tempIndex--;
            //             }
            //             // console.log("temp Index = " + tempIndex)

            //             index = letters.length + (index-leftStep);
                        
            //             // console.log("new index = " + index + " letters = " +  letters[index])
            //             res.push(letters[index]);
            //         }else if(clearInputText[i][j] == ' '){
            //             res.push('*');
            //         }else{
            //             outputText[i][j] = letters[index - step];
            //             res.push(letters[index - step]);
            //             // console.log(letters[index - step]);
            //         }
            //     }
            // }

            // res.pop(); // убираем знак переноса строки
            // console.log(res);
            break;

        case 'right':
            
            break;
    }

    return outputText;
}