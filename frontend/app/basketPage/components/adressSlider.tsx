import handleSlidersExpand from "../handleSlidersExpandFunction";

type AdressSliderProps ={
    address: string | undefined,
    createAddress: React.Dispatch<React.SetStateAction<any>>
}

export default function AdressSlider({address, createAddress}:AdressSliderProps){
    return <div className="mt-4 overflow-hidden rounded border border-black pl-5 pr-5">
    <div
      className="flex flex-row justify-between pb-5 pt-5 hover:cursor-pointer"
      onClick={() => {
        handleSlidersExpand(1);
      }}
    >
      <h1 className="text-lg font-bold">Address</h1>
      <p>\/</p>
    </div>
    <div
      id="expandAddress"
      className="transition-max-height duration-300 ease-in-out "
    >
      <div className="flex flex-row justify-between">
        <p>
          {address === undefined
            ? "No address is defined yet"
            : address}
        </p>
        <p onClick={() => createAddress(true)}>
          {address === undefined
            ? "Add new address"
            : "Change address"}
        </p>
      </div>
      <div className="h-7"></div>
    </div>
  </div>
}