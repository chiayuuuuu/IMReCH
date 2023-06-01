const fileUploader = document.getElementById('file-uploader');
const fileList = document.getElementById('file-list');
const uploadBtn = document.getElementById('uploadBtn');
const confirmBtn = document.getElementById('confirmBtn');
const nowDate =new Date();

let fileArray = [];

uploadBtn.addEventListener('click', function(){
    fileList.innerHTML = '';
    fileUploader.value = '';
});

fileUploader.addEventListener('change', (event) => {
    const files = event.target.files;

    console.log('files', files);
    console.log('length='+files.length)

    // 顯示上傳的檔名及大小
    let str = '';
    for(let i = 0; i < files.length; i++){
        let filename = `${files[i].name}`;
        let size = (`${files[i].size}`/ 1024 / 1024).toFixed(2);
        str += '<li>檔案名稱：' + filename + '</li><li>檔案大小：' + size + 'MB</li>';
        if(files.length > 1){
            str += '<p>---------------------------------</p>'
        }
        let fname = {};
        fname.filename = filename; // 新增 filename 屬性並將 filename 值存入 filename 屬性
        fileArray.push(fname);
    }
    fileList.innerHTML = str;
});

confirmBtn.addEventListener('click',addLi);
//方法2：用createElement建立li元素，再通過setAttribute設定元素屬性，最後通過appendChild()方法新增在父元素的最後一個子節點上。
//建立li標籤，包含顯示姓名，郵箱，電話號碼及刪除按鈕
function addLi() {
    console.log('fileArray.length='+fileArray.length)
    console.log(fileArray)
    for(let i = 0 ; i < fileArray.length; i++){
        var li_1 = document.createElement("li");
        li_1.setAttribute("class", "flex flex-column flex-lg-row align-items-lg-center");
        let vname = fileArray[i].filename.replace('.mp4','').replace('.mov','');
        addSpan(li_1, vname);
        addSpan1(li_1, nowDate.getMonth()+1 + '/' + nowDate.getDate());
        addSpan2(li_1, "編輯");
        addDelBtn(li_1);
        document.getElementById("J_List").appendChild(li_1);
    }
    while (fileArray.length) { // 清空fileArray
        fileArray.pop();
    }
}
//為姓名或郵箱等新增span標籤，好設定樣式
function addSpan(li, text) {
    var span_1 = document.createElement("span");
    span_1.setAttribute("class", "lecture-title")
    span_1.innerHTML = '<p>' + text + '</p>';
    li.appendChild(span_1);
}
function addSpan1(li, text) {
    var span_1 = document.createElement("span");
    span_1.setAttribute("class", "lectures-time text-center")
    span_1.innerHTML = text;
    li.appendChild(span_1);
}
function addSpan2(li, text) {
    var span_1 = document.createElement("span");
    span_1.setAttribute("class", "lectures-preview")
    span_1.innerHTML = '<a class="btn" href="/course/alter/">'+text+'</a>';
    li.appendChild(span_1);
}
function addDelBtn(li) {
    var span_1 = document.createElement("span");
    span_1.setAttribute("class", "lectures-time text-center")
    var button = document.createElement("a");
    // botton.setAttribute("type", "button");
    button.setAttribute("class", "btn");
    button.setAttribute("onclick", "delBtnData(this)");
    button.innerHTML = "刪除";
    span_1.appendChild(button);
    li.appendChild(span_1);
}
//為刪除按鈕新增刪除節點功能
function delBtnData(obj) {
    var ul = document.getElementById("J_List");
    var oLi = obj.parentNode.parentNode;
    //obj.parentNode指刪除按鈕的span層
    //obj.parentNode.parentNode為li層
    ul.removeChild(oLi);
}
