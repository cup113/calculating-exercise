// 类型名，数量，正确数，时长，答题次数，开始时间
var href = decodeURI(location.href),
property = href.split("?")[1].split("&"),
type = property[0],
number = property[1],
correctTimes = property[2],
time = property[3],
answerTimes = property[4],
startTime = property[5],
correctPercent = correctTimes / number * 100,
avgTime = time / number;
$("#q1").text(type);
$("#q2").text(startTime);
$("#q3").text(number);
$("#q4").text(correctTimes);
$("#q5").html(`${Math.floor(time / 1000)}秒<span class="gray">${f.sup_0(Math.floor(time % 1000), 3)}毫秒</span>`);
$("#q6").text(answerTimes);
$("#q7").text((Math.floor(correctPercent * 10) / 10).toString() + "%");
$("#q8").html(`${Math.floor(avgTime / 1000)}秒<span class="gray">${f.sup_0(Math.floor(avgTime % 1000), 3)}毫秒</span>`)