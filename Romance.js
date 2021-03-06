//function that take string and create array of the words
function parseText(str) {
    let array = str.replace(/[\r\n]+/g," ").replace(/[^A-Za-z' ]+/g,"").split(" ")
    return array
}

//function that takes an array of words and generate a markov chain. Generate dictionary
function generateWordPairs(arr) {
    let object = {}
    arr.forEach((word,index)=>{
        if(!Object.prototype.hasOwnProperty.call(object,word)){
            object[word]=[arr[index+1]]
        }
        else {
            object[word].push(arr[index+1])
        }
    })
    return object
}

//function writeLine that takes a markov chain(object) and a length of words n and returns a line of poetry
function writeLine(obj,n) {
    let arrOfKeys = Object.keys(obj)
    let result = [arrOfKeys[Math.floor(Math.random()*arrOfKeys.length)]]
    for(let i =1; i<n; i++){
        //console.log('result',result)
        result.push(markovWord(obj,result[result.length-1]))
    }
    return result.join(" ")+' \n'
}


//will need a helper function that takes a word and randomly chooses a word from its markov chain array
//if no entries in chain, the program should choose a new word
function markovWord(obj, word){
    
    let markovValue = obj[word]
    
    let arrOfKeys = Object.keys(obj)
    if (markovValue[0]===undefined){
        arrOfKeys.splice(arrOfKeys.indexOf(word),1)
        let newWord=arrOfKeys[Math.floor(Math.random()*arrOfKeys.length)]
        return newWord
    }
    else if(markovValue.length>1){
        return markovValue[Math.floor(Math.random()*markovValue.length)]
    }
    else {
        return markovValue[0]
    }
}

//function generatePoem
function generatePoem(wordCorpus,lines) {
    let dict = generateWordPairs(parseText(wordCorpus))
    let final = []
    for(let i=0;i<lines;i++){
        let line = writeLine(dict,Math.floor(Math.random()*5)+4)
        final.push(line)
    }
    return final.join ('')

}
function run(){
    generate.addEventListener('click',function(){
        let sss = document.getElementById('inputBox').value
        let poem = generatePoem(sss,document.getElementById('lines').value)   
        document.getElementById('daSauce').textContent=poem
    })

}
run()

