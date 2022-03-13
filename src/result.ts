/// <reference path="./exercise.ts"/>

function init_result() {
	$("#rem-type").text(`${dataItems[0][readyItem]}-${dataItems[readyItem][readyDifficulty]}`);
	var startTime: Date = questions[0].startTime;
	$("#rem-start").text(`${startTime.getFullYear()}/${startTime.getMonth() + 1}/${startTime.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`);
	$("#rem-number").text(readyQuestionNumber);
	$("#rem-correct").text(correctNumber);
	$("#rem-time").html(`<span>${Math.floor(usedTime / 1000)}秒</span><span class="rem-time-ms">${sup0(usedTime % 1000, 3)}毫秒</span>`);
	$("#rem-answered").text(answerNumber.toString());
	$("#rem-accuracy").text((correctNumber / readyQuestionNumber * 100).toFixed(1) + "%");
	var avgTime: number = Math.round(usedTime / correctNumber);
	$("#rem-avgtime").html(`<span>${Math.floor(avgTime / 1000)}秒</span><span class="rem-time-ms">${sup0(avgTime % 1000, 3)}毫秒</span>`);
	$("#rem-link").text(location.href.split("#")[0]);
	var $report = $("#report");
	for (let i in questions) {
		let q = questions[i];
		$("<span></span>")
		.append($("<span></span>").text("第" + q.id.toString() + "题"))
		.append($("<span></span>").text("问题: " + q.quesText))
		.append($("<span></span>").text("标答: ").text(q.correctAnswer))
		.append($("<span></span>").text("用时: " + `${Math.floor(q.get_duration() / 1000).toString()}秒${(q.get_duration() % 1000).toString()}毫秒`))
		.append($("<span></span>").text((q.get_correct())? "正确": "错误").attr({"class": ((q.get_correct())? "green": "red")}))
		.appendTo($report);
	}
}