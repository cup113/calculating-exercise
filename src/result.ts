/// <reference path="./exercise.ts"/>

function init_result() {
	$("#report").html("");
	$("#rem-type").text(`${dataItems[0][readyItem - 1]}-${dataItems[readyItem][readyDifficulty - 1]}`);
	var startTime: Date = questions[0].startTime;
	$("#rem-start").text(`${startTime.getFullYear()}/${startTime.getMonth() + 1}/${startTime.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`);
	$("#rem-number").text(readyQuestionNumber);
	$("#rem-correct").text(correctNumber);
	$("#rem-time").html(`<span>${Math.floor(usedTime / 1000)}秒</span><span class="rem-time-ms">${sup0(usedTime % 1000, 3)}毫秒</span>`);
	$("#rem-answered").text(answerNumber.toString());
	$("#rem-accuracy").text((correctNumber / readyQuestionNumber * 100).toFixed(1) + "%");
	var avgTime: number = Math.round(usedTime / readyQuestionNumber);
	$("#rem-avgtime").html(`<span>${Math.floor(avgTime / 1000)}秒</span><span class="rem-time-ms">${sup0(avgTime % 1000, 3)}毫秒</span>`);
	$("#rem-link").text(location.href.split("#")[0]);
	var $report = $("#report");
	$("<span><span>题号</span><span>问题</span><span>标答</span><span>用时</span><span>结果</span><span>错误答案</span></span>").appendTo($report);
	for (let i in questions) {
		let q = questions[i];
		$("<span></span>")
		.append($("<span></span>").text(q.id.toString()))
		.append($("<span></span>").text(q.quesText))
		.append($("<span></span>").text(q.correctAnswer))
		.append($("<span></span>").text(`${Math.floor(q.get_duration() / 1000).toString()}.${(q.get_duration() % 1000).toString()}秒`))
		.append($("<span></span>").text((q.get_correct())? "正确": "错误").attr({"class": ((q.get_correct())? "green": "red")}))
		.append($("<span></span>").html(q.get_faults().join("<br>")))
		.appendTo($report);
	}
}