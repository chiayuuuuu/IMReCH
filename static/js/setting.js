//        //选择文件完毕的回调
//        function inputFile(obj) {
 
//         const file = obj.files[0];
//         var reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = function () {
//             $("#avatar").attr("src", this.result);
//         }
//     }
    
//     //提交表单数据
//     function saveInfo(){
//             //jquery对象转js对象
//             const avatarFile = $('btn-file')[0].files[0];

//             var form = new FormData();
//             form.append('name', $('#name').val());
//             form.append('avatar', avatarFile);
//             form.append('mobile', $('#mobile').val());
//             form.append('unit', $('#unit').val());
    
//             form.append('email', $('#email').val());

//             postRequest("UpdateUserInfo", form, (result)=>{
//                    location.reload(true)
//             })
//     }

//     // 头像预览
//     $("#avatar_file").change(function () {//avatar_file  input[file]的ID
//     // 获取上传文件对象
//     var file = $(this)[0].files[0];
//     // 读取文件URL
//     var reader = new FileReader();
//     reader.readAsDataURL(file);
//     // 阅读文件完成后触发的事件
//     reader.onload = function () {
//         // 读取的URL结果：this.result
//         $("#avatar_img").attr("src", this.result);//avatar_img  img标签的ID
//     }
// });
    