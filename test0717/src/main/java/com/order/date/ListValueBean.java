package com.order.date;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/*多筆資料儲存*/
public class ListValueBean implements Serializable {
    private List<OrderItemBean> orders;

    public ListValueBean() {
        this.orders = new ArrayList<>();
    }

    public List<OrderItemBean> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderItemBean> orders) {
        this.orders = orders;
    }
    
    public void addOrder(OrderItemBean order) {
        this.orders.add(order);
    }
}
