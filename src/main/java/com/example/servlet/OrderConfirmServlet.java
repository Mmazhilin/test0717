package com.example.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.example.db.MenuDAO;
import com.example.db.OrderConfirmDAO;
import com.order.date.OrderItemBean;

/*開發中*/
/**
 * Servlet implementation class SettleAccountServlet
 */
@WebServlet("/doOrderConfirmServlet")
public class OrderConfirmServlet extends HttpServlet {
	private static final long serialVersionUID = -9154838211481682000L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public OrderConfirmServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		// 設定請求和回應的字元編碼
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		// 從Session中獲取訂單數據
		HttpSession session = request.getSession();
		List<OrderItemBean> orders = (List<OrderItemBean>) session.getAttribute("orders");
		String totalAmount = (String) session.getAttribute("totalAmount");
		// 可以在這裡處理訂單摘要頁面的顯示邏輯，例如設置屬性或直接轉發到JSP頁面
		System.out.println("OrderConfirmServlet"+totalAmount);

		// 取得表單數據
		String customer_name = request.getParameter("customer-name");
		String customer_phone = request.getParameter("customer-phone");
		String customer_address = request.getParameter("customer-address");
		String orderType = request.getParameter("orderType");
		String order_date = request.getParameter("date-picker");

		String hour_picker = request.getParameter("hour-picker");
		String minute_picker = request.getParameter("minute-picker");

		String order_time = hour_picker + ":" + mapMinuteValue(minute_picker);

		System.out.println("取餐:" + orderType);
		System.out.println("取餐日期:" + order_date);
		System.out.println("取餐時間:" + order_time);

		System.out.println("姓名：" + customer_name);
		System.out.println("手機號碼：" + customer_phone);
		System.out.println("地址:" + customer_address);
		
		if(orderType != null && orderType.equals("外帶")) {
			customer_address="";
		}

		try {
			/* 插入顧客資料表 */
			int customer_id = OrderConfirmDAO.insertCustomer(customer_name, customer_phone, customer_address);
			/* 插入訂單資訊到order_od表 */
			int Order_id = OrderConfirmDAO.insertOrder(customer_id, orderType, order_date, order_time);
			// 將訂單詳細資料插入 order_detail 表（假設您有多個訂單商品）
			for (OrderItemBean order : orders) {
				int menu_id = MenuDAO.getMenuById(order.getItem());
				OrderConfirmDAO.insertOrderDetail(Order_id, menu_id, order.getNoodle(), order.getTopping(),
						order.getQuantity(), order.getPrice());
			}

		} catch (SQLException | NamingException ex) {
			ex.printStackTrace();
			// response.getWriter().println("Error: " + ex.getMessage());
		}
		// 轉發到訂單摘要頁面
		// request.getRequestDispatcher("/settledAmount.html").forward(request,
		// response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

	public String mapMinuteValue(String minuteValue) {
		switch (minuteValue) {
		case "0":
			return "00";
		case "1":
			return "15";
		case "2":
			return "30";
		case "3":
			return "45";
		default:
			return ""; // handle unexpected values if necessary
		}
	}

	public List<OrderItemBean> processOrders(HttpSession session) {
		List<OrderItemBean> orders = null;
		Object ordersObject = session.getAttribute("orders");

		if (ordersObject instanceof List) {
			orders = (List<OrderItemBean>) ordersObject;
		} else {
			// Handle case where "orders" attribute is not a List<OrderItem>
			//throw new IllegalStateException("Attribute 'orders' is not a List<OrderItem> in session");
		}

		// 繼續處理 orders
		return orders;
	}
}
