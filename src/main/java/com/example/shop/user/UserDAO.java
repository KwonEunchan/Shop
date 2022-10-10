package com.example.shop.user;

import com.example.shop.database.Database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDAO{
    public static String searchUser(String id){
        Connection conn = Database.getDB();
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            pstmt = conn.prepareStatement("SELECT ID FROM SHOP_USERS WHERE ID = ?");
            pstmt.setString(1,id);
            rs = pstmt.executeQuery();

            if(rs.next()){
                return rs.getString("ID");
            }
            else{
                return null;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }finally {
            try {
                if(rs!=null) rs.close();
                if(pstmt!=null) pstmt.close();
                if(conn!=null) conn.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

    }

    public static boolean join(String id, String pw){
        if(searchUser(id)!=null){
            return false;
        }
        else{
            Connection conn = Database.getDB();
            PreparedStatement pstmt = null;
            ResultSet rs = null;

            try {
                pstmt = conn.prepareStatement("INSERT INTO SHOP_USERS VALUES (?,?)");
                pstmt.setString(1,id);
                pstmt.setString(2,pw);
                pstmt.executeUpdate();
                return true;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            } finally {
                try {
                    if(rs!=null) rs.close();
                    if(pstmt!=null) pstmt.close();
                    if(conn!=null) conn.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    public static String login(String id, String pw){
        if(searchUser(id)==null){
            return null;
        }
        else{
            Connection conn = Database.getDB();
            PreparedStatement pstmt = null;
            ResultSet rs = null;

            try {
                pstmt = conn.prepareStatement("SELECT PW FROM SHOP_USERS WHERE ID = ?");
                pstmt.setString(1,id);
                rs = pstmt.executeQuery();
                rs.next();
                if(pw.equals(rs.getString("PW"))){
                    return id;
                }
                else return null;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            } finally {
                try {
                    if(rs!=null) rs.close();
                    if(pstmt!=null) pstmt.close();
                    if(conn!=null) conn.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }
}