package com.example.db;

import java.sql.SQLException;

import javax.naming.NamingException;

/*插入資料表*/
public class OrderConfirmDAO {

	/* 顧客電話地址 */
	public static int insertCustomer(String customer_name, String customer_phone, String customer_address)
			throws SQLException, NamingException {
		String insertCustomerSQL = "INSERT INTO customers (customer_name, customer_phone, customer_address) VALUES (?, ?, ?)";
		return QueryExecutor.executeUpdate(insertCustomerSQL, customer_name, customer_phone, customer_address);
	}

	/* 顧客取餐方式或取餐時間 */
	public static int insertOrder(int customer_id, String orderType, String order_date, String order_time)
			throws SQLException, NamingException {
		String insertOrderSQL = "INSERT INTO order_od (customer_id, order_way, order_date, order_time) VALUES (?, ?, ?, ?)";
		return QueryExecutor.executeUpdate(insertOrderSQL, customer_id, orderType, order_date, order_time);
	}

	/* 訂單明細 */
	public static void insertOrderDetail(int order_id, int product_id, String order_item, String order_add, int order_quantity,
			int price) throws SQLException, NamingException {
		String insertOrderDetailSQL = "INSERT INTO order_detail (order_id, product_id, order_item, order_add,order_quantity, price) VALUES (?, ?, ?, ?, ?, ?)";
		QueryExecutor.executeUpdate(insertOrderDetailSQL,order_id, product_id, order_item,order_add, order_quantity, price);
	}
}
