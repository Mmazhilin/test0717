<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>確認點餐</title>
    <link rel="stylesheet" href="css/confirm.css" />
    <style></style>
  </head>
  <body>
    <div class="container">
      <h1>確認點餐</h1>
      <br />
      <br />
      <div class="order-summary" id="display-container">
        <!-- 這裡將由 JavaScript 動態生成點餐項目 -->
        <div>
          <h2>您的訂單</h2>
        </div>
        <div class="grid-container1">
          <div class="product-th">餐點名稱</div>
          <div class="item-th">主食</div>
          <div class="add-th">加點</div>
          <div class="quantity-th">數量</div>
          <div class="price-th">價格</div>
        </div>
        <!-- 使用JSP標記疊代el訂單項目 -->
        <c:forEach items="${sessionScope.orders}" var="order">
          <div class="grid-container">
            <div class="product-td">${order.item}</div>
            <div class="item-td">${order.noodle}</div>
            <div class="add-td">${order.topping}</div>
            <div class="quantity-td">${order.quantity}</div>
            <div class="price-td">${order.price}</div>
          </div>
        </c:forEach>

        <hr />

        <p class="amount">餐點金額總計：&nbsp;&nbsp;${sessionScope.totalAmount}</p>
      </div>

      <form id="orderForm" action="doOrderConfirmServlet" method="post" onsubmit="return validateForm()">
        <div class="input-group">
          <label for="orderType">選擇取餐方式：</label>
          <select id="orderType" name="orderType" onchange="toggleAddressField()">
            <option value="外帶">外帶</option>
            <option value="外送">外送</option>
          </select>
        </div>

        <div class="input-group">
          <label for="date-picker">選擇取餐日期:</label>
          <input type="date" id="date-picker" name="date-picker" style="width: 160px" onkeypress="checkPicker(event)" />
        </div>

        <div class="input-group">
          <label for="hour-picker">選擇取餐時間:</label>
          <select id="hour-picker" name="hour-picker">
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
          </select>
          <select id="minute-picker" name="minute-picker">
            <option value="0">00</option>
            <option value="1">15</option>
            <option value="2">30</option>
            <option value="3">45</option>
          </select>
        </div>

        <div class="input-group">
          <label for="customer-name">姓名：</label>
          <input type="text" id="customer-name" name="customer-name" placeholder="請輸入您的姓名" required pattern="[\u4E00-\u9FFFa-zA-Z]+" />
        </div>

        <div class="input-group">
          <label for="customer-phone">手機號碼：</label>
          <input type="tel" id="customer-phone" name="customer-phone" placeholder="請輸入您的手機號碼" required pattern="\d{10}" />
        </div>

        <div id="addressField" class="input-group">
          <label for="customer-address">地址：</label>
          <input type="text" id="customer-address" name="customer-address" placeholder="請輸入您的地址" pattern="[\u4E00-\u9FFF\da-zA-Z\-]+" />
        </div>

        <div class="input-group">
          <button type="submit" class="confirm-btn">確認訂單並結帳</button>
        </div>
      </form>
    </div>

    <script type="text/javascript">
      function checkPicker(event) {
        var datePickerMin = document.getElementByID("date-picker").min;
        var datePickerValue = document.getElementByID("date-picker").value;
        if (datePickerMin == datePickerValue) {
          return false;
        } else {
          return true;
        }
      }
    </script>
    <script type="text/javascript">
      var orderType = document.getElementById("orderType");
      var customerName = document.getElementById("customer-name");
      let customerNameValue = ""; //取姓名
      var customerPhone = document.getElementById("customer-phone");
      let customerPhoneValue = ""; //取手機
      var customerAddress = document.getElementById("customer-address");
      let customerAddressValue = ""; //取地址
      var regxPhone = /^\d{10}$/; //電話正則表達
      var regxName = /^[\u4E00-\u9FFFa-zA-Z]+$/; //姓名正則表達
      var regxAddress = /^[\u4E00-\u9FFF\da-zA-Z\-]+$/;
      var minutePicker = document.getElementById("minute-picker");
      var hourPicker = document.getElementById("hour-picker");

      customerName.addEventListener("input", function (event) {
        customerNameValue = customerName.value;
        if (customerName.value.trim() === "") {
          customerName.setCustomValidity("此欄位為必填寫，請重新填寫");
        } else if (!regxName.test(customerNameValue)) {
          customerName.setCustomValidity("姓名格式錯誤，請重新填寫中文和英文");
        } else {
          customerName.setCustomValidity("");
        }
      });

      customerPhone.addEventListener("input", function (event) {
        customerPhoneValue = customerPhone.value;
        if (customerPhone.value.trim() === "") {
          customerPhone.setCustomValidity("此欄位為必填寫，請重新填寫");
        } else if (!regxPhone.test(customerPhoneValue)) {
          customerPhone.setCustomValidity("格式錯誤，請輸入十位電話號碼");
        } else {
          customerPhone.setCustomValidity("");
        }
      });

      customerAddress.addEventListener("input", function (event) {
        customerAddressValue = customerAddress.value;
        if (customerAddress.value.trim() === "") {
          customerAddress.setCustomValidity("此欄位為必填寫，請重新填寫");
        } else if (!regxAddress.test(customerAddress.value)) {
          customerAddress.setCustomValidity("格式錯誤，請輸入中文或是F、符號-");
        } else {
          customerAddress.setCustomValidity("");
        }
      });

      function validateForm() {
        //用來判斷表單在發送前檢查
        var isValid = true;
        var now = new Date();
        var currentHour = now.getHours(); //取小時

        if (hourPicker.disabled == true && minutePicker.disabled == true) {
          if (currentHour < 9) {
            alert("還沒到營業時間請9點在試一次");
            return false; // 阻止表單提交
          } else {
            alert("已經打烊請明天9點在試一次");
            return false; // 阻止表單提交
          }
        }

        if (!regxName.test(customerNameValue)) {
          //alert("姓名格式錯誤，請重新填寫中文和英文");
          return false; // 阻止表單提交
        }

        if (!regxPhone.test(customerPhoneValue)) {
          //alert("電話輸入錯誤請輸入十位");
          return false; // 阻止表單提交
        }

        //地址正則表達(最多三個數字中文不限制禁止符號空白除了-)
        if (orderType === "外送" && !regxAddress.test(customerAddressValue)) {
          alert("請輸入中文或英文禁止前後空白符號。");
          return false; // 阻止表單提交
        }
        // 如果需要進一步的檢查或處理可以在這裡添加
        return true; // 允許表單提交
      }
    </script>
    <script type="text/javascript" src="js/orderconfirm/dateUtils.js"></script>
    <script type="text/javascript" src="js/orderconfirm/takeMeal.js"></script>
    <script type="text/javascript" src="js/orderconfirm/stateDate.js"></script>
  </body>
</html>
