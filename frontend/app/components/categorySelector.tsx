import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

export default function CategorySelector() {
  const categories = [
    {
      title: "Woman",
      src: "https://lp2.hm.com/hmgoepprod?set=source[/d5/47/d547a64300c7941bf8d8ac521478046532c01d56.jpg],origin[dam],category[],type[LOOKBOOK],res[y],hmver[1]&call=url[file:/product/main]",
      href: "ladies",
    },
    {
      title: "Man",
      src: "https://lp2.hm.com/hmgoepprod?set=source[/0c/51/0c5135cdc6097db5e658bdb40e245b246a872ef1.jpg],origin[dam],category[],type[LOOKBOOK],res[y],hmver[2]&call=url[file:/product/main]",
      href: "men",
    },
    {
      title: "Kids",
      src: "https://lp2.hm.com/hmgoepprod?set=source[/9d/88/9d88daa168d904cc860373b86ef181d24480b29d.jpg],origin[dam],category[],type[LOOKBOOK],res[y],hmver[1]&call=url[file:/product/main]",
      href: "kids",
    },
    {
      title: "Outlet",
      src: "https://lp2.hm.com/hmgoepprod?set=source[/94/fe/94fef1eac71e8d7f26da30199d0f8499570ff135.jpg],origin[dam],category[],type[LOOKBOOK],res[y],hmver[1]&call=url[file:/product/main]",
      href: "outlet",
    },
  ];

  const phrase =
    "Indulge in a world of endless style possibilities, from timeless classics to the latest trends, our diverse categories await your discovery!";

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
    <div className="relative mt-[50vh]">
      <div className="display flex h-[700px] w-full justify-between">
        <div ref={ImageContainer} className="relative z-10 ml-52">
          <Image
            className="rounded border border-black object-cover"
            src={`${categories[selectedCategory].src}`}
            alt={`${categories[selectedCategory].title} Category`}
            height={700}
            width={400}
          />
        </div>
        <div className="flex h-full w-2/5">
          <p className="mr-16 pt-32 text-2xl">{phrase}</p>
        </div>
      </div>
      <div className=" ml-52 mr-16 flex flex-col">
        {categories.map((category, i) => {
          return (
            <Link href={`/productsList?category=${category.href}`}>
              <div
                onMouseOver={() => setSelectedCategory(i)}
                key={i}
                className="group flex cursor-pointer justify-end border-b border-black pt-10 text-3xl first-of-type:pt-3"
              >
                <p className="transition duration-300 group-hover:-translate-x-10">
                  {category.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
