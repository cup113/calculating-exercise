var datas1 = {
    1: ["四位数加四位数", "七位数加七位数", "十位数加十位数", "15位数加15位数", "25位数加25位数", "40位数加40位数"],
    2: ["六位数加六位数", "4个六位数连加", "6个六位数连加", "10个六位数相加", "15个六位数相加", "25个六位数相加"],
    3: ["一、一、一位数连乘", "两、两、一位数连乘", "三、两、两位数连乘", "三、三、三位数连乘", "四、四、四位数连乘", "六、六、六位数连乘"],
    4: ["两位数乘两位数", "3个两位数连乘", "4个两位数连乘", "5个两位数连乘", "7个两位数连乘", "10个两位数连乘"],
    5: ["11-19的平方", "11-39的平方", "11-99的平方", "41-999的平方", "41-9999的平方", "101-999999的平方"]
},
datas2 = ["入门", "初级", "中级", "高级", "专家", "大师"];

if (localStorage.num == undefined){localStorage.num = 11;}
if (localStorage.questionsNum == undefined){localStorage.questionsNum = 5;}
var num = parseInt(localStorage.num),
questionsNum = parseInt(localStorage.questionsNum);
$("#item").val(Math.floor(num / 10));
$("#questionNum").val(questionsNum)

function change_item(){
    var itemQ = $("#item"),
    item = parseInt(itemQ.val()),
    diffQ = $("#diff"),
    diffs = datas1[item];
    diffQ.html("");
    for (let i in diffs){
        let newOption = $(`<option value='${parseInt(i)+1}'>(${datas2[i]}) ${diffs[i]}</option>`);
        newOption.appendTo(diffQ);
    }
}
change_item();
$("#diff").val(num % 10);

function submit(){
    var itemQ = $("#item"),
    diffQ = $("#diff"),
    quesNumQ = $("#questionNum"),
    item = parseInt(itemQ.val()),
    diff = parseInt(diffQ.val()),
    num = item * 10 + diff, // 识别码
    quesNum = parseInt(quesNumQ.val());
    if (isNaN(num)){
        alertN("请选择合法的项目和难度！");
        return;
    }
    if (isNaN(quesNum)){
        alertN("请在题目数量中输入数字！");
        return;
    }
    if (quesNum <= 0 || quesNum > 100){
        alertN("请输入1-100的题目数量！");
        return;
    }
    localStorage.num = num;
    localStorage.questionsNum = quesNum;
    url = `../exercise/index.html?${num}&${quesNum}`;
    location.href = url;
}