
		function add_shopping(button){
			alert("加入購物車");
			// 找到包含該按鈕的父級 .menu-item 元素
		    var menuItem = button.closest('.menu-item');
		    // 獲取商品詳細信息
		    var itemName = menuItem.querySelector('.menu-item-title').textContent;
		    var itemPrice = parseInt(menuItem.querySelector('.price').textContent.replace('價格：', ''));
		
		    // 獲取麵或筆管或麵飯選項
		    var noodleType = '';
		    var selectedOption = menuItem.querySelector('input[name^="noodle"]:checked');
		    if (!selectedOption) {
		    	alert("請選擇麵或飯選項");
		        return; // 如果沒有選擇麵或飯選項，直接返回，不執行後面的代碼		    	
		    }
		    noodleType = selectedOption.nextElementSibling.textContent;
		    
		    // 獲取焗烤選項		    
		    var topping = '';
		    var toppingCheckbox = menuItem.querySelector('input[name="topping"]');
		    var toppingPrice = 0;
		    if (toppingCheckbox.checked) {
		        topping = '焗烤';
		        toppingPrice = 40;
		    }
		
		    // 查找訂單摘要中是否已經有相同的商品，如果有則增加數量，否則添加新的訂單項目
		   	var orderSummary = document.querySelector('.order-summary-item ul');
		   	var existingItem = orderSummary.querySelector(
		    		`li[data-item="${itemName}"][data-noodle="${noodleType}"][data-topping="${topping}"]`);
		    
		    if (existingItem) {
		        // 如果已經存在相同的商品，增加數量
		        var quantityElement = existingItem.querySelector('.quantity');
		        var currentQuantity = parseInt(quantityElement.textContent.replace('x', ''));
		        ++currentQuantity;
		        quantityElement.textContent = "x"+ currentQuantity;
		        if(currentQuantity === 2){
		        var deleteButton = existingItem.querySelector('.delete-btn');
		        deleteButton.style.display = 'none';
		        var minusButton = existingItem.querySelector('.minus-btn');
		        minusButton.style.display = 'inline-block';
		        }   
		    } else {
		    	// 如果不存在相同的商品，添加新的訂單項目
		        var newItem = document.createElement('li');
		    	newItem.setAttribute('class','list-group-item d-flex justify-content-between');
		        newItem.setAttribute('data-item', itemName); //判斷餐點名稱
		        newItem.setAttribute('data-noodle', noodleType); // 判斷麵或筆管或麵飯選項
		        newItem.setAttribute('data-topping', topping);  // 判斷焗烤
		        newItem.innerHTML = `
		            <div>
		                <p>${itemName}</p>
		                <p>${noodleType}</p>
		                <p>${topping}</p>
		                <p>價格: $${itemPrice + toppingPrice}</p>
		            </div>
		            <div class="mt-auto shopping-cart-buttons mb-3">
		            	<button class="btn btn-outline-danger btn-sm delete-btn" style="display:inline-block;" onclick="removeItem(this)">x</button>
		            	<button class="btn btn-outline-primary btn-sm minus-btn" style="display: none;" onclick="minusQuantity(this)">-</button>
			            <span class="quantity badge bg-primary rounded-pill">x1</span>
			            <button class="btn btn-outline-primary btn-sm plus-btn" onclick="addQuantity(this)">+</button>
		            </div>`;		         
		         orderSummary.appendChild(newItem);	 	
		    }
		    updateTotal(itemPrice + toppingPrice);    
		}
		
		/* 更新總金額 */
		function updateTotal(price) {
		    // 獲取總金額元素
		    var totalElement = document.querySelector('.order-summary h3');
		    // 獲取當前總金額
		    var currentTotal = parseInt(totalElement.textContent.replace('總計:$', ''));
		    // 更新總金額
		    totalElement.textContent = `總計:$${currentTotal + price}`;
		}
		
			
		/* 訂單摘要新增數量 */
		function addQuantity(button){		       
			var listItem = button.closest('li');
			/* data-item 自定義儲存數據 */
			var itemName = listItem.getAttribute('data-item');
		    var noodleType = listItem.getAttribute('data-noodle');
		    var topping = listItem.getAttribute('data-topping');
		    //取得目前價錢
		    var itemPrice = parseInt(listItem.querySelector('p:nth-child(4)').textContent.replace('價格: $', ''));

		    var orderSummary = document.querySelector('.order-summary-item ul');
		    var existingItem = orderSummary.querySelector(`li[data-item="${itemName}"][data-noodle="${noodleType}"][data-topping="${topping}"]`);
		    
		    if (existingItem) {
			    quantityElement = existingItem.querySelector('.quantity');
			    currentQuantity = parseInt(quantityElement.textContent.replace('x', ''));
		     	// 更新數量顯示
			    quantityElement.textContent = `x${++currentQuantity}`;
			    
			 	// 根據當前數量顯示/隱藏刪除和減少按鈕
		        var deleteButton = existingItem.querySelector('.delete-btn');
		        var minusButton = existingItem.querySelector('.minus-btn');
		        
		        if (currentQuantity === 2) {
		        	minusButton.style.display = 'inline-block';
		        	deleteButton.style.display = 'none';	
		        } 

		        // 更新總金額
		        updateTotal(itemPrice);    
		    }		
		}
		
		// 減少數量按鈕點擊事件處理函數
		function minusQuantity(button) {
			var listItem = button.closest('li');
		    var itemName = listItem.getAttribute('data-item');
		    var noodleType = listItem.getAttribute('data-noodle');
		    var topping = listItem.getAttribute('data-topping');
		    var itemPrice = parseInt(listItem.querySelector('p:nth-child(4)').textContent.replace('價格: $', ''));
		    
		    var orderSummary = document.querySelector('.order-summary-item ul');
		    var existingItem = orderSummary.querySelector(`li[data-item="${itemName}"][data-noodle="${noodleType}"][data-topping="${topping}"]`);
		    
		    if (existingItem) {
		        var quantityElement = existingItem.querySelector('.quantity');
		        var currentQuantity = parseInt(quantityElement.textContent.replace('x', ''));	        
		     	
		     	// 更新減少數量顯示
			    quantityElement.textContent = `x${--currentQuantity}`;
		        // 更新顯示
		        if (currentQuantity === 1) {
		            var deleteButton = existingItem.querySelector('.delete-btn');
		            deleteButton.style.display = 'inline-block';
		            button.style.display = 'none';
		        }		        

		        // 更新總價
		        updateTotal(-itemPrice);
		    }
		}

		
		/* 此函數用於處理從訂單摘要中刪除商品 */
		function removeItem(button) {		    
		    var listItem = button.closest('li');
		    
		    var delQuantity = parseInt(listItem.querySelector('.quantity').textContent.replace('x',''));
		    //取得餐點名稱
		    var itemName = listItem.querySelector('p:nth-child(1)').textContent;
		  	//取得目前價錢
		    var itemPrice = parseInt(listItem.querySelector('p:nth-child(4)').textContent.replace('價格: $', ''));
		    var orderTotal = parseInt(document.querySelector('.order-summary-item h3').textContent.replace('總計:$',''));
		  	
		    //alert("目前總價格"+orderTotal);
		    
		    // 獲取總金額元素
		    var totalElement = document.querySelector('.order-summary h3');
		    // 獲取當前總金額
		    var currentTotal = parseInt(totalElement.textContent.replace('總計:$', ''));
		    // 更新總金額
		    totalElement.textContent = `總計:$${orderTotal - itemPrice * delQuantity}`;
		    alert("刪除"+itemName+"餐點");
		    listItem.parentNode.removeChild(listItem);
		}
	