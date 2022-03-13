/// <reference path="./exercise.ts"/>
function init_result() {
    $("#rem-type").text("".concat(dataItems[0][readyItem], "-").concat(dataItems[readyItem][readyDifficulty]));
    var startTime = questions[0].startTime;
    $("#rem-start").text("".concat(startTime.getFullYear(), "/").concat(startTime.getMonth() + 1, "/").concat(startTime.getDate(), " ").concat(startTime.getHours(), ":").concat(startTime.getMinutes(), ":").concat(startTime.getSeconds()));
    $("#rem-number").text(readyQuestionNumber);
    $("#rem-correct").text(correctNumber);
    $("#rem-time").html("<span>".concat(Math.floor(usedTime / 1000), "\u79D2</span><span class=\"rem-time-ms\">").concat(sup0(usedTime % 1000, 3), "\u6BEB\u79D2</span>"));
    $("#rem-answered").text(answerNumber.toString());
    $("#rem-accuracy").text((correctNumber / readyQuestionNumber * 100).toFixed(1) + "%");
    var avgTime = Math.round(usedTime / correctNumber);
    $("#rem-avgtime").html("<span>".concat(Math.floor(avgTime / 1000), "\u79D2</span><span class=\"rem-time-ms\">").concat(sup0(avgTime % 1000, 3), "\u6BEB\u79D2</span>"));
    $("#rem-link").text(location.href.split("#")[0]);
    var $report = $("#report");
    for (var i in questions) {
        var q = questions[i];
        $("<span></span>")
            .append($("<span></span>").text("第" + q.id.toString() + "题"))
            .append($("<span></span>").text("问题: " + q.quesText))
            .append($("<span></span>").text("标答: ").text(q.correctAnswer))
            .append($("<span></span>").text("用时: " + "".concat(Math.floor(q.get_duration() / 1000).toString(), "\u79D2").concat((q.get_duration() % 1000).toString(), "\u6BEB\u79D2")))
            .append($("<span></span>").text((q.get_correct()) ? "正确" : "错误").attr({ "class": ((q.get_correct()) ? "green" : "red") }))
            .appendTo($report);
    }
}
