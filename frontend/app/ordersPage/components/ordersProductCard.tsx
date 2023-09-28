import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type ProductCardOrdersProps = {
  orderObject: any;
  j: number;
};

interface ProductInfo {
  img: string;
  name: string;
  price: string;
}

export default function ProductCardOrders({
  orderObject,
  j,
}: ProductCardOrdersProps) {
  const [productData, setProductData] = useState<ProductInfo | undefined>(undefined);


  const getProductInfo = async () => {
    try{
      const product = await axios.get(`http://localhost:3333/api/productSummaries/${orderObject.productSummaryCode}`);
      if(product.status===200){
        setProductData({img: product.data.img, name: product.data.name, price: product.data.price});
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductInfo();
  }, [])

  return (
    <div
      key={j}
      className="flex min-w-[200px] flex-col items-center rounded border border-black bg-white p-5"
    >
      <p className="w-full text-left text-lg font-bold">
        {productData?.name}{" "}
        <span className="text-sm font-normal">x{orderObject.quantity}</span>
      </p>
      <p className="w-full text-left text-xs">{`Cloth code: ${orderObject.productSummaryCode}`}</p>

      <div className="h-80 w-full rounded bg-gray-300">
        {productData!= undefined ?
        <Image 
        alt="Product Image"
        src={productData?.img}
        width={200}
        height={400}
        />
        : null}
      </div>
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center ">
          <div
            style={{ backgroundColor: `${orderObject.colorRgb}` }} // NOSE PER QUE NO VA EL BG-[${...}] D'ABAIX
            className={`mr-1 h-3 w-3  bg-[${orderObject.colorRgb}] rounded border border-black `}
          ></div>

          <p className="text-sm"> | {orderObject.size} </p>
        </div>
        <p className="text-sm">{productData?.price} €</p>
      </div>
    </div>
  );
}
