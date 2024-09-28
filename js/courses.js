
function setLang(code)
{
    window.localStorage.setItem("lang",code);
    location.reload();
}
function getLang()
{
    if(window.localStorage.getItem("lang")=== null)
    window.localStorage.setItem("lang","vi-VN");
    return window.localStorage.getItem("lang");
}
function showLabel()
{
    //var lang="vi-VN";
    var lang=getLang();
    $('.multilang').each(function(i, obj) {
    $("#"+obj.id).html(labels[obj.id][lang]).attr("title",labels[obj.id][lang]);
});
}
// function regCourse(idx){
//     alert(idx)
//  }
// function showCourseList()
// { var lang=getLang();
// $.each(courseList,function(i, obj) {
// btn="<td><div class='d-grid gap-2'><button class='btn btn-success btn-lg' onclick='regCourse(\""+i+"\")'><i class='far fa-check-square'> </i> </button></div> </td>";
// $("#course_list").append("<tr> <td>"+obj.code+"</td> <td>"+obj.name[lang]+"</td> </td> <td class='text-end'>"+(new
// Date(obj.startDate)).toLocaleDateString(lang)+"</td> <td class='text-end'>"+(new
// Date(obj.endDate)).toLocaleDateString(lang)+"</td><td class='text-end'>"+(new
// Intl.NumberFormat(lang, { style: 'decimal'}).format(obj.fee[lang]))+"</td>"+btn+"</tr>");
// });
// }

$(document).ready(function () {
    $('body').addClass('loaded');
    showLabel();
    // showCourseList("course_list", 0);
});