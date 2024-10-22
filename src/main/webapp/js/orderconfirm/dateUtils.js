function formatToDate() {
	// 取得當前的 UTC 時間
	const todayUTC = new Date();
	// 台灣位於 UTC+8，因此要加上 8 小時的毫秒數
	const taiwanTimeMilliseconds = todayUTC.getTime() + (8 * 60 * 60 * 1000);
	// 使用新的毫秒數來建立台灣時間的 Date 物件
	const taiwanTime = new Date(taiwanTimeMilliseconds);
	// 取得台灣時間的 ISO 字串
	const taiwanISODate = taiwanTime.toISOString().split('T')[0];
	//2024-07-09T07:37:19.462Z
	return taiwanISODate;
}
//防止選到今天以前的日期
document.addEventListener('DOMContentLoaded', function() {
	var datePicker = document.getElementById('date-picker');
	datePicker.setAttribute('min', formatToDate());
	datePicker.value = formatToDate();
});

