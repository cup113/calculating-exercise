/// <reference path="../src/error.d.ts"/>
/// <reference path="./data.ts"/>

var readyQuestionNumber: number = 10,
readyItem: number = 1,
readyDifficulty: number = 1;

function set_rQuesNumber(_rQuesNumber: number) {
	if (_rQuesNumber === 0) _rQuesNumber = parseInt($("#rd-form-number").val() as string);
	if (isNaN(_rQuesNumber)) error_display("题数必须是整数");
	else if (_rQuesNumber > 1000 || _rQuesNumber < 1) error_display("题数必须是1-1000的数");
	else {
		readyQuestionNumber = _rQuesNumber;
		localStorage.setItem("CE_questionNumber", readyQuestionNumber.toString());
		return 0;
	}
	return 1;
}

function set_rItem(_rItem: number) {
	if (_rItem === 0) _rItem = parseInt($("#rd-form-item").val() as string);
	if (isNaN(_rItem) || _rItem <= 0 || _rItem >= 11) error_display("请选择正确的项目");
	else {
		readyItem = _rItem;
		var $diff = $("#rd-form-diff").html("");
		for (let i in dataItems[readyItem]) {
			$("<option></option>").text(`(${dataDiffs[i]})${dataItems[readyItem][i]}`).appendTo($diff).attr({"value": (parseInt(i) + 1).toString()});
		}
		$diff.val(readyDifficulty.toString());
		localStorage.setItem("CE_item", readyItem.toString())
		return 0;
	}
	return 1;
}

function set_rDifficulty(_rDifficulty: number) {
	if (_rDifficulty === 0) _rDifficulty = parseInt($("#rd-form-diff").val() as string);
	if (isNaN(_rDifficulty) || _rDifficulty <= 0 || _rDifficulty >= 11) error_display("请选择正确的项目");
	else if (dataItems[readyItem][_rDifficulty - 1].slice(0, 2) == "--") error_display("请选择有对应难度的项目");
	else {
		readyDifficulty = _rDifficulty;
		localStorage.setItem("CE_difficulty", readyDifficulty.toString())
		return 0;
	}
	return 1;
}

function ready_submit() {
	if (set_rQuesNumber(0) + set_rDifficulty(0) + set_rItem(0) === 0) {
		$("#rd-a")[0].click();
	}
	else {
		error_display("提交失败");
	}
}

function init_ready() {
	if (localStorage.getItem("CE_questionNumber") === null) localStorage.setItem("CE_questionNumber", "10");
	if (localStorage.getItem("CE_item") === null) localStorage.setItem("CE_item", "1");
	if (localStorage.getItem("CE_difficulty") === null) localStorage.setItem("CE_difficulty", "1");
	readyQuestionNumber = parseInt(localStorage.getItem("CE_questionNumber") as string);
	readyItem = parseInt(localStorage.getItem("CE_item") as string);
	readyDifficulty = parseInt(localStorage.getItem("CE_difficulty") as string);
	set_rItem(readyItem);
	$("#rd-form-item").val(readyItem.toString());
	set_rQuesNumber(readyQuestionNumber);
	$("#rd-form-number").val(readyQuestionNumber.toString());
	$("<span></span>").appendTo($("<a href='#ready'></a>")).trigger("click");
}

init_ready();