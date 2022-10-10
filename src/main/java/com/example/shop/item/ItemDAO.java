package com.example.shop.item;

import com.example.shop.database.Database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ItemDAO {
    public static String getItem(String category) {
        Connection conn = Database.getDB();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        String SQL = null;
        try {
            if (category.equals("전체")) {
                SQL = "SELECT CODE FROM SHOP_ITEMS";
                pstmt = conn.prepareStatement(SQL);
            } else if (category.equals("인기")) {
                SQL = "SELECT CODE FROM SHOP_ITEMS ORDER BY SELL DESC";
                pstmt = conn.prepareStatement(SQL);
            } else {
                SQL = "SELECT CODE FROM SHOP_ITEMS WHERE CATEGORY = ?";
                pstmt = conn.prepareStatement(SQL);
                pstmt.setString(1, category);
            }

            rs = pstmt.executeQuery();

            String result = "";

            while (rs.next()) {
                result += rs.getString("CODE");
                result += ",";
            }

            return result;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static String getItemInfo(String[] codes) {
        Connection conn = Database.getDB();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {

            StringBuilder data = new StringBuilder();
            data.append("[\n");

            for (int i = 0; i < codes.length; i++) {
                pstmt = conn.prepareStatement("SELECT CODE,NAME,INFO,PRICE FROM SHOP_ITEMS WHERE CODE = ?");
                pstmt.setString(1, codes[i]);
                rs = pstmt.executeQuery();

                if (rs.next()) {
                    StringBuilder sb = new StringBuilder();
                    sb.append("{\n");
                    sb.append("\"code\" : \"" + rs.getString("CODE") + "\",\n");
                    sb.append("\"name\" : \"" + rs.getString("NAME") + "\",\n");
                    sb.append("\"info\" : \"" + rs.getString("INFO") + "\",\n");
                    sb.append("\"price\" : \"" + rs.getInt("PRICE") + "\"\n");
                    sb.append("}");
                    data.append(sb.toString());
                    data.append(",\n");
                }
            }

            String result = data.substring(0, data.length() - 2) + "\n]";
            return result;


        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static boolean inCart(String id, String code) {
        Connection conn = Database.getDB();
        PreparedStatement pstmt = null;
        try {
            pstmt = conn.prepareStatement("INSERT INTO SHOP_CART VALUES(?,?)");
            pstmt.setString(1, id);
            pstmt.setString(2, code);
            pstmt.executeUpdate();

            return true;
        } catch (SQLException e) {
            return false;
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static String getCart(String id) {
        Connection conn = Database.getDB();
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        String result = null;
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            pstmt = conn.prepareStatement("SELECT CODE FROM SHOP_CART WHERE ID = ?");
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            while (rs.next()) {
                sb.append(rs.getString("CODE") + ",");
            }

            result = sb.substring(0, sb.length() - 1);
            result += "]";

        } catch (SQLException e) {
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        if(result.equals("]")){
            return "[]";
        }
        else{
            return result;
        }
    }
}
