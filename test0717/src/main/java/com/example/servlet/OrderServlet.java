package com.example.servlet;

import java.io.*;
import java.sql.*;
import javax.naming.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.example.db.MenuDAO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/doOrderServlet")
public class OrderServlet extends HttpServlet {
	private static final long serialVersionUID = -7123408454023156516L;

	// private static String sql = "SELECT * FROM product;";
	// QueryExecutor queryExecutor = new QueryExecutor();//無須創建
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		JSONArray jsonArray = new JSONArray();

		String menu_option = "";
		menu_option = request.getParameter("menu_option");

		response.setCharacterEncoding("UTF-8");
		// 將相關資訊組合成一個JSON對象
		ResultSet resultSet;
		try {
			System.out.println(menu_option);
			if (menu_option.matches("^[A-D]$")) {
				resultSet = MenuDAO.getMenuByBlock(menu_option);
				System.out.println("選擇餐點");
			} else {
				System.out.println("全部餐點");
				resultSet = MenuDAO.getAllMenu();
			}
			while (resultSet.next()) {
				try {
					// Retrieve data from each row
					JSONObject jsonResponse = new JSONObject();
					jsonResponse.put("pname", resultSet.getString("product_name"));
					jsonResponse.put("price", resultSet.getString("product_price"));
					jsonArray.put(jsonResponse);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			MenuDAO.closeResources();
			menu_option = "";
		} catch (SQLException | NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			System.out.println("資料庫沒有連線或發生錯誤");
		}

		// 設定響應的Content-Type為application/json
		response.setContentType("application/json");
		// 將JSON對象作為響應發送給客戶端
		PrintWriter out = response.getWriter();
		out.print(jsonArray.toString());
		out.flush();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

	// SQL查詢失敗
	private void handleError(HttpServletResponse response, Exception e) throws IOException {
		e.printStackTrace(); // 在控制台打印堆棧跟踪
		response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 返回400錯誤碼
		response.getWriter().write("Error: " + e.getMessage()); // 返回具體錯誤信息給客戶端
	}

}
