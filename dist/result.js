/// <reference path="./exercise.ts"/>
function init_result() {
    $("#report").html("");
    $("#rem-type").text("".concat(dataItems[0][readyItem - 1], "-").concat(dataItems[readyItem][readyDifficulty - 1]));
    var startTime = questions[0].startTime;
    $("#rem-start").text("".concat(startTime.getFullYear(), "/").concat(startTime.getMonth() + 1, "/").concat(startTime.getDate(), " ").concat(startTime.getHours(), ":").concat(startTime.getMinutes(), ":").concat(startTime.getSeconds()));
    $("#rem-number").text(readyQuestionNumber);
    $("#rem-correct").text(correctNumber);
    $("#rem-time").html("<span>".concat(Math.floor(usedTime / 1000), "\u79D2</span><span class=\"rem-time-ms\">").concat(sup0(usedTime % 1000, 3), "\u6BEB\u79D2</span>"));
    $("#rem-answered").text(answerNumber.toString());
    $("#rem-accuracy").text((correctNumber / readyQuestionNumber * 100).toFixed(1) + "%");
    var avgTime = Math.round(usedTime / readyQuestionNumber);
    $("#rem-avgtime").html("<span>".concat(Math.floor(avgTime / 1000), "\u79D2</span><span class=\"rem-time-ms\">").concat(sup0(avgTime % 1000, 3), "\u6BEB\u79D2</span>"));
    $("#rem-link").text(location.href.split("#")[0]);
    var $report = $("#report");
    for (var i in questions) {
        var q = questions[i];
        $("<span></span>")
            .append($("<span></span>").text(q.id.toString()))
            .append($("<span></span>").text((q.get_correct()) ? "T" : "F").attr({ "class": ((q.get_correct()) ? "green" : "red") }))
            .append($("<span></span>").text("".concat((q.get_duration() / 1000).toFixed(3), "\u79D2")))
            .append($("<span></span>").text(q.quesText))
            .append($("<span></span>").text(q.correctAnswer).attr({ "class": "green" }))
            .append($("<span></span>").html(q.get_faults().join("<br>")).attr({ "class": "red" }))
            .appendTo($report);
    }
}
