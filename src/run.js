import {SCMod} from "./sc-mod.js";

function trimQuotes(s){
    if(s[0] === '"' || s[0] === "'" ){
        s = s.substring(1)
    }
    if(s[s.length - 1] === '"' || s[s.length - 1] === "'" ){
        s = s.substring(0,s.length - 1)
    }
    return s
}
function splitString(s){
    // console.log(s)
    let pairs = {
        '}': '{',
        ']': '[',
        ')': '('
    }
    let openers = Object.values(pairs)
    let cloerse = Object.keys(pairs)
    let brackets = []
    let substrings = []
    let last = 0

    for(let l = 0; l < s.length; l ++){
        if(openers.includes(s[l])){
            brackets.push(s[l])
        }
        else if(cloerse.includes(s[l])){
            let lastBracket
            do{
                lastBracket = brackets.pop()
            }
            while(brackets.length && lastBracket !== pairs[s[l]])
        }
        else if(brackets.length === 0 && s[l] === ','){
            substrings.push(...resolveStringInterpolations(s.substring(last, l)))
            last = l+1
        }
    }
    substrings.push(...resolveStringInterpolations(s.substring(last, s.length)))
    return substrings
}
function resolveStringInterpolations(s){
    let a = s.indexOf('{')
    let b = s.lastIndexOf('}')
    if (a === -1 || b === -1) {
        return [s]
    }
    let suffix = s.substring(0,a)
    let postfix = s.substring(b+1)
    let interolation = s.substring(a+1, b)
    let substrings = splitString(interolation)
    return substrings.map(ss => suffix + ss + postfix)
}

let args = process.argv.slice(2);
(async function processArguments(argv){
    let mod = new SCMod()

    for(let i = 0 ; i< argv.length; i++){
        switch(argv[i]){
            case '--read':
                let files = splitString(trimQuotes(argv[++i]))
                await mod.read(...files)
                break;
            case '--write':
                await mod.write(argv[++i])
                break;
        }
    }
})(args)