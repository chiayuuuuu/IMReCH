const courseDiv = document.getElementById("courseDiv");
var courseRequest = new XMLHttpRequest();
var imgRequest = new XMLHttpRequest();
var userRequest = new XMLHttpRequest();
let user_id = 0;

//取得圖片
let img=[];
imgRequest.open('GET','http://127.0.0.1:8000/api/image/?format=json');
imgRequest.onload = function(){
    img = JSON.parse(imgRequest.responseText);
};
imgRequest.send();

//取得誰上線
userRequest.open('GET','http://127.0.0.1:8000/api/user/?format=json');
userRequest.onload = function(){
    let udata = JSON.parse(userRequest.responseText);
    user_id = checkOnline(udata,user_id);
    //抓取課程資訊
    courseRequest.open('GET','http://127.0.0.1:8000/api/schedule/?format=json');
    courseRequest.onload = function(){
        let data = JSON.parse(courseRequest.responseText);
        renderHTML(data,img,user_id);
    };
    courseRequest.send();
};
userRequest.send();

function checkOnline(data,user_id){
    for(let i = 0; i < data.length; i++){
        if(data[i].online=='true'){
            user_id = data[i].uid;
            break;
        }
    }
    return user_id;

}

function renderHTML(data,img,user_id){
    let str = '';
    for(let i = 0; i<data.length; i++){
        if(data[i].uid == user_id){
            str +='<div class="col-12 col-md-3 px-25">' +
            '<div class="course-content">' +
            '<figure class="course-thumbnail">' +
            '<a href="/course/">' +
            '<img src="' + img[0].photo + '">'+
            '</a>' +
            '</figure><!-- .course-thumbnail -->' +
            '<div class="course-content-wrap">' +
            '<header class="entry-header">' +
            '<h2 class="entry-title">'+data[i].cid + data[i].cname + '</h2>' +
            '<div class="entry-meta flex flex-wrap align-items-center">' +
            '<div class="course-author">' + data[i].teacher + '</div>' +
            '<div class="course-date">' + data[i].ctime + '</div>' +
            '</div><!-- .course-date -->' +
            '</header><!-- .entry-header -->' +
            '</div><!-- .course-content-wrap -->' +
            '</div><!-- .course-content -->' +
            '</div><!-- .col -->';
        }
    }
    courseDiv.innerHTML = str;
}

// GetSession();
// function GetSession() {
//     var storage = window.top.sessionStorage;
//     var sessionId = storage.getItem("UNEXPECTED_TERMINATION");
//     alert(sessionId);
//
// }