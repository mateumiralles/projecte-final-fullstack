export default function handleSlidersExpand(type: string) {
    let contentHeight;
    let id = type === "payment" ? "payment" : "address";

    const expandMethods = document.getElementById(`expand${id}`)!;
        contentHeight = expandMethods.scrollHeight + "px";
        console.log(expandMethods.style.maxHeight != "");
        if (expandMethods.style.maxHeight === contentHeight) {
          expandMethods.style.maxHeight = "0px";
        } else {
          expandMethods.style.maxHeight = contentHeight;
        }
   
  };