package com.example.db;

import javax.naming.InitialContext;
import javax.naming.NameNotFoundException;
import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLNonTransientConnectionException;


/*資料庫連線*/
class DatabaseConnection {
	/* 連接資料庫的介面 */
	private static DataSource dataSource;
	/* 只會執行一次 */
	static {
		try {
			InitialContext initContext = new InitialContext();
			Context context = (Context) initContext.lookup("java:comp/env");
			dataSource = (DataSource) context.lookup("jdbc/project");
		} catch (NamingException e) {
			e.printStackTrace();
			// 可能的具體處理邏輯
            if (e instanceof AuthenticationException) {
                System.err.println("Authentication failed. Invalid username or password.");
                // 驗證失敗，用户名或密碼錯誤
            } else if (e instanceof NameNotFoundException) {
                System.err.println("Context or DataSource not found: " + e.getMessage());
                // 可能是由于查找路径不正确或者配置错误等
            } else {
                // 其他類型的NamingException，可以根據需要進行處理
                e.printStackTrace();
            }
			// Handle NamingException appropriately
		}
	}

	/* 取得資料庫練線 */
	protected static Connection getConnection() {
		Connection conn = null;
		try {
			conn = dataSource.getConnection();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();			
			System.out.println("資料庫沒有連線");
		}
		return conn;
	}

	/* 關閉所有的資料庫連線 */
	protected static void close(Connection connection, PreparedStatement statement, ResultSet resultSet) {
		try {
			if (resultSet != null)
				resultSet.close();
			if (statement != null)
				statement.close();
			if (connection != null)
				connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
			// Handle SQLException appropriately
		}
	}
}
