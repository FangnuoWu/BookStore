<<<<<<< HEAD
import {Card, Checkbox, Col, Row, InputNumber, Button} from "antd";
import React from "react";

export class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {number:1}
    };
    handleChange=(value)=>{
        console.log(value);
        this.setState({number: value});
    };
    render(){
        let {info} = this.props;
        if(info == null){
            return null;
        }
        return(
            <div className="site-card-border-less-wrapper">
                <Card style={{ margin: "0 5%" }}>
                    <Row>
                        <Col span={1}>
                            <Checkbox onChange=''/>
                        </Col>
                        <Col span={4}>
                            <img src={info.img} alt="book" height="120"/>
                        </Col>
                        <Col span={8}>
                            <span>{info.description}</span>
                        </Col>
                        <Col span={2}>
                            <span>￥{info.price}</span>
                        </Col>
                        <Col span={3}>
                            <InputNumber min={1} defaultValue={this.state.number} onChange={this.handleChange} />
                        </Col>
                        <Col span={3}>
                            <span>￥{info.price*this.state.number}</span>
                        </Col>
                        <Col span={3}>
                            <Button>删除</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
=======
import React from 'react';
import { deleteItem, updateItem, Item } from '../services/CartService';
import { InputNumber } from 'antd';
import { Grid, Paper, Button, Typography, Checkbox } from '@material-ui/core';

export function CartItem({ props }) {
    const { item, userId, setCartList } = props;
    const book = item.book;

    let deleteFromCart = () => {
        deleteItem(userId, book.id, data => setCartList(data)).catch();
    };

    let addQuantity = value => {
        let newItem = new Item(userId, book.id, value, item.selected);
        updateItem(newItem, data => setCartList(data)).catch();
    };

    let changeSelect = () => {
        let newItem = new Item(userId, book.id, item.quantity, !item.selected);
        updateItem(newItem, data => setCartList(data)).catch();
    };

    return (
        <Paper>
            <Grid
                style={{ padding: '2%' }}
                container
                direction="row"
                justify="space-around"
                alignItems="center">
                <Grid item xs={12} sm={2} container direction="row">
                    <Grid item xs={3}>
                        <Checkbox
                            checked={item.selected}
                            onChange={changeSelect}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                    <Grid item xs>
                        <img src={book.image} alt="book" height="120" />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Typography align="justify" color={'textSecondary'}>
                        {book.description}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography>￥{book.price}</Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <InputNumber
                        min={1}
                        max={book.inventory}
                        value={item.quantity}
                        onChange={addQuantity}
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Typography>
                        {book.inventory > 5 ? '库存充足' : '仅剩' + book.inventory + '本'}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Button variant="outlined" onClick={deleteFromCart}>
                        删除
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
>>>>>>> master
}