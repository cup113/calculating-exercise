/// <reference path="../Lib/BigInteger.js/BigInteger.d.ts"/>
/// <reference path="./ready.ts"/>
var Question = /** @class */ (function () {
    function Question(id, quesText, correctAnswer) {
        this.id = 0; // 编号(从1开始)
        this.quesText = ""; // 问题
        this.correctAnswer = ""; // 正确答案
        this.faults = []; // 用户输入过的错误答案
        this.correct = false; // 是否一次通过
        this.startTime = new Date(0); // 起始时间
        this.lastTime = new Date(0); // 最近回答时间
        this.endTime = new Date(0); // 结束时间
        this.duration = 0; // 用时(ms)
        this.id = id;
        this.quesText = quesText;
        this.correctAnswer = correctAnswer;
        this.startTime = new Date();
    }
    Question.prototype.get_faults = function () { return this.faults; };
    Question.prototype.get_correct = function () { return this.correct; };
    Question.prototype.get_endTime = function () { return this.endTime; };
    Question.prototype.get_duration = function () { return this.duration; };
    Question.prototype.update_date = function () {
        this.lastTime = new Date();
        var duration_now = this.lastTime.getTime() - this.startTime.getTime() + usedTime;
        $("#ex-data-usedtime").html("<span>".concat(Math.floor(duration_now / 1000).toString(), "</span><span>").concat(duration_now % 1000, "</span>"));
    };
    Question.prototype.add_fault = function (_fault) {
        this.faults.push(_fault);
        $("#ex-info-step").css({ "--color": "#ff0000" }).text("\u7B54\u9519\u4E86\u3002\u7B54\u6848\u5E76\u4E0D\u662F".concat(_fault, "\u3002"));
        this.update_date();
    };
    Question.prototype.end = function () {
        this.update_date();
        this.endTime = this.lastTime;
        this.duration = (this.endTime.getTime() - this.startTime.getTime());
        $("#ex-info-step").css({ "--color": "#00bb00" }).text("\u7B54\u5BF9\u4E86\u3002\u7B54\u6848\u5C31\u662F".concat(this.correctAnswer, "\u3002\u8BF7\u70B9\u51FB\u201C\u4E0B\u4E00\u9898\u201D\u7EE7\u7EED\u3002"));
        this.correct = (this.faults.length === 0);
        if (this.correct)
            add_correctAnswer();
    };
    Question.prototype.answer = function (_answerText) {
        var isAnswerCorrect = _answerText === this.correctAnswer;
        if (isAnswerCorrect)
            this.end();
        else
            this.add_fault(_answerText);
        add_answerNumber();
        return isAnswerCorrect;
    };
    return Question;
}());
var questions, questionNow = new Question(0, "", ""), // 当前问题
usedTime, // 已用时(ms)
correctNumber, // 正确题数
answerNumber, dataNumber; // 回答题次
function init_exercise() {
    questions = [];
    questionNow = new Question(0, "", "");
    usedTime = 0;
    correctNumber = 0;
    answerNumber = 0;
    dataNumber = dataNumbers[readyItem][readyDifficulty - 1];
}
function add_correctAnswer() {
    correctNumber += 1;
    $("#ex-data-correct").text(correctNumber.toString());
}
function add_answerNumber() {
    answerNumber += 1;
    $("#ex-data-answeredtimes").text(answerNumber.toString());
}
function update_progressbar() {
    $("#ex-progress").css({ "--w": (questionNow.id / readyQuestionNumber).toFixed(4) });
    $("#ex-progress-text").text("\u7B2C".concat(questionNow.id, "\u9898 / \u5171").concat(readyQuestionNumber, "\u9898"));
}
function ex_submit() {
    var passed = questionNow.answer($("#ex-m-answertext").val());
    if (passed) {
        $("#ex-button").text("提交 Submit ✔").on('click', ex_next_question);
        update_progressbar();
    }
    if (questionNow.id === readyQuestionNumber) {
        error_display("3秒后即将进入结果报告界面", 2900, "✔");
        ex_finish();
    }
}
function ex_next_question() {
    generate_question();
}
function ex_finish() {
    $("#ex-a")[0].click();
}
function bRandom(digits, endAvoid0, topRange) {
    if (endAvoid0 === void 0) { endAvoid0 = false; }
    if (topRange === void 0) { topRange = [1, 9]; }
    var str = "";
    str += (Math.floor(Math.random() * (topRange[1] - topRange[0] + 1) + topRange[0]).toString());
    for (var i = 1; i < digits - 1; i++) {
        str += Math.floor(Math.random() * 10).toString();
    }
    if (digits >= 2) {
        str += (9 - Math.floor(Math.random() * ((endAvoid0) ? 10 : 9))).toString();
    }
    return bigInt(str);
}
function iRandom(lowerbound, upperbound) {
    return Math.floor((Math.random() * (upperbound - lowerbound))) + lowerbound;
}
function siRandom(lowerbound, upperbound) {
    return (Math.floor(Math.sqrt(iRandom(0, Math.pow((upperbound - lowerbound), 2)))) + lowerbound);
}
function generate_question() {
    // 出题
    var questionText, correctAnswer;
    switch (readyItem) {
        case 1: { // 两数相加
            var addend1 = bRandom(dataNumber, true), addend2 = bRandom(dataNumber, true), sum = addend1.add(addend2);
            questionText = "".concat(addend1.toString(), " + ").concat(addend2.toString(), " = ?");
            correctAnswer = sum.toString();
        }
        case 2: { // 多数连加
            var addends = [], sum = bigInt(0);
            for (var i = 0; i < dataNumber; i++) {
                var addend = bRandom(6, true);
                addends.push(addend.toString());
                sum = sum.add(addend);
            }
            questionText = addends.join(" + ") + " = ?";
            correctAnswer = sum.toString();
        }
        case 3: { // 两数相减
            var minuend, subtrahend, diff;
            diff = bRandom(siRandom(Math.floor(dataNumber / 2), dataNumber), false);
            subtrahend = bRandom(dataNumber, false);
            minuend = subtrahend.add(diff);
            questionText = "".concat(minuend.toString(), " - ").concat(subtrahend.toString(), " = ?");
            correctAnswer = diff.toString();
        }
        case 4: { // 两数相乘
            var factor1, factor2, product;
            factor1 = bRandom(dataNumber % 100, true);
            factor2 = bRandom(Math.floor(dataNumber / 100), true);
            product = factor1.multiply(factor2);
            questionText = "".concat(factor1.toString(), " \u00D7 ").concat(factor2.toString(), " = ?");
            correctAnswer = product.toString();
        }
        case 5: { // 多数连乘
            var factors = [], product = bigInt(0);
            for (var i = 0; i < dataNumber; i++) {
                var factor = bRandom(2, true);
                factors.push(factor.toString());
                product = product.multiply(factor);
            }
            questionText = factors.join(" × ") + " = ?";
            correctAnswer = product.toString();
        }
        case 6: { // 平方数
            var digits = siRandom(Math.floor(dataNumber % 1000 / 100), Math.floor(dataNumber % 10)), topRange = [Math.floor(dataNumber / 1000), Math.floor(dataNumber % 100 / 10)], base = bRandom(digits, true, topRange);
            questionText = "".concat(base.toString(), "\u00B2 = ?");
            correctAnswer = base.square().toString();
        }
        case 7: { // 开平方
            var digits = siRandom(Math.floor(dataNumber % 1000 / 100), Math.floor(dataNumber % 10)), topRange = [Math.floor(dataNumber / 1000), Math.floor(dataNumber % 100 / 10)], base = bRandom(digits, true, topRange);
            questionText = "".concat(base.square().toString(), "\u00B2 = ?");
            correctAnswer = base.toString();
        }
        case 8: { // 两数相除
            var quotient = bRandom(dataNumber % 100, true), divisor = bRandom(Math.floor(dataNumber / 100), true), dividend = quotient.multiply(divisor);
            questionText = "".concat(dividend.toString(), " \u00F7 ").concat(divisor.toString(), " = ?");
            correctAnswer = quotient.toString();
        }
        case 9: { // 一元二次方程根的判别式
            var a = bRandom(siRandom(1, Math.ceil(dataNumber / 3)), true), b = bRandom(siRandom(1, Math.ceil(dataNumber / 1.5)), true), c = bRandom(siRandom(1, Math.ceil(dataNumber / 1.2)), true), result = b.square().minus(a.multiply(c).multiply(4));
            questionText = "a=".concat(a.toString(), ", b=").concat(b.toString(), ", c=").concat(c.toString());
            correctAnswer = result.toString();
        }
    }
    var newQuestion = new Question(questionNow.id + 1, questionText, correctAnswer);
    questions.push(newQuestion);
    questionNow = newQuestion;
    $("#ex-m-question").text(questionNow.quesText);
    $("#ex-info-step").css({ "--color": "#000000" }).text("答题完毕请点击“提交”，或按回车(Enter键)");
}
