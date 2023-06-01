const player = videojs('my-video',{
    // sources:[{src:"testvideo.mp4", type:"video/mp4"}],
    autoplay: true,
    muted: true,
    loop: true, // loop循環播放
    controls: true,
    playbackRates: [0.5, 1, 1.5, 1.75, 2]
});
player.on("ready",()=>{
    player.muted = false;
});
const list = document.querySelector(".list");
const inputDiv = document.querySelector('.input_div');

player.markers({
    markerTip: {
        display: true,
        text: function(marker) {
            return marker.text;
        }
    },
    markers: [
    ],
    markerStyle: {
        'width':'7px',
        'border-radius': '30%',
        'background-color': 'orange'
    },
    
});

// 新增
$("#add").click(function(){
    // 去除毫秒
    let mark_time = Math.floor(player.currentTime());
    addNote(mark_time);
});

// 時間轉換函式
function transTime(mark_time) {
    let hour = 0, min = 0, sec = 0;
    sec = mark_time % 60;
    min = parseInt(mark_time / 60) % 60;
    hour = parseInt(mark_time / (60 * 60));
    if (hour < 10) { hour = "0" + hour; }
    if (min < 10) { min = "0" + min; }
    if (sec < 10) { sec = "0" + sec; }
    return hour + ":" + min+":" + sec;
}

// 新增筆記fun
let input = '', btn='', time='';
let data = [];
// 從localStorage取資料，若無資料則為空陣列 []
let getData = localStorage.getItem("localData_note");
if(getData){
    data = JSON.parse(getData);
} else {
    data = [];
}

function addNote(mark_time){
    let time = mark_time;
    let input = `<input type="text" id="input_note" placeholder="請輸入筆記...">`;
    let btn =`<button id="add_content"style="background:#19c880;color:#fff;border:#19c880;border-radius:2px;">新增</button>`;
     
    

    //button顏色
    player.pause();
    // 點擊時出現 現在時間 & input + button
    inputDiv.innerHTML = `<p>現在時間：${ transTime(time) }</p>` + input +"\n"+ btn ;

    const addContent = document.querySelector("#add_content");
    const input_note = document.querySelector("#input_note");
    addContent.addEventListener('click',getContent);
    // 點擊時觸發 getContent
    function getContent(){
        let content = input_note.value;
        //如果 input 裡面是空值
        if (input_note.value == "") {           
            alert("您未輸入事項"); //會跳 alert 視窗
            return;
        }
        // 將 input 存入時間軸
        player.markers.add([{
            time: time,
            text: content,
        }]);  
        // 將每筆資料儲存成物件，再存入data
        let note = {};
        note.time = time; // 新增 time 屬性並將 time 值存入 time 屬性
        note.content = content; // 新增 content 屬性並將 content 值存入 content 屬性
        data.push(note); 
        // 更新資料後刷新畫面
        updateList();
        // 輸入後清空 input 標籤
        inputDiv.innerHTML = '';
        // 繼續播放影片
        player.play();
    }
} 
// 畫面渲染: 只執行畫面
function updateList(){
    // 資料排序
    data = data.sort(function(a,b) {
        return a.time > b.time ? 1 : -1;
    });
    let str = '';
    for(let i=0;i<data.length;i++){            
        str += `<li class="text" id="text${i}" data-num=${i}>${transTime(data[i].time)} -> ${data[i].content}
                    <div class="editdiv${i} editdiv" style="display: none;">                   
                        <button id="edit${i}" 
                        style="background:#19c880;color:#fff;border:#19c880;border-radius:2px;" >
                        編輯
                        </button>
                        <button id="delete${i}"
                        style="background:#19c880;color:#fff;border:#19c880;border-radius:2px;">
                        刪除
                        </button>
                    </div>
                </li>`;
    }
    list.innerHTML = str;
    // 將 data 轉成 JSON 格式以便儲存
    let dataStr = JSON.stringify(data);
    // 每次改變資料後儲存到localStorage(之後改成連接資料庫) ~~~~~待改~~~~~~~~~~
    localStorage.setItem('localData_note',dataStr);
}
// 初始化畫面(顯示之前的資料)
updateList();
// 當影片播放時，就會顯示已存的時間軸
// 因 player.markers.add 為動態函式，無法自動執行，用 player.on "playing" 觸發
player.on("playing",()=>{
    for(let i=0; i<data.length; i++){
        let mark_time = data[i].time;
        let content = data[i].content;
        player.markers.add([{
            time: mark_time,
            text: content,
        }]);              
    }
})

// 點選下方筆記可編輯 對應時間軸
list.addEventListener('click',modify);
function modify(e){
    // 如果點擊的不是 li 就用 return 中斷，不讓程式繼續執行
    if(e.target.nodeName != 'LI'){return};
    // 抓取第幾筆資料
    let num = e.target.dataset.num;
    let text = document.querySelector("#text" + num);
    const edit = document.querySelector('#edit' + num);
    const del = document.querySelector('#delete' + num);
    // 當點擊某個 li 時，出現編輯 & 刪除按鈕，並讓其他 li 裡的按鈕消失
    let editDiv = document.querySelector(".editdiv" + num);
    let editDivs = document.querySelectorAll(".editdiv"); // querySelectorAll -> 選取所有的元素，並存為陣列
    // 若點擊 li 的按鈕 display = "none", 隱藏其他按鈕並顯示該 li 的按鈕
    if(editDiv.style.display == "none"){
        editDivs.forEach(item => item.style.display = "none");
        editDiv.style.display = "inline"; // inline 行內元素，擺在同一行
    } else{
        editDiv.style.display = "none";
    }
    let time = data[num].time;
    let content = data[num].content;
    // 點擊筆記，影片會跳轉到該筆記時間
    player.currentTime(time);

    // 編輯筆記Btn
    edit.addEventListener('click',editNote);
    function editNote(){
        editDiv.style.display = "none";
        input = `<input type="text" id="input_note" placeholder="請輸入筆記..." value=${data[num].content}>`;
        // 點擊時出現 現在時間 & input + button
        inputDiv.innerHTML = `<p>現在時間：${transTime(data[num].time)}</p>` + input +"\n"+ `<button id="save" style="background:#19c880;color:#fff;border:#19c880;border-radius:2px;">儲存</button>`;
        const save = document.querySelector('#save');
        let inputNote = document.querySelector('#input_note');
        // 儲存更改內容
        save.addEventListener('click',saveNote);
        function saveNote(){
            data[num].content = inputNote.value;
            updateList();
            inputDiv.innerHTML = '';
        }
    } 

    // 刪除筆記
    del.addEventListener('click', delNote);
    function delNote(){
        // window.confirm('是否確定刪除?');
        if (confirm('是否確定刪除?') == false) {return}
        data.splice(num, 1);
        updateList();
        player.markers.remove([num]);
        player.markers.reset(data);
    }
}


// 清空localdata(待刪除)
$("#clear").click(function(){
    if (confirm('是否確定刪除所有筆記內容?') == false) {return}
    list.innerHTML='';
    localStorage.clear();
});

$("#prev").click(function(){
    player.markers.prev();
    player.pause();
});
$("#next").click(function(){
    player.markers.next();
    player.pause();
});
// $("#remove").click(function(){
//     player.markers.remove([0]);
// });

$("#output").click(function(){
    // note+=$("#note").val();
    // console.log(note);
})

//搜尋功能
(function(document) {
    'use strict';
  
    // 建立 LightTableFilter
    var LightTableFilter = (function(Arr) {
  
      var _input;
  
      // 資料輸入事件處理函數
      function _onInputEvent(e) {
        _input = e.target;
        var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
        Arr.forEach.call(tables, function(table) {
          Arr.forEach.call(table.tBodies, function(tbody) {
            Arr.forEach.call(tbody.rows, _filter);
          });
        });
      }
  
      // 資料篩選函數，顯示包含關鍵字的列，其餘隱藏
      function _filter(row) {
        var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
        row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
      }
  
      return {
        // 初始化函數
        init: function() {
          var inputs = document.getElementsByClassName('light-table-filter');
          Arr.forEach.call(inputs, function(input) {
            input.oninput = _onInputEvent;
          });
        }
      };
    })(Array.prototype);
  
    // 網頁載入完成後，啟動 LightTableFilter
    document.addEventListener('readystatechange', function() {
      if (document.readyState === 'complete') {
        LightTableFilter.init();
      }
    });
  
  })(document);
  //
