//舊程式碼(不用理他)
// --->  這個程式碼是之前留著，不曉得還會不會用到
// 在下一頁取出資料並顯示
document.addEventListener("DOMContentLoaded", () => {
	const orderedItems = JSON.parse(localStorage.getItem("orderedItems"));
	const displayContainer = document.getElementById("display-container");

	if (orderedItems && orderedItems.length > 0) {
		let totalAmount = 0;

		orderedItems.forEach((item) => {
			const itemElement = document.createElement("div");
			itemElement.classList.add("order-item");
			let totalPrice = parseInt(item.price.replace(/\D/g, "")) * item.count; // 取出價格中的數字部分

			if (item.topping) {
				totalPrice += 40 * item.count;
				itemElement.innerHTML = `<span class="item-name">${item.name} (焗烤)</span><span class="item-price">$${totalPrice.toFixed(2)}</span><span class="item-count">x${item.count
					}<span class="item-noodle-rice">${item.noodle}</span>`;
			} else {
				itemElement.innerHTML = `<span class="item-name">${item.name}</span><span class="item-price">$${totalPrice.toFixed(2)}</span><span class="item-count">x${item.count}</span>`;
			}

			displayContainer.appendChild(itemElement);
			totalAmount += totalPrice;
		});

		const totalElement = document.createElement("div");
		totalElement.classList.add("total-price");
		totalElement.textContent = `總金額: $${totalAmount.toFixed(2)}`;
		displayContainer.appendChild(totalElement);
	}
});
