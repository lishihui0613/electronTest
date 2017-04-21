
var http=require('http');
var path = require('path');
var fs = require('fs');

var ary=[];
console.log(http,path,fs);
alert(1)
fs.exists('../../moduleTest/config/config.ini',function (exists) {
    console.log(exists)
});
fs.readFile('../../moduleTest/config/config.ini','utf-8',function (error,data) {
    var data=data;
    if (error) throw error;
    console.log(data);
    ary.push(data);
    fs.writeFile('../moduleTest/config/config.txt',data,function (error) {
        if(error){
            console.error(error);
        }else {
            console.log('成功');
        }
    })
})
module.exports={ary:ary};

