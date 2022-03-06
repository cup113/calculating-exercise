var $error = $("#error"),
errCount = 0;
/**
 * @brief 显示/新增一个error
 * @param text 错误内容
 * @param duration 持续时间(ms)
 */
function error_display(text: string, duration: number = 10000, icon: string = "❌") {
	errCount += 1;
	$("<p></p>").attr({"id": "error-" + errCount.toString(), "class": "error-item"})
	.append($("<span></span>").text(icon))
	.append($("<span></span>").text(text))
	.append($("<span></span>").text("x").on('click', {id: errCount}, function(event) {$("#error-" + event.data.id.toString()).remove();}))
	.appendTo($error);
	setTimeout(function (id: number) {$("#error-" + id.toString()).remove();}, duration, [errCount]);
}