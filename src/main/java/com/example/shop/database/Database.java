package com.example.shop.database;

import java.sql.*;

public class Database {
    public static Connection getDB(){
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            String URL = "jdbc:oracle:thin:@localhost:1521:XE";
            Connection conn = DriverManager.getConnection(URL,"hr","hr");
            return  conn;
        } catch (Exception e) {
            return null;
        }
    }
}
