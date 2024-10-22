<%@ page contentType="text/html;charset=utf-8" %> <%@ page import="java.io.*" %>
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
    <title>點餐畫面</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="css/style_layout.css" />
    <link rel="stylesheet" href="css/menu.css" />
    <link rel="stylesheet" href="css/order_summary.css" />

    <style>
      /*手機版(奶油番茄青醬蒜辣、點餐畫面、訂單摘要)*/
      .box-grid {
        display: grid;
        grid-template-columns: 1fr; /* 在移動設備上，列寬為 1fr */
        grid-template-rows: 50px 1fr 450px;
        grid-template-areas: "sidebar" "menu" "order";
      }
      
      .page-grid {
        height: auto; 
      }
      
      .menu-options {
        padding: 4px 0;
        grid-auto-flow: column;
      }

      .sidebar {
        grid-area: sidebar;
      }

      .menu-content2 {
        grid-area: menu;
      }

      .order-summary {
        grid-area: order;
      }
      /* page-grid影響到間中三欄 */
      @media screen and (min-width: 768px) {
        .menu-options {
          padding: 48px 0;
          grid-auto-flow: row;
        }
        .box-grid {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 150px 1fr 300px; /* 在電腦設備上，列寬為 1fr */
          grid-template-rows: 1fr; /*分為三行，每行高度自適應*/
          grid-template-areas: "sidebar menu order";
          /*overflow-y: scroll; /* 如果内容超出高度，显示垂直滚动条 */
        }
        .menu {
          /* background-color: rgb(60, 60, 250); */
          white-space: wrap;
          /* grid-template-columns: repeat(3, 1fr); */
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          height: auto;
          /*overflow-y: auto; /* 如果内容超出容器高度，显示垂直滚动条 */
        }
        .page-grid {
          height: auto;
          min-height: 112vh;
        }
      }
    </style>
  </head>
  <body>
    <!--整頁排版grid-->
    <div class="page-grid">
      <!-- header 主要分頁-->
      <div class="up d-flex align-items-end">
        <div class="container-fluid">
          <header class="d-flex flex-wrap align-items-center justify-content-md-between py-2 mb-2 border-bottom row">
            <div class="col-md-3 mb-2 mb-md-0 d-flex">
              <a href="./index.html" class="d-flex link-body-emphasis text-decoration-none">
                <!-- <i class="bi bi-house-door text-light-emphasis display-3" style="font-size: 2rem;"></i> -->
                <!--<img class="img-house-door text-light-emphasis rounded" src="image/logo.png" alt="Pasta"></img> -->
                <font class="text-light-emphasis display-3" style="vertical-align: inherit; font-weight: 700">Pasta</font>
              </a>
            </div>
            <!--<nav>區塊用於包含連結的無序清單,顯示為 sidebar、導覽列、以及下拉式選單-->
            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 align-self-end">
              <li>
                <a href="./order.jsp" class="nav-link px-4 link-dark"><font style="vertical-align: inherit; font-weight: 500">Pasta點餐</font></a>
              </li>
              <li>
                <!-- <a href="#" class="nav-link px-4 link-dark"><font style="vertical-align: inherit; font-weight: 500" onclick="switchToMap()">地圖</font></a> -->
              </li>
            </ul>
            <!--右邊登入-->
            <div class="col-md-3 text-end">
              <!-- <button type="button" class="btn btn-outline-primary px-4 me-0"><font style="vertical-align: inherit">登入</font></button> -->
            </div>
          </header>
        </div>
      </div>

      <div class="box-grid content">
        <!-- sidebar 餐點分類-->
        <div class="sidebar">
          <div class="menu-options bg-dark d-grid gap-4 px-4 justify-content-space-around">
            <a href="#" class="col p-2 menu-option btn btn-dark">奶油</a>
            <a href="#" class="col p-2 menu-option btn btn-dark">番茄</a>
            <a href="#" class="col p-2 menu-option btn btn-dark">青醬</a>
            <a href="#" class="col p-2 menu-option btn btn-dark">蒜辣</a>
          </div>
        </div>

        <!-- menu-content2 點餐清單-->
        <div class="menu-content2">
          <div class="menu-bg-content2">
            <div class="menu-title">
              <h1>Pasta點餐畫面</h1>
            </div>
            <ul class="menu">
              <!-- Menu Item 1 -->
            </ul>
          </div>
        </div>

        <!-- order-summary 訂單摘要-->
        <div class="order-summary content3">
          <div class="order-summary-item">
            <h2 class="menu-item-title">訂單摘要</h2>
            <ul class="list-group">
              <!-- 其他訂單項目可以類似地加入 -->
            </ul>
            <hr />
            <h3>總計:$0</h3>
            <!-- 右邊的訂單摘要 -->
            <div class="btn">
              <button class="btn-amount" onclick="amount()">確認訂單</button>
            </div>
          </div>
        </div>
      </div>

      <!-- footer 店家資訊-->
      <jsp:include page="footer.html" />
    </div>

    <script type="text/javascript" src="js/order/menu_select.js"></script>
    <script type="text/javascript" src="js/order/order_shopping.js"></script>
    <script type="text/javascript" src="js/order/order_amount.js"></script>

    <!-- Include Bootstrap JS and dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
      integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.min.js"
      integrity="sha384-lpyLfhYuitXl2zRZ5Bn2fqnhNAKOAaM/0Kr9laMspuaMiZfGmfwRNFh8HlMy49eQ"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
