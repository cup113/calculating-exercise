/// <reference path="../Lib/BigInteger.js/BigInteger.d.ts"/>
/// <reference path="./ready.ts"/>

class Question {
	readonly id: number = 0; // 编号(从1开始)
	readonly quesText: string = ""; // 问题
	readonly correctAnswer: string = ""; // 正确答案
	private faults: string[] = []; // 用户输入过的错误答案
	private correct: boolean = false; // 是否一次通过
	readonly startTime: Date = new Date(0); // 起始时间
	private lastTime: Date = new Date(0); // 最近回答时间
	private endTime: Date = new Date(0); // 结束时间
	private duration: number = 0; // 用时(ms)
	constructor(id: number, quesText: string, correctAnswer: string) {
		this.id = id;
		this.quesText = quesText;
		this.correctAnswer = correctAnswer;
		this.startTime = new Date();
	}
	public get_faults() {return this.faults;}
	public get_correct() {return this.correct;}
	public get_endTime() {return this.endTime;}
	public get_duration() {return this.duration;}
	
	private update_date() {
		this.lastTime = new Date();
		var duration_now = this.lastTime.getTime() - this.startTime.getTime() + usedTime;
		$("#ex-data-usedtime").html(`<span>${Math.floor(duration_now / 1000).toString()}</span><span>${duration_now % 1000}</span>`);
	}
	private add_fault(_fault: string) {
		this.faults.push(_fault);
		$("#ex-info-step").css({"--color": "#ff0000"}).text(`答错了。答案并不是${_fault}。`);
		this.update_date();
	}
	private end() {
		this.update_date();
		this.endTime = this.lastTime;
		this.duration = (this.endTime.getTime() - this.startTime.getTime());
		$("#ex-info-step").css({"--color": "#00bb00"}).text(`答对了。答案就是${this.correctAnswer}。请点击“下一题”继续。`);
		this.correct = (this.faults.length === 0);
		if (this.correct) add_correctAnswer();
	}
	public answer(_answerText: string): boolean {
		var isAnswerCorrect = _answerText === this.correctAnswer;
		if (isAnswerCorrect) this.end();
		else this.add_fault(_answerText);
		add_answerNumber();
		return isAnswerCorrect;
	}
}

var questions: Question[],
questionNow: Question = new Question(0, "", ""), // 当前问题
usedTime: number, // 已用时(ms)
correctNumber: number, // 正确题数
answerNumber: number,
dataNumber: number; // 回答题次

function init_exercise() {
	questions = [];
	questionNow = new Question(0, "", "");
	usedTime = 0;
	correctNumber = 0;
	answerNumber = 0;
	dataNumber = dataNumbers[readyItem][readyDifficulty - 1]
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
	$("#ex-progress").css({"--w": (questionNow.id / readyQuestionNumber).toFixed(4)});
	$("#ex-progress-text").text(`第${questionNow.id}题 / 共${readyQuestionNumber}题`);
}

function ex_submit() {
	var passed = questionNow.answer($("#ex-m-answertext").val() as string);
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

function bRandom(digits: number, endAvoid0: boolean = false, topRange: number[] = [1, 9]): BigInteger {
	var str: string = "";
	str += (Math.floor(Math.random() * (topRange[1] - topRange[0] + 1) + topRange[0]).toString());
	for (let i=1; i<digits-1; i++) {
		str += Math.floor(Math.random() * 10).toString();
	}
	if (digits >= 2) {
		str += (9 - Math.floor(Math.random() * ((endAvoid0)? 10: 9))).toString();
	}
	return bigInt(str);
}

function iRandom(lowerbound: number, upperbound: number) {
	return Math.floor((Math.random() * (upperbound - lowerbound))) + lowerbound;
}

function siRandom(lowerbound: number, upperbound: number) {
	return (Math.floor(Math.sqrt(iRandom(0, (upperbound - lowerbound) ** 2))) + lowerbound);
}

function generate_question() {
	// 出题
	var questionText: string, correctAnswer: string;
	switch (readyItem) {
		case 1: { // 两数相加
			var addend1 = bRandom(dataNumber, true),
			addend2 = bRandom(dataNumber, true),
			sum = addend1.add(addend2);
			questionText = `${addend1.toString()} + ${addend2.toString()} = ?`;
			correctAnswer = sum.toString();
		}
		case 2: { // 多数连加
			var addends: string[] = [],
			sum: BigInteger = bigInt(0);
			for (let i=0; i<dataNumber; i++) {
				let addend = bRandom(6, true)
				addends.push(addend.toString());
				sum = sum.add(addend);
			}
			questionText = addends.join(" + ") + " = ?"
			correctAnswer = sum.toString();
		}
		case 3: { // 两数相减
			var minuend: BigInteger,
			subtrahend: BigInteger,
			diff: BigInteger;
			diff = bRandom(siRandom(Math.floor(dataNumber / 2), dataNumber), false);
			subtrahend = bRandom(dataNumber, false);
			minuend = subtrahend.add(diff);
			questionText = `${minuend.toString()} - ${subtrahend.toString()} = ?`;
			correctAnswer = diff.toString()
		}
		case 4: { // 两数相乘
			var factor1: BigInteger,
			factor2: BigInteger,
			product: BigInteger;
			factor1 = bRandom(dataNumber % 100, true);
			factor2 = bRandom(Math.floor(dataNumber / 100), true);
			product = factor1.multiply(factor2);
			questionText = `${factor1.toString()} × ${factor2.toString()} = ?`;
			correctAnswer = product.toString();
		}
		case 5: { // 多数连乘
			var factors: string[] = [],
			product: BigInteger = bigInt(0);
			for (let i=0; i<dataNumber; i++) {
				let factor = bRandom(2, true);
				factors.push(factor.toString());
				product = product.multiply(factor);
			}
			questionText = factors.join(" × ") + " = ?";
			correctAnswer = product.toString();
		}
		case 6: { // 平方数
			var digits = siRandom(Math.floor(dataNumber % 1000 / 100), Math.floor(dataNumber % 10)),
			topRange = [Math.floor(dataNumber / 1000), Math.floor(dataNumber % 100 / 10)],
			base = bRandom(digits, true, topRange);
			questionText = `${base.toString()}² = ?`;
			correctAnswer = base.square().toString();
		}
		case 7: { // 开平方
			var digits = siRandom(Math.floor(dataNumber % 1000 / 100), Math.floor(dataNumber % 10)),
			topRange = [Math.floor(dataNumber / 1000), Math.floor(dataNumber % 100 / 10)],
			base = bRandom(digits, true, topRange);
			questionText = `${base.square().toString()}² = ?`;
			correctAnswer = base.toString();
		}
		case 8: { // 两数相除
			var quotient: BigInteger = bRandom(dataNumber % 100, true),
			divisor: BigInteger = bRandom(Math.floor(dataNumber / 100), true),
			dividend: BigInteger = quotient.multiply(divisor);
			questionText = `${dividend.toString()} ÷ ${divisor.toString()} = ?`;
			correctAnswer = quotient.toString();
		}
		case 9: { // 一元二次方程根的判别式
			var a: BigInteger = bRandom(siRandom(1, Math.ceil(dataNumber / 3)), true),
			b: BigInteger = bRandom(siRandom(1, Math.ceil(dataNumber / 1.5)), true),
			c: BigInteger = bRandom(siRandom(1, Math.ceil(dataNumber / 1.2)), true),
			result = b.square().minus(a.multiply(c).multiply(4));
			questionText = `a=${a.toString()}, b=${b.toString()}, c=${c.toString()}`;
			correctAnswer = result.toString();
		}
	}
	var newQuestion = new Question(questionNow.id + 1, questionText, correctAnswer);
	questions.push(newQuestion);
	questionNow = newQuestion;
	$("#ex-m-question").text(questionNow.quesText);
	$("#ex-info-step").css({"--color": "#000000"}).text("答题完毕请点击“提交”，或按回车(Enter键)");
}