
var fs = require('fs');
fs.readFile("../bb.txt","utf-8",function (error,data) {
    if (error) throw error;
    console.log(data);
})