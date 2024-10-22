package com.order.date;

import java.io.Serializable;


/*餐點項目*/
public class OrderItemBean implements Serializable {
	private static final long serialVersionUID = 3539306315310968895L;
	/*餐點名稱*/
	private String item;
	/*細麵、筆管麵、飯*/
    private String noodle;
    /*焗烤*/
    private String topping;
    /*數量*/
    private int quantity;
    /*價格*/
    private int price;
    
    
    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getNoodle() {
        return noodle;
    }

    public void setNoodle(String noodle) {
        this.noodle = noodle;
    }

    public String getTopping() {
        return topping;
    }

    public void setTopping(String topping) {
        this.topping = topping;
    }
    
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    public int getPrice() {
        return price;
    }
    
    public void setPrice(int price) {
        this.price = price;
    }
    
}
