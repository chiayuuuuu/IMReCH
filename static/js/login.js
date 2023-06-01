const userid = document.getElementById('username');
const submit = document.getElementById('btn_login');
submit.addEventListener('click',function (){
    console.log('uid='+userid.value)
    let data = [];
    // 從localStorage取資料，若無資料則為空陣列 []
    let getData = localStorage.getItem("onlinePeople");
    if(getData){
        data = JSON.parse(getData);
    } else {
        data = [];
    }

    // 將每筆資料儲存成物件，再存入data
    let student = {};
    student.sid = userid.value; // 新增 sid 屬性並將 userid 值存入 sid 屬性
    data.push(student);
    })


function updateList(){
    let dataStr = JSON.stringify(data);
    // 每次改變資料後儲存到localStorage(之後改成連接資料庫) ~~~~~待改~~~~~~~~~~
    localStorage.setItem('onlinePeople',dataStr);
}

// // 清空localdata(待刪除)
// $("#clear").click(function(){
//     if (confirm('是否確定登出?') == false) {return}
//     localStorage.clear();
// });