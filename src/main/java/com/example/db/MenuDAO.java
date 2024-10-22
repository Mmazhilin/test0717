package com.example.db;


import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.NamingException;

/*餐點查詢*/
public class MenuDAO {
	
	/*顯示所有餐點*/
	public static ResultSet getAllMenu() throws SQLException, NamingException {
        String sql = "SELECT * FROM menu";
        return QueryExecutor.executeQuery(sql);
    }

	/*選擇餐點類型*/
    public static ResultSet getMenuByBlock(String productId) throws SQLException, NamingException {
        String sql = "SELECT * FROM menu WHERE block = ?";
        return QueryExecutor.executeQuery(sql, productId);
    }

    /*查詢餐點Id*/
    public static int getMenuById(String productName) throws SQLException, NamingException {
        String sql = "SELECT * FROM menu WHERE product_name = ?";
        return QueryExecutor.executeQueryId(sql, productName);
    }
    
    /*
    public static void updateProduct(Product product) throws SQLException, NamingException {
        String sql = "UPDATE product SET name = ?, price = ? WHERE id = ?";
        try (Connection connection = getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, product.getName());
            statement.setDouble(2, product.getPrice());
            statement.setInt(3, product.getId());
            statement.executeUpdate();
        }
    }*/

    /*關閉連線所有資源*/
    public static void closeResources() {
    	QueryExecutor.closeResources();
    }
}
