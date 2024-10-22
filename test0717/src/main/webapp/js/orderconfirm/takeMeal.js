//取餐方式選擇外送後，地址一欄才會顯示
function toggleAddressField() {
	var orderType = document.getElementById("orderType").value;
	var addressField = document.getElementById("addressField");

	var customer_address = document.getElementById("customer-address");
	if (orderType === "外送") {
		addressField.style.display = "block"; // 顯示地址輸入欄
		customer_address.setAttribute('required', '');// 加入一定要輸入提示
	} else {
		addressField.style.display = "none"; // 隱藏地址輸入欄
		addressField.querySelector("input").value = "";
		customer_address.removeAttribute('required');// 移除一定要輸入提示
	}
}
