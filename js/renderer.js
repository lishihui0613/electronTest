// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const http=require('http');
const TabGroup = require('electron-tabs');
const path = require('path');
const fs = require('fs');
const dragula = require("dragula");
let tabGroup = new TabGroup({
    ready: function (tabGroup) {
        dragula([tabGroup.tabContainer], {
            direction: "horizontal"
        });
    }
});
const contentView = document.querySelector('.etabs-views');
const content = contentView.querySelector('.content');

var aDiv=content.getElementsByTagName('div');

// 页面初始化
let tab = tabGroup.addTab({
    title:'首页',
    // src:'./page/setup.html',
    visible: true,
    active:true,
    closable:false,

});

//用node的fs模块读取数据
var nav=document.getElementById('nav');
var aLi=nav.getElementsByTagName('li');

/*for(var i=0;i<aLi.length;i++){
    aLi[i].addEventListener('click',function (e) {
        /!*fs.exists('../../moduleTest/page/setup.html',function (exists) {
         console.log(exists)
         });
         fs.readFile('../../moduleTest/page/setup.html','utf-8',function (error,data) {
         if (error) throw error;
         console.log(data);

         })*!/
        var arr=[];
        var len=document.getElementsByClassName("etabs-tab").length;
        for(i=0;i<len;i++){
            (function(i){
                var aaa=document.getElementsByClassName("etabs-tab")[i];
                // console.log(aaa)
                var a=aaa.getElementsByClassName("etabs-tab-title")[0];
                var content=a.innerHTML;
                arr.push(content);
                // console.log(arr)
            })(i)
        }
        for(i=0;i<arr.length;i++){
            if(arr[i]==this.title){
                return;
            }
        }
        e && e.stopPropagation();
        let tab = tabGroup.addTab({
            title: this.title,
            src: this.id,
            visible: true,
            active: true,
            ready:function () {
                content.style.display='none';
            }
        });
    })
}*/
//实现封装tabs功能
function tabs(curEle) {
    for(var i = 0;i<curEle.length;i++){
        curEle[i].addEventListener('click',function (e) {
            var arr=[];
            var len=document.getElementsByClassName("etabs-tab").length;
            for(i=0;i<len;i++){
                (function(i){
                    var aaa=document.getElementsByClassName("etabs-tab")[i];
                    // console.log(aaa)
                    var a=aaa.getElementsByClassName("etabs-tab-title")[0];
                    var content=a.innerHTML;
                    arr.push(content);
                    // console.log(arr)
                })(i)
            }
            for(i=0;i<arr.length;i++){
                if(arr[i]==this.title){
                    return;
                }
            }
            e && e.stopPropagation();
            let tab = tabGroup.addTab({
                title: this.title,
                src: this.id,
                visible: true,
                active: true,
                ready:function () {
                    /*for(i=0;i<aDiv.length;i++){
                     aDiv[i].style.display='none';
                     }*/
                    content.style.display='none';
                }
            });
        })
    }
}

//实现添加tab，tab不重复
console.log(aDiv);
tabs(aLi);
tabs(aDiv);
/*for(var i=0;i<aDiv.length;i++){
    var cur=aDiv[i];
    cur.addEventListener('click',function (e) {
        var arr=[];
        var len=document.getElementsByClassName("etabs-tab").length;
        for(i=0;i<len;i++){
            (function(i){
                var aaa=document.getElementsByClassName("etabs-tab")[i];
                // console.log(aaa)
                var a=aaa.getElementsByClassName("etabs-tab-title")[0];
                var content=a.innerHTML;
                arr.push(content);
                // console.log(arr)
            })(i)
        }
        for(i=0;i<arr.length;i++){
            if(arr[i]==this.title){
                return;
            }
        }
        e && e.stopPropagation();

        //点击页面时，实现添加tab并隐藏首页
        let tab = tabGroup.addTab({
            title: this.title,
            src: this.className,
            visible: true,
            active: true,
            ready:function () {
                /!*for(i=0;i<aDiv.length;i++){
                    aDiv[i].style.display='none';
                }*!/
                content.style.display='none';
            }
        });
    })
}*/


tabGroup.on("tab-active", function(tab, tabGroup){
    if(tab.title=='首页'){
        /*for(i=0;i<aDiv.length;i++){
            aDiv[i].style.display='block';
        }*/
        content.style.display='block';
    }else {
        /*for(i=0;i<aDiv.length;i++){
            aDiv[i].style.display='none';
        }*/
        content.style.display='none';
    }
});



/*document.querySelector('.etabs-buttons').addEventListener('click',function(e){
    e && e.stopPropagation();
    let tab = tabGroup.addTab({
        title: 'new Tab',
        src: 'https://www.baidu.con',
        visible: true,
        active: true
    })
    // contentView.innerHTML = "这是第" + (1 + tab.id) + '个tab';

})*/


/*tabGroup.on("tab-removed", (tab, tabGroup) => {
    console.log(tab,tabGroup)
});*/

 /*tabGroup.on("tab-removed", (tab, tabGroup) => {
    // contentView.innerHTML = "这是第" + (1 + tab.id) + '个tab';
});

tabGroup.on("tab-active", (tab, tabGroup) => {
    // contentView.innerHTML = "这是第" + (1 + tab.id) + '个tab';
});*/



