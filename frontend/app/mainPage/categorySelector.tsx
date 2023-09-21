import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CategorySelector() {
  const categories = [
    {
      title: "Woman",
      src: "https://lp2.hm.com/hmgoepprod?set=source[/d5/47/d547a64300c7941bf8d8ac521478046532c01d56.jpg],origin[dam],category[],type[LOOKBOOK],res[y],hmver[1]&call=url[file:/product/main]",
    },
    {
      title: "Man",
      src: "https://lp2.hm.com/hmgoepprod?set=source[/0c/51/0c5135cdc6097db5e658bdb40e245b246a872ef1.jpg],origin[dam],category[],type[LOOKBOOK],res[y],hmver[2]&call=url[file:/product/main]",
    },
    {
      title: "Kids",
      src: "https://lp2.hm.com/hmgoepprod?set=source[/9d/88/9d88daa168d904cc860373b86ef181d24480b29d.jpg],origin[dam],category[],type[LOOKBOOK],res[y],hmver[1]&call=url[file:/product/main]",
    },
    {
      title: "Sales",
      src: "https://lp2.hm.com/hmgoepprod?set=source[/94/fe/94fef1eac71e8d7f26da30199d0f8499570ff135.jpg],origin[dam],category[],type[LOOKBOOK],res[y],hmver[1]&call=url[file:/product/main]",
    },
  ];

  const ImageContainer = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: ImageContainer.current,
      start: "-=200px",
      end: "+=450px",
      pin: true,
    });
  }, []);

  return (
    <div className="relative my-[40vh]">
      <div className="display flex h-[700px] w-full justify-between ">
        <div ref={ImageContainer} className="relative h-full w-2/5 ml-52">
          <Image
            className="object-cover"
            src={`${categories[selectedCategory].src}`}
            alt={`${categories[selectedCategory].title} Category`}
            height={800}
            width={400}
          />
        </div>
        <div className="w-2/5 h-full flex">
          <p className="text-xl pt-32">
            Indulge in a world of endless style possibilities, from timeless
            classics to the latest trends, our diverse categories await your
            discovery!
          </p>
        </div>
      </div>
      <div className=" flex flex-col mr-10 z-10">
        {categories.map((category, i) => {
          return (
            <div
              onMouseOver={() => setSelectedCategory(i)}
              key={i}
              className="border-b mt-6 flex justify-end border-black text-3xl "
            >
              <p>{category.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
