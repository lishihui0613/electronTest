// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const TabGroup = require('electron-tabs');
const dragula = require("dragula");
let tabGroup = new TabGroup({
    ready: function (tabGroup) {
        dragula([tabGroup.tabContainer], {
            direction: "horizontal"
        });
    }
});
const contentView = document.querySelector('.etabs-views');


// 页面初始化
let tab = tabGroup.addTab({
    title:'首页',
    src:'./page/first.html',
    visible: true,
    active:true,
    closable:false,
    ready:function () {

    }

});


/*
for(var i=0;i<aDiv.length;i++){
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
        let tab = tabGroup.addTab({
            title: this.title,
            src: this.className,
            visible: true,
            active: true
        });
    })
}
*/






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


