let fs = require('fs');
let retrace = require('retrace');

let stack = `TypeError: Cannot set property 'innerHTML' of null at callback (https://q.aiyongbao.com/trade/2.9.58/web/build/pages/trade/index.js:1:378224) at https://q.aiyongbao.com/trade/2.9.58/web/build/pages/trade/index.js:1:18167 at <anonymous>\t
`;


const  regVersionNum = /\d+\.\d+\.\d+/g;
let versions = [...new Set(stack.match(regVersionNum))];
const  path = 'D:/workspace/tradepcr/sourceMaps/';
versions.map(item=>{
    let sourceMapTrade = fs.readFileSync(path+item+'/pages/trade/index.map', 'utf8');
    let sourceMapWW = fs.readFileSync(path+item+'/pages/wwindex/index.map', 'utf8');
    retrace.register(`https://q.aiyongbao.com/trade/${item}/web/build/pages/wwindex/index.js`, sourceMapWW)
    retrace.register(`https://q.aiyongbao.com/trade/${item}/web/build/pages/trade/index.js`, sourceMapTrade)
})


stack = stack.replace(/\sat/g,'\nat');
stack = stack.replace('(<anonymous>)','');
console.log(stack);

retrace.map(stack).then(function(stack) {
    console.log(stack); // Log the re-mapped stack trace
})