export default function handleSlidersExpand(type: number) {
    let contentHeight;
    switch (type) {
      case 0:
        const expandMethods = document.getElementById("expandMethods")!;
        contentHeight = expandMethods.scrollHeight + "px";
        console.log(expandMethods.style.maxHeight != "");
        if (expandMethods.style.maxHeight === contentHeight) {
          expandMethods.style.maxHeight = "0px";
        } else {
          expandMethods.style.maxHeight = contentHeight;
        }
        break;
      case 1:
        const expandAddress = document.getElementById("expandAddress")!;
        contentHeight = expandAddress.scrollHeight + "px";
        console.log(expandAddress.style.maxHeight != "");
        if (expandAddress.style.maxHeight === contentHeight) {
          expandAddress.style.maxHeight = "0px";
        } else {
          expandAddress.style.maxHeight = contentHeight;
        }
        break;
    }
  };