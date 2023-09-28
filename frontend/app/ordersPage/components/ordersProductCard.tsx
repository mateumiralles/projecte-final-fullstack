type ProductCardOrdersProps = {
  orderObject: any;
  j: number;
};

export default function ProductCardOrders({
  orderObject,
  j,
}: ProductCardOrdersProps) {
  return (
    <div
      key={j}
      className="flex min-w-[200px] flex-col items-center rounded border border-black bg-white p-5"
    >
      <p className="w-full text-left text-lg font-bold">
        {`Nom prenda`}{" "}
        <span className="text-sm font-normal">x{orderObject.quantity}</span>
      </p>
      <p className="w-full text-left text-xs">{`Cloth code: ${orderObject.productSummaryCode})`}</p>

      <div className="h-80 w-full rounded bg-gray-300">
        Aqui va la foto del producte
      </div>
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center ">
          <div
            style={{ backgroundColor: `${orderObject.colorRgb}` }} // NOSE PER QUE NO VA EL BG-[${...}] D'ABAIX
            className={`mr-1 h-3 w-3  bg-[${orderObject.colorRgb}] rounded border border-black `}
          ></div>

          <p className="text-sm"> | {orderObject.size} </p>
        </div>
        <p className="text-sm">Preu €</p>
      </div>
    </div>
  );
}
