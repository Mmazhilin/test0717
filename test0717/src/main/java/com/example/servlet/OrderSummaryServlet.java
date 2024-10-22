package com.example.servlet;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.order.date.OrderItemBean;
import com.order.date.ListValueBean;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Servlet implementation class OrderCheckoutServlet
 */
@WebServlet("/doOrderSummary")
public class OrderSummaryServlet extends HttpServlet {
	private static final long serialVersionUID = 418182174968179521L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			// 將 JSON 資料轉換為 Java 物件
			JSONObject jsonObject = parseRequestJson(request);
			//System.out.println(request);
			String totalAmount = jsonObject.getString("totalAmount");
			JSONArray jsonOrders = jsonObject.getJSONArray("orders");
			List<OrderItemBean> orders = parseOrderItems(jsonOrders);
			System.out.println("總價:" + totalAmount);

			setValueBean(orders);// 存入Bean

			// 將訂單數據存儲到HttpSession中
			storeOrderDataInSession(request.getSession(), orders, totalAmount);
			
			// 需要重定向或返回結果給客戶端
			boolean redirectNeeded = true;
			// 構建返回給客戶端的JSON數據
			JSONObject jsonResponse = new JSONObject();
			//只要是項目或價錢沒有的話才不進行跳轉
			if(totalAmount.equals(0) || (jsonOrders.length()==0)) {
				redirectNeeded=false;
			}else {
				redirectNeeded=true;
			}
			jsonResponse.put("redirect", redirectNeeded);
			// 設置響應的Content-Type
			response.setContentType("application/json");
			// 將JSON數據寫入響應中
			response.getWriter().write(jsonResponse.toString());
			// 轉寄到 result.jsp 頁面進行顯示 這行沒用因為是AJAX
			// request.getRequestDispatcher("/settledAmount.html").forward(request,response);
		} catch (JSONException | IOException e) {
			handleError(response, e);
		}
	}

	//把request解讀JSON格式
	private JSONObject parseRequestJson(HttpServletRequest request) throws IOException, JSONException {
		try (BufferedReader reader = request.getReader()) {
			StringBuilder jsonPayload = new StringBuilder();
			String line;
			while ((line = reader.readLine()) != null) {
				jsonPayload.append(line);
			}
			return new JSONObject(jsonPayload.toString());
		}
	}

	//把回傳的json存入陣列儲存到bean裡面
	private List<OrderItemBean> parseOrderItems(JSONArray jsonOrders) throws JSONException {
		List<OrderItemBean> orders = new ArrayList<>();
		for (int i = 0; i < jsonOrders.length(); i++) {
			JSONObject jsonOrder = jsonOrders.getJSONObject(i);
			OrderItemBean order = new OrderItemBean();
			order.setItem(jsonOrder.optString("item"));
			order.setNoodle(jsonOrder.optString("noodle"));
			order.setTopping(jsonOrder.optString("topping"));
			order.setQuantity(jsonOrder.optInt("quantity"));
			order.setPrice(jsonOrder.optInt("price"));
			orders.add(order);
		}
		return orders;
	}

	private void setValueBean(List<OrderItemBean> orders) {
		// 進行適當的後續處理，例如將訂單資料存儲在會話中或直接處理
		ListValueBean valueBean = new ListValueBean();
		for (OrderItemBean order : orders) {
			valueBean.addOrder(order);
			System.out.println("商品：" + order.getItem() + "，麵條：" + order.getNoodle() 
			+ "，配料：" + order.getTopping() + "，數量：" + order.getQuantity() + "，價格：" + order.getPrice());
		}
	}

	// 將訂單數據存儲到Session中
	private void storeOrderDataInSession(HttpSession session, List<OrderItemBean> orders, String totalAmount) {
		session.setAttribute("orders", orders);
		session.setAttribute("totalAmount", totalAmount);
	}

	//JSON存入失敗
	private void handleError(HttpServletResponse response, Exception e) throws IOException {
		e.printStackTrace(); // 在控制台打印堆棧跟踪
		response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 返回400錯誤碼
		response.getWriter().write("Error: " + e.getMessage()); // 返回具體錯誤信息給客戶端
	}
}
