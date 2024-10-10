
function amount() {
	var orderSummary = {
		totalAmount: document.querySelector('.order-summary-item').
			querySelector('h3').
			textContent.replace('總計:$', ''),
		orders: []
	};
	
	// 遍歷訂單項目的每一個<li>元素
	var orderItems = document.querySelectorAll('.list-group-item');
	orderItems.forEach(function(itemElement) {
		var item = itemElement.getAttribute('data-item');
		var noodle = itemElement.getAttribute('data-noodle');
		var topping = itemElement.getAttribute('data-topping');
		var priceStr = itemElement.querySelector('p:last-of-type').textContent;
		var price = parseInt(priceStr.replace('價格: $', ''));
		var quantityStr = itemElement.querySelector('.quantity').textContent;
		var quantity = parseInt(quantityStr.replace('x', ''));
		if (topping === "" || topping === null || topping === undefined) {
			topping = "無";
		}
		// 創建訂單項目物件
		var order = {
			item: item,
			noodle: noodle,
			topping: topping,
			quantity: quantity,
			price: price
		};
		// 將訂單項目添加到訂單列表中
		orderSummary.orders.push(order);
	});
	setSettlement();
	//執行傳送訂單摘要傳入到下一頁畫面
	function setSettlement() {
		// 將訂單資料通過 AJAX POST 請求傳送到後端 Servlet
		var xhr = new XMLHttpRequest();
		var url = '/test0717/doOrderSummary'; // 替換為你的後端處理 URL
		xhr.open('POST', url, true);
		//如果要轉成json需要UTF-8否則會是預設編輯碼
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		xhr.onreadystatechange = function() {
				// 處理成功回應（如果有的話）
			if (xhr.readyState === 4 && xhr.status === 200) {
				// 解析服務器返回的JSON數據
				//alert('訂單已成功提交');
				var response = JSON.parse(xhr.responseText);
				// 根據JSON數據中的重定向標誌來執行相應操作
				if (response.redirect) {
					// 執行重定向到新的頁面
					alert("確認訂單");
					window.location.href = 'orderConfirmation.jsp'; // 替換為您希望重定向的頁面URL
				} else {
					// 可以根據需要執行其他操作
					alert('請選擇餐點!');
				}
				// 可以重定向到下一頁或根據需要處理回應
			} else if (xhr.readyState === 4 && xhr.status !== 200) {
				// 處理錯誤
				alert('提交訂單時出錯:' + xhr.status + xhr.responseText);
			}
		};
		//把javascript陣列轉成json格式
		var jsonData = JSON.stringify(orderSummary);
		//alert(jsonData);
		xhr.send(jsonData);
	}
}