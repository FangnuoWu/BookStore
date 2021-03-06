package com.bookstore.controller;

import com.bookstore.dto.OrderRequestDto;
import com.bookstore.exception.OutOfStockException;
import com.bookstore.service.CartService;
import com.bookstore.service.OrderService;
import com.bookstore.dto.OrderResponseDto;
import com.bookstore.utils.response.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

import static com.bookstore.constant.ResponseCode.OUT_OF_STOCK;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private CartService cartService;

    @RequestMapping(value="/order/get/one")
    private @ResponseBody List<OrderResponseDto> getOrder(@RequestParam("userId") Long userId,
                                                          @RequestParam("query") String query,
                                                          @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date start,
                                                          @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date end){
        return orderService.getOrder(userId, query, start, end);
    }

    @RequestMapping(value="/order/add")
    private HttpResponse addOrder(@Valid @RequestBody OrderRequestDto orderRequestDto){
        try{
            return HttpResponse.success(orderService.addOrder(orderRequestDto));
        }catch (OutOfStockException e){
            HttpResponse response = HttpResponse.fail(OUT_OF_STOCK);
            response.setData(cartService.getCart(orderRequestDto.getUserId()));
            return response;
        }
    }

    @RequestMapping(value="/order/get/all")
    private @ResponseBody List<OrderResponseDto> getAllOrder(@RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date start,
                                                             @RequestParam("query") String query,
                                                             @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date end){
        return orderService.getAllOrder(query, start, end);
    }
}