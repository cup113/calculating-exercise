var datas1 = {
    1: ["四位数加四位数", "七位数加七位数", "十位数加十位数", "15位数加15位数", "25位数加25位数", "40位数加40位数"],
    2: ["六位数加六位数", "4个六位数连加", "6个六位数连加", "10个六位数相加", "15个六位数相加", "25个六位数相加"],
    3: ["一、一、一位数连乘", "两、两、一位数连乘", "三、两、两位数连乘", "三、三、三位数连乘", "四、四、四位数连乘", "六、六、六位数连乘"],
    4: ["两位数连乘", "3个两位数连乘", "4个两位数连乘", "5个两位数连乘", "7个两位数连乘", "10个两位数连乘"],
    5: ["11-19的平方", "11-39的平方", "11-99的平方", "41-999的平方", "41-9999的平方", "101-999999的平方"]
},
datas2 = ["入门", "初级", "中级", "高级", "专家", "大师"];

var tmp = location.href.split("?")[1].split("&"),
number = parseInt(tmp[0]),
quesNum = parseInt(tmp[1]),
type = Math.floor(number / 10),
diff = number % 10,
time = 0,
correctTimes = 0,
answerTimes = 0,
nowQuestionNum = 0,
correctAnswer, thisStartTime, thisEndTime, thisAnswerTimes, startTime;
$("body>h2").text(`速算练习-${datas1[type][diff - 1]}-${quesNum}题`);
$("#progressall").text(quesNum.toString())

var filter_notend0 = ((a) => !(a.toString().endsWith("0")));

function random(a, b, filter = ((a) => true)){
    var num;
    while (true){
        num = Math.floor(Math.random() * (b - a + 1)) + a;
        if (filter(num)){
            break;
        }
    }
    return num;
}

function end(){
    // 结束
    // 重设时间startTime，按照yy/mm/dd hh:mm:ss的格式记录
    st = {
        year: f.sup_0(startTime.getFullYear() % 100, 2),
        month: f.sup_0(startTime.getMonth() + 1, 2),
        day: f.sup_0(startTime.getDate(), 2),
        hour: f.sup_0(startTime.getHours(), 2),
        minute: f.sup_0(startTime.getMinutes(), 2),
        second: f.sup_0(startTime.getSeconds(), 2),
    }
    startTimeStr = `${st.year}/${st.month}/${st.day} ${st.hour}:${st.minute}:${st.second}`;
    gotoURL = encodeURI(`../result/index.html?(${datas2[diff - 1]})${datas1[type][diff - 1]}&${quesNum}&${correctTimes}&${time}&${answerTimes}&${startTimeStr}`);
    alertN("将跳转到信息界面。", "ℹ", "#0000FF");
    location.href = gotoURL;
}

function give_question(type, diff){
    // 出题
    var ques, result;
    switch (type){
        case 1:{
            let num1, num2;
            switch (diff){
                case 1:{
                    num1 = big_number.random(4, filter_notend0);
                    num2 = big_number.random(4, filter_notend0);
                    break;
                }
                case 2:{
                    num1 = big_number.random(7, filter_notend0);
                    num2 = big_number.random(7, filter_notend0);
                    break;
                }
                case 3:{
                    num1 = big_number.random(10, filter_notend0);
                    num2 = big_number.random(10, filter_notend0);
                    break;
                }
                case 4:{
                    num1 = big_number.random(15, filter_notend0);
                    num2 = big_number.random(15, filter_notend0);
                    break;
                }
                case 5:{
                    num1 = big_number.random(25, filter_notend0);
                    num2 = big_number.random(25, filter_notend0);
                    break;
                }
                case 6:{
                    num1 = big_number.random(40, filter_notend0);
                    num2 = big_number.random(40, filter_notend0);
                    break;
                }
            }
            result = num1.add(num2).value;
            ques = `${num1.value} + ${num2.value} = ?`;
            break;
        }
        case 2:{
            let nums = [],
            numsLength,
            resultNum = 0;
            switch (diff){
                case 1:{
                    numsLength = 2
                    break;
                }
                case 2:{
                    numsLength = 4;
                    break;
                }
                case 3:{
                    numsLength = 6;
                    break;
                }
                case 4:{
                    numsLength = 10;
                    break;
                }
                case 5:{
                    numsLength = 15;
                    break;
                }
                case 6:{
                    numsLength = 25;
                    break;
                }
            }
            for (let i=0; i<numsLength; i++){
                let numi = random(100001, 999999, filter_notend0);
                nums.push(numi);
                resultNum += numi;
            }
            result = resultNum;
            ques = map((a) => a.toString(), nums).join(" + ") + " = ?";
            break;
        }
        case 3:{
            let num1, num2, num3;
            switch (diff){
                case 1:{
                    num1 = new BigNumber(random(3, 9));
                    num2 = new BigNumber(random(3, 9));
                    num3 = new BigNumber(random(3, 9));
                    break;
                }
                case 2:{
                    num1 = new BigNumber(random(11, 99, filter_notend0));
                    num2 = new BigNumber(random(11, 99, filter_notend0));
                    num3 = new BigNumber(random(3, 9));
                    break;
                }
                case 3:{
                    num1 = new BigNumber(random(101, 999, filter_notend0));
                    num2 = new BigNumber(random(11, 99, filter_notend0));
                    num3 = new BigNumber(random(11, 99, filter_notend0));
                    break;
                }
                case 4:{
                    num1 = new BigNumber(random(101, 999, filter_notend0));
                    num2 = new BigNumber(random(101, 999, filter_notend0));
                    num3 = new BigNumber(random(101, 999, filter_notend0));
                    break;
                }
                case 5:{
                    num1 = new BigNumber(random(1001, 9999, filter_notend0));
                    num2 = new BigNumber(random(1001, 9999, filter_notend0));
                    num3 = new BigNumber(random(1001, 9999, filter_notend0));
                    break;
                }
                case 6:{
                    num1 = new BigNumber(random(100001, 999999, filter_notend0));
                    num2 = new BigNumber(random(100001, 999999, filter_notend0));
                    num3 = new BigNumber(random(100001, 999999, filter_notend0));
                    break;
                }
            }
            result = num1.mul(num2).mul(num3).value;
            ques = `${num1.value} × ${num2.value} × ${num3.value} = ?`
            break;
        }
        case 4:{
            let nums = [],
            numsLength,
            resultNum = new BigNumber("1");
            switch (diff){
                case 1:{
                    numsLength = 2;
                    break;
                }
                case 2:{
                    numsLength = 3;
                    break;
                }
                case 3:{
                    numsLength = 4;
                    break;
                }
                case 4:{
                    numsLength = 5;
                    break;
                }
                case 5:{
                    numsLength = 7;
                    break;
                }
                case 6:{
                    numsLength = 10;
                    break;
                }
            }
            for (let i=0; i<numsLength; i++){
                let num = new BigNumber(random(11, 99, filter_notend0));
                resultNum = resultNum.mul(num);
                nums.push(num);
            }
            result = resultNum.value;
            ques = map((a) => a.value, nums).join(" × ") + " = ?";
            break;
        }
        case 5:{
            let num1;
            switch (diff){
                case 1:{
                    num1 = random(11, 19);
                    break;
                }
                case 2:{
                    num1 = random(11, 39, filter_notend0);
                    break;
                }
                case 3:{
                    num1 = random(11, 99, filter_notend0);
                    break;
                }
                case 4:{
                    num1 = random(41, 999, filter_notend0);
                    break;
                }
                case 5:{
                    num1 = random(41, 9999, filter_notend0);
                    break;
                }
                case 6:{
                    num1 = random(101, 999999, filter_notend0);
                    break;
                }
            }
            result = (num1 ** 2).toString();
            ques = num1.toString() + "² = ?";
            break;
        }
    }
    return [ques, result];
}

function next_question(){
    nowQuestionNum += 1; // 题目序号加1
    $("#progressnow").text(nowQuestionNum.toString());
    if (nowQuestionNum == 1){
        startTime = new Date();
    }
    if (nowQuestionNum > quesNum){
        // 如果已经结束了
        end();
        return;
    }
    question = give_question(type, diff);
    $("#questionText").text(question[0]);
    correctAnswer = question[1];
    thisAnswerTimes = 0; // 归零重置
    $("#buttons>input:nth-child(1)").attr("class", "none-display");
    $("#buttons>input:nth-child(2)").attr("class", "");
    $("#tipsText").text("请回答问题...");
    $("#answerText").focus();
    $("#answerText").val(""); // 清空
    thisStartTime = new Date(); // 开始计时
}

function submit_question(){
    thisEndTime = new Date();
    var passTime = thisEndTime - thisStartTime,
    answerTmp = $("#answerText").val().split(""),
    answer = "",
    isCorrect;
    time += passTime; // 增加time
    $("#haveUseTime>span:nth-child(1)").text(Math.floor(time / 1000)); // 更新
    $("#haveUseTime>span:nth-child(3)").text(f.sup_0(time % 1000, 3)); // 更新
    answerTimes += 1; // 增加1次回答
    thisAnswerTimes += 1;
    $("#haveAnswerNum").text(answerTimes);
    for (let i of answerTmp){
        if (i in f.numbers || i == "-" || i == "."){
            // 合法有意义字符
            answer += i;
        }
    }
    isCorrect = (answer == correctAnswer);
    if (!isCorrect){
        // 如果不对
        $("#tipsText").attr("class", "red");
        $("#tipsText").text("答错了，再来吧。");
        $("#answerText").focus(); // 移动光标焦点
        thisStartTime = new Date(); // 重置
    }
    else{
        // 如果正确
        if (thisAnswerTimes == 1){
            correctTimes += 1; // 第一次就答对，多对一次
        }
        $("#haveAnswerCorrect").text(correctTimes); // 更新
        $("#tipsText").attr("class", "green");
        $("#tipsText").text(`恭喜你，答对了！问题 "${$("#questionText").text()}" 的答案就是 ${correctAnswer} ！点击“下一题”继续吧。（非答题期间不会计时）${(nowQuestionNum == quesNum)? "点击“下一题”查看结果。": ""}`);
        $("#buttons>input:nth-child(1)").attr("class", "");
        $("#buttons>input:nth-child(2)").attr("class", "none-display");
        $("#haveAnswer").text(nowQuestionNum);
        $("#buttons>input:nth-child(1)").focus(); // 移动光标焦点
        $("#progressbar").css("--width", Math.floor(nowQuestionNum / quesNum * 100)); // 移动进度条
    }
}