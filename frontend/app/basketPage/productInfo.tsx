"use client"
import { useState } from "react";
import { ProductGeneral } from "../classes";

export default function ProductInfo(props: {product: ProductGeneral, index: number, products: ProductGeneral[], setProducts: React.Dispatch<React.SetStateAction<any>>}){
    const [isAnimating, setIsAnimating] = useState(false);
    const product = document.getElementById("product")!;
    const deleteProductAnim = {
        transform: isAnimating ? `translateX(${-(product.clientWidth+100)}px)` : 'translateX(0)',
        transition: 'all 0.3s ease-in-out',
      };
    
    const deleteProduct = () => {
        setIsAnimating(true);
        const nuevoArray = props.products.filter((_, index3) => index3 !== props.index); 
        setTimeout(() => {
            props.setProducts((productos: ProductGeneral[]) => {
                return nuevoArray;
            });  
            setIsAnimating(false);
        }, 500);
    }

    const addOrSubtract = (subtract: boolean) => {
        if(!subtract){
            props.setProducts((productos: ProductGeneral[]) => {
                const updatedProductos = [...productos];

                updatedProductos[props.index].ammount++;
              
                return updatedProductos;
            });
        }
        else {
            if(props.products[props.index].ammount!==1){
                props.setProducts((productos: ProductGeneral[]) => {
                    const updatedProductos = [...productos];

                    updatedProductos[props.index].ammount--;
                
                    return updatedProductos;
                });
            }
        }
    }
    return (
        <div style={deleteProductAnim} key={props.index} id="product" className="product border border-black rounded flex flex-row h-60 mt-2 mb-2 p-4 transition-all">
        {props.product.img==undefined ? <div className="h-full aspect-[5001/7501] bg-white rounded-md mr-4"></div> : <img src={props.product.img} className="h-full mr-4 rounded-md"/>}
        <div className="flex flex-col flex-1 justify-between">
          <div className="flex justify-between items-center">
            <div>
              <p>{props.product.name}</p>
              <p>{props.product.price} {props.product.currency}</p>
            </div>
            <div className="hover: cursor-pointer" onClick={() => deleteProduct()}>
              <p>Borrar</p>
            </div>
          </div>
          <div>
            <p className="inline-block">{props.product.colorName}</p>
            <div style={{backgroundColor: `${props.product.colorRgb}`}} className="w-4 h-4 inline-block"></div>
          </div>
          <div className="self-end flex flex-row">
            <div className="p-3 bg-slate-700 rounded-s hover: cursor-pointer" onClick={() => addOrSubtract(true)}>
              <p>-</p>
            </div>
            <div className="bg-white p-3">
              <p>{props.product.ammount}</p>
            </div>
            <div className="p-3 bg-slate-700 rounded-e hover: cursor-pointer" onClick={() => addOrSubtract(false) }>
              <p>+</p>
            </div>
          </div>
        </div>
      </div>
    )
}