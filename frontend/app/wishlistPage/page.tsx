"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { ProductSummary } from "../classes";

export default function wishListPage(){
    const [wishlist, setWishlist] = useState<ProductSummary[]>([]);

    const getWishlist = async() => {
        const user = JSON.parse(localStorage.getItem('user')!);
        try{  
            const wishlist = await axios.get(`http://localhost:3333/api/users/${user.id}/wishList`);
            console.log(wishlist);
            if(wishlist.status===200){
                wishlist.data.WishListItem.forEach(async (item: any) => {
                    try{
                        const itemSummary = await axios.get(`http://localhost:3333/api/productSummaries/${item.productSummaryCode}`)
                        if(itemSummary.status===200){
                            const product = itemSummary.data;
                            setWishlist(prevWishlist => [...prevWishlist, product]);
                        }
                    }catch(error){
                        console.log(error);
                    }
                });
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getWishlist();
    }, [])

    return (
        <>
        {wishlist.forEach(item => {
            console.log(item);
        })}
        </>
    )
}