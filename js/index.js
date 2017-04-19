
var fs = require('fs');
fs.readFile("../index.html","utf-8",function (error,data) {
    if (error) throw error;
    console.log(data);
})