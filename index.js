let fs = require('fs');
let retrace = require('retrace');

let stack = fs.readFileSync('./stack.txt','utf8');
let config = JSON.parse(fs.readFileSync('./config.json','utf8'));
console.log(stack);

const regVersionNum = /\d+\.\d+\.\d+/g;
let versions = [...new Set(stack.match(regVersionNum))];
const path = config.sourceMapDir;
versions.map(item => {
    try{
        let sourceMapTrade = fs.readFileSync(path+item+'/pages/trade/index.map','utf8');
        retrace.register(`https://q.aiyongbao.com/trade/${item}/web/build/pages/trade/index.js`,sourceMapTrade)

    } catch (e){
        console.log(e);
    }
    try{
        let sourceMapWW = fs.readFileSync(path+item+'/pages/wwindex/index.map','utf8');
        retrace.register(`https://q.aiyongbao.com/trade/${item}/web/build/pages/wwindex/index.js`,sourceMapWW)

    } catch (e){
        console.log(e);
    }
})


stack = stack.replace(/\sat/g,'\nat');
stack = stack.replace('(<anonymous>)','');


retrace.map(stack).then(function(stack){
    console.log(stack); // Log the re-mapped stack trace
    fs.writeFileSync('./stack_parsed',stack);
})