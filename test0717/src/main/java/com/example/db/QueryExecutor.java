package com.example.db;

import javax.naming.NamingException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

class QueryExecutor extends DatabaseConnection {

	private static Connection connection = null;
	/*資料庫裏頭緩存的資料*/
	private static PreparedStatement statement = null;
	/*查詢的結果集(可以用他做資料上的處理)*/
	private static ResultSet resultSet = null;
	// private static String sql = "SELECT * FROM product ";
	// 取得剛插入的顧客ID
	private static int customer_id = -1;
	private static int menu_id = -1; // Initialize with a default value

	/*執行查詢回傳ResultSet(處理查詢結果)*/
	public static ResultSet executeQuery(String sql, Object... params) throws SQLException, NamingException {
		try {
			connection = getConnection();
			/*有連線才進來執行*/
			if (connection != null) {
				/*緩存到statement*/
				statement = connection.prepareStatement(sql);
				// 多筆資料欄位存放在params來透過statement存放進去
				for (int i = 0; i < params.length; i++) {
					statement.setObject(i + 1, params[i]);
					System.out.println(i + 1 + ":" + params[i]);
				}
				resultSet = statement.executeQuery();
			}
			return resultSet;

		} finally {
			/*不先關閉是因為要到servlet來進行資料傳遞到網頁上所以不能先關閉*/
			/*如果需要可以寫個jsonObject來進行存放就不需要等servlet做完事情才關閉*/
			// close(connection, statement, resultSet);
		}
	}

	/*執行查詢ID回傳ID(顯示每次ID結果)*/
	public static int executeQueryId(String sql, Object... params) throws SQLException, NamingException {
		//資料表id歸零(每次要做的動作)
		menu_id = -1;
		try {
			connection = getConnection();
			/*緩存到statement*/
			statement = connection.prepareStatement(sql);

			// 多筆資料欄位存放在params來透過statement存放進去
			for (int i = 0; i < params.length; i++) {
				statement.setObject(i + 1, params[i]);
			}
			/*執行查詢透過statement緩存的資料來回傳到resultSet*/
			resultSet = statement.executeQuery();

			/*取得ID*/
			if (resultSet.next()) {
				menu_id = resultSet.getInt(1); // 假設ID位於第一行第一列
			} else {
				throw new SQLException("Query did not return any results.");
			}
			/*回傳查詢的ID*/
			return menu_id;
		} finally {
			//最後關閉資料庫
			close(connection, statement, resultSet);
		}
	}

	/*執行更新資料表的內容*/
	public static int executeUpdate(String sql, Object... params) throws SQLException, NamingException {
		customer_id = -1;
		try {
			connection = getConnection();
			statement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

			// Set parameters for PreparedStatement
			for (int i = 0; i < params.length; i++) {
				statement.setObject(i + 1, params[i]);
			}

			/*更新資料取得當下的id*/
			int affectedRows = statement.executeUpdate();

			if (affectedRows == 0) {
				throw new SQLException("Creating customer/order failed, no rows affected.");
			}
			/**/
			try (ResultSet generatedKeys = statement.getGeneratedKeys()) {
				if (generatedKeys.next()) {
					customer_id = generatedKeys.getInt(1);
				} else {
					// throw new SQLException("Creating customer/order failed, no ID
					// obtained."+sql);
				}
			}
		} finally {
			//最後關閉資料庫
			close(connection, statement, resultSet);
		}

		return customer_id;
	}
	/*
	 * public static void executeUpdate(String sql, Object... params) throws
	 * SQLException, NamingException { try { connection = getConnection(); statement
	 * = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
	 * 
	 * // Set parameters for PreparedStatement for (int i = 0; i < params.length;
	 * i++) { statement.setObject(i + 1, params[i]); }
	 * 
	 * statement.executeUpdate(); } finally { //close(connection, statement,
	 * resultSet); } }
	 */
	// 插入订单详情到order_detail表（假设你有多个订单项）

	/*
	 * public static ResultSet executeQuery() throws SQLException, NamingException {
	 * try { connection = getConnection(); //System.out.println(sql +
	 * "Where block='" + sql2 + "'"); statement =
	 * connection.prepareStatement(sql+";"); resultSet = statement.executeQuery();
	 * return resultSet; } finally {
	 * 
	 * // Close connection, statement, and result set
	 * 
	 * } }
	 */
	/*
	 * public static ResultSet executeQuery2(String sql2) throws SQLException,
	 * NamingException { try { connection = getConnection();
	 * //System.out.println(sql + "Where block='" + sql2 + "'"); statement =
	 * connection.prepareStatement(sql + "Where block='" + sql2 + "'"); resultSet =
	 * statement.executeQuery(); return resultSet; } finally {
	 * 
	 * // Close connection, statement, and result set
	 * 
	 * } }
	 */
	/* 關閉連線所有資源 */
	public static void closeResources() {
		close(connection, statement, resultSet);
	}
}
