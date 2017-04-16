var addon = require('./build/Release/addon');


function fDataCb(level, message)
{
	console.log('[' + level + '] : ' + message);
}

// 设置接收数据地址
var addres = addon.setCallBack(fDataCb);
console.log(addres);

// 打开设备
var nOpenRes = addon.openDevice(1, 1);
console.log(nOpenRes);