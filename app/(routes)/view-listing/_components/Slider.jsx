import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function Slider({ imageList }) {
  return (
    <div className="mx-auto w-full max-w-[800px]">
      {imageList ? (
        <Carousel>
          <CarouselContent>
            {imageList.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image.url}
                  width={800}
                  height={300}
                  alt={`Image ${index}`}
                  className="rounded-xl object-cover w-full h-[300px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="w-14 h-14 -ml-10" />
          <CarouselNext className="w-14 h-14 -mr-10" />
        </Carousel>
      ) : (
        <div className="w-full h-[300px] bg-slate-200 animate-pulse rounded-lg"></div>
      )}
    </div>
  );
}

export default Slider;
