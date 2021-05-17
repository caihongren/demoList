

console.log(name)
console.log(user)

var name='1'
let user='2'

function getPing(url) {
    return new Promise((resolve, reject) => {
        if (url == 'demo') {
            setTimeout(() => {
                resolve(url)
            }, 2000);

        } else {
            reject('url错误')
        }
    })
}

// getPing('demo').then(res=>{
//     console.log(res,'success')
// }).catch((errer)=>{
//     console.log(errer,'errer')
// })

function ajax(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest(); 
        req.open('GET', URL, true);
        req.onload = function () {
        if (req.status === 200) { 
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            } 
        };
        req.onerror = function () {
            reject(new Error(req.statusText));
        };
        req.send(); 
    });
}
// var URL = "http://txwx.tyjulink.com/ruoyi/reserveCard/insert2"; 
// ajax(URL).then(function onFulfilled(value){
//     console.log('内容是：' + value); 
// }).catch(function onRejected(error){
//     console.log('错误：' + error); 
// });


// Promise.all([getPing('url'),ajax(URL)]).then(res=>{
//     console.log(res,'aall')
// }).catch(error=>{
//     console.log(error,'错误')
// })