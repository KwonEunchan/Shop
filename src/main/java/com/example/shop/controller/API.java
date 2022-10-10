package com.example.shop.controller;

import com.example.shop.database.UserDTO;
import com.example.shop.item.ItemDAO;
import com.example.shop.user.UserDAO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class API {

    @PostMapping("/reqjoin")
    public boolean join(@RequestBody UserDTO userdto) {
        boolean result = UserDAO.join(userdto.getId(), userdto.getPw());
        return result;
    }

    @PostMapping("/login")
    public String login(@RequestBody UserDTO userdto) {
        String result = UserDAO.login(userdto.getId(), userdto.getPw());
        return result;
    }

    @GetMapping("/item")
    public String getItemCode(@RequestParam String category) {
        String result = ItemDAO.getItem(category);
        return result;
    }

    @GetMapping("/iteminfo")
    public String getItemInfo(@RequestParam String[] codes) {
        if(codes.length==0){
            return "[]";
        }
        else{
            String result = ItemDAO.getItemInfo(codes);
            return result;
        }
    }

    @GetMapping("incart")
    public boolean inCart(@RequestParam String id, @RequestParam String code){
        return ItemDAO.inCart(id,code);
    }

    @GetMapping("getcart")
    public String inCart(@RequestParam String id){
        return ItemDAO.getCart(id);
    }
}
