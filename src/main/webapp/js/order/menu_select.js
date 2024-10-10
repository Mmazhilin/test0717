var xmlHTTP;
var str;
var menuElement;
var menu_option;
set_menu();
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


function set_menu() {
	if (window.ActiveXObject) {
		xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if (window.XMLHttpRequest) {
		xmlHTTP = new XMLHttpRequest();
	}

	xmlHTTP.open("GET", "/test0717/doOrderServlet?menu_option=" + menu_option, true);

	xmlHTTP.onreadystatechange = function check_status() {
		if (xmlHTTP.status == 200) {
			if (xmlHTTP.readyState == 4) {
				var response = JSON.parse(xmlHTTP.responseText);
				// 在插入新內容之前先清除menu
				menuElement = document.querySelector(".menu");
				if (menuElement != null) {
					menuElement.innerHTML = "";
					// 獲取第一個物件的相關資訊
					for (var i = 0; i < response.length; i++) {
						var firstItem = response[i];
						var pname = firstItem.pname;
						var price = firstItem.price;
						// 構建HTML字串
						var messageHTML = "<li class='menu-item'>";
						messageHTML += "<img src='./image/" + pname + ".png' alt='" + pname + "' />";
						messageHTML += "<h2 class='menu-item-title'>" + pname + "</h2>";
						messageHTML += "<p class='price'>價格：" + price + "</p>";
						messageHTML += "<div class='circle-button'>"
						messageHTML += "<p>";
						messageHTML += "<input type='radio' name='noodle" + i + "'value='thin" + i + "'id='thin" + i + "' />";
						messageHTML += "<label for='thin" + i + "'>細麵</label>";
						messageHTML += "<input type='radio' name='noodle" + i + "'value='macaroni" + i + "' id='macaroni" + i + "' />";
						messageHTML += "<label for='macaroni" + i + "'>筆管麵</label>";
						messageHTML += "<input type='radio' name='noodle" + i + "'value='rice" + i + "' id='rice" + i + "' />";
						messageHTML += "<label for='rice" + i + "'>飯</label>";
						messageHTML += "<input type='checkbox' name='topping' value='checkbox" + i + "' id='checkbox" + i + "' />";
						messageHTML += "<label for='topping" + i + "'>焗烤</label>";
						messageHTML += "</p></div>";
						messageHTML += "<div class='button-container'>";
						messageHTML += "<button class='add-to-cart' id='add-cart" + i + "' onclick='add_shopping(this)'>加入購物車</button>";
						messageHTML += "</div>";

						// 將HTML內容插入到網頁中的特定元素中
						//document.querySelector(".page-grid").style.color = responseData3.color;
						document.querySelector(".menu").innerHTML += messageHTML;
						
					}
					//alert('提交訂單時出錯:' + xhr.status + xhr.responseText);
					//set_renew_css();
				}
			}
		}
	}
	xmlHTTP.send();
}
