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

// let value = parseText("But told you, I don't wanna go there I think you feel good, yeah, I think you're so sweet But you're thinking this all too seriously")


// console.log(writeLine(generateWordPairs(value),10))

// console.log(generatePoem("Yeah Sunday morning, rain is falling Steal some covers, share some skin Clouds are shrouding us in moments unforgettable You twist to fit the mold that I am in But things just get so crazy Living life gets hard to do And I would gladly hit the road, get up and go if I knew",25))


// console.log(parseText('            In the town where I was born
// Lived a man who sailed to sea
// And he told us of his life
// In the land of submarines
// So we sailed up to the sun
// 'Til we found a sea of green
// And we lived beneath the waves
// In our yellow submarine
// We all live in a yellow submarine
// Yellow submarine, yellow submarine
// We all live in a yellow submarine
// Yellow submarine, yellow submarine
// And our friends are all aboard'))