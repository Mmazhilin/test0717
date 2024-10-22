var xmlHTTP;
var menuElement;
var menu_option;
set_menu();//顯示全部菜單
document.querySelector('.menu-options').addEventListener('click', function(event) {
	//var select_op = document.getElementById("select_op").value;

	// 確保點擊的目標是選項元素
	if (event.target.classList.contains('menu-option')) {
		// 獲取被點擊的選項的文本內容
		var optionText = event.target.innerText;
		// 根據點擊的選項執行相應的操作
		switch (optionText) {
			case '奶油':
				menu_option = "A";
				set_menu();
				break;
			case '番茄':
				menu_option = "B";
				set_menu();
				break;
			case '青醬':
				menu_option = "C";
				set_menu();
				break;
			case '蒜辣':
				menu_option = "D";
				set_menu();
				break;
			default:
				break;
			// 如果點擊的選項不在上述列表中，執行默認操作或者報錯
			//console.error('Unknown option clicked');
		}
	}
});

//顯示各項目菜單
function set_menu() {
	if (window.ActiveXObject) {
		xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
	} else if (window.XMLHttpRequest) {
		xmlHTTP = new XMLHttpRequest();
	} else {
		console.error("Your browser does not support AJAX.");
	}

	xmlHTTP.open("GET", "/test0717/doOrderServlet?menu_option=" + menu_option, true);

	xmlHTTP.onreadystatechange = function check_status() {
		if (xmlHTTP.readyState == 4) {
			if (xmlHTTP.status == 200) {
				var response = JSON.parse(xmlHTTP.responseText);
				// 在插入新內容之前先清除menu
				menuElement = document.querySelector(".menu");
				if (menuElement != null) {
					menuElement.innerHTML = "";
					// 獲取第一個物件的相關資訊
					for (var i = 0; i < response.length; i++) {
						var firstItem = response[i];
						const pname = escapeHTML(firstItem.pname);//餐點名稱
						const price = escapeHTML(firstItem.price);//餐點價錢
						const noodleOptions = firstItem.image;//餐點圖片

						var listItem = document.createElement("li");
						listItem.className = "menu-item";

						// 構建HTML字串
						listItem.innerHTML = `
                    		<img src='./image/${pname}.png' alt='${pname}' />
                   			<h2 class='menu-item-title'>${pname}</h2>
                    		<p class='price'>價格：${price}</p>
                    		<div class='circle-button'>
                        		<p>
		                           <input type='radio' name='noodle${i}' value='thin${i}' id='thin${i}' />
		                           <label for='thin${i}'>細麵</label>
		                           <input type='radio' name='noodle${i}' value='macaroni${i}' id='macaroni${i}' />
		                           <label for='macaroni${i}'>筆管麵</label>
		                           <input type='radio' name='noodle${i}' value='rice${i}' id='rice${i}' />
		                           <label for='rice${i}'>飯</label>
		                           <input type='checkbox' name='topping' value='checkbox${i}' id='checkbox${i}' />
		                           <label for='checkbox${i}'>焗烤</label>
                        		</p>
                    		</div>
		                    <div class='button-container'>
		                        <button class='add-to-cart' id='add-cart${i}' onclick='add_shopping(this)'>加入購物車</button>
		                    </div>
                		`;
						//將列表項添加到菜單中
						menuElement.appendChild(listItem);
					}
				}
			} else {
				alert('提交訂單時出錯:' + xmlHTTP.status + xmlHTTP.responseText);
			}
		}
	}

	xmlHTTP.send();
}

//使用轉義函數避免格是被竄改
function escapeHTML(str) {
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
}




