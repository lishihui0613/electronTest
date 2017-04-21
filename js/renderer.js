// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var TabGroup = require('electron-tabs');
var http=require('http');
var path = require('path');
var fs = require('fs');
var dragula = require("dragula");
let tabGroup = new TabGroup({
    ready: function (tabGroup) {
        dragula([tabGroup.tabContainer], {
            direction: "horizontal"
        });
    }
});
var contentView = document.querySelector('.etabs-views');
var content = contentView.querySelector('.content');
var etabsTab = document.querySelector('.etabs-tabgroup');
var resite = etabsTab.getElementsByClassName('resite')[0];
var aDiv=content.getElementsByTagName('div');

// 页面初始化
let tab = tabGroup.addTab({
    title:'首页',
    // src:'./page/setup.html',
    visible: true,
    active:true,
    closable:false,

});

//实现封装tabs功能
var nav=document.getElementById('nav');
var aLi=nav.getElementsByTagName('li');
var ary=[];
fs.exists('../../moduleTest/config/config.ini',function (exists) {
    console.log(exists)
});
fs.readFile('../../moduleTest/config/config.ini','utf-8',function (error,data) {
    var data=data;
    if (error) throw error;
    console.log(data);
    ary.push(data);
    console.log(ary)
    fs.writeFile('../moduleTest/config/config.txt',data,function (error) {
        if(error){
            console.error(error);
        }else {
            console.log('成功');
        }
    })
})

/*for(var i=0;i<aLi.length;i++){
    aLi[i].addEventListener('click',function (e) {*/

        /*var arr=[];
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
var eTabs=document.getElementsByClassName('etabs-tabs');
var eTab=document.getElementsByClassName('etabs-tab');
console.log(eTab)
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
                    // eTab[i].className='active';
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
                },
            });
            console.log(this.id)

        })
    }
}

//实现添加tab，tab不重复

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
        content.style.display='block';
    }else {
        content.style.display='none';
    }
});

tabGroup.on("tab-removed",function (tab,tabGroup) {
    console.log(tab,tabGroup)
})
/*resite.onclick=function () {
    alert(1)
}*/




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
});

tabGroup.on("tab-removed", (tab, tabGroup) => {
    // contentView.innerHTML = "这是第" + (1 + tab.id) + '个tab';
    console.log(tab,tabGroup)
});

tabGroup.on("tab-active", (tab, tabGroup) => {
    // contentView.innerHTML = "这是第" + (1 + tab.id) + '个tab';
    console.log(tab,tabGroup)
});*/



