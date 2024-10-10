document.addEventListener("DOMContentLoaded", function() {
	const now = new Date();
	const currentMinute = now.getMinutes();//取分鐘
	const currentHour = now.getHours();//取小時
	const startHour = 9; // 可以更改的起始小時數

	const minutePicker = document.getElementById("minute-picker");
	const hourPicker = document.getElementById("hour-picker");

	// 隱藏所有選項
	for (var i = 0; i < minutePicker.options.length; i++) {
		minutePicker.options[i].style.display = "none";
	}

	//顯示當前分鐘選項和當前時間選項
	if (currentMinute >= 45) {
		minutePicker.value = "0";
		hourPicker.value = (currentHour + 1).toString();
	} else {
		minutePicker.value = Math.ceil(currentMinute / 15).toString();
		hourPicker.value = currentHour.toString();
	}

	/*還沒到營業時間就禁止選取*/
	/*21>=? ?>=9*/
	/*還沒到營業時間*/
	
//	if ((startHour > currentHour && 0 < startHour) || (21 < currentHour &&  currentHour <= 24)) {
//		hourPicker.value = "9";
//		hourPicker.disabled = true;
//		minutePicker.disabled = true;
//	} else {
//		/*營業時間*/
//		hourPicker.disabled = false;
//		minutePicker.disabled = false;
//	}

	// 初始化時根據當前分鐘數顯示適當的選項
	if (currentMinute >= 0) {
		minutePicker.options[0].style.display = "inline";
	}
	if (currentMinute >= 15) {
		minutePicker.options[1].style.display = "inline";
	}
	if (currentMinute >= 30) {
		minutePicker.options[2].style.display = "inline";
	}
	if (currentMinute >= 45) {
		minutePicker.options[3].style.display = "inline";
	}

	var selectedHour = parseInt(hourPicker.value);
	selecMinute(minutePicker, selectedHour, currentMinute,currentHour);
	selecHour(hourPicker, currentHour, currentMinute);


});

// 根據選擇的小時顯示或隱藏相應的分鐘選項
function selecMinute(minutePicker, selectedHour, currentMinute,currentHour) {
	for (var i = 0; i < minutePicker.options.length; i++) {
		const optionValue = parseInt(minutePicker.options[i].textContent);
		if (currentHour === selectedHour && optionValue <= currentMinute) {
			//alert(optionValue);
			minutePicker.options[i].style.display = "none";
		} else {
			minutePicker.options[i].style.display = "inline";
		}
	}
}

function selecHour(hourPicker, currentHour, currentMinute) {
	// 初始化時根據當前小時和分鐘數顯示或隱藏適當的選項
	for (var i = 0; i < hourPicker.options.length; i++) {
		const optionValue = parseInt(hourPicker.options[i].value);
		if (optionValue < currentHour || (optionValue === currentHour && currentMinute >= 45)) {
			hourPicker.options[i].style.display = "none";
		} else {
			hourPicker.options[i].style.display = "inline";
		}
	}
}
// 監聽小時選擇器的變更事件
	hourPicker.addEventListener("change", function () {
		var now = new Date();
		var currentMinute = now.getMinutes();//取分鐘
		var currentHour = now.getHours();//取小時
		var minutePicker = document.getElementById("minute-picker");
		var hourPicker = document.getElementById("hour-picker");
		var selectedHour = parseInt(hourPicker.value);
		
		selecMinute(minutePicker, selectedHour, currentMinute,currentHour);
});