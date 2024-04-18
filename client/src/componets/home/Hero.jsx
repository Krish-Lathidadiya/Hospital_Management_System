import React from "react";
import MessageForm from "./MessageForm";
function Hero({ title, imagrUrl }) {
  return (
    <>
      <section className="grid gap-2 sm:grid-cols-2 p-4">
        <div>
          <div className="mt-20 mx-10">
          <h2 className="text-2xl sm:2xl md:text-4xl font-sans font-bold my-auto"> {title}</h2>
          <p className="my-3 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ad
            esse recusandae suscipit iusto vitae hic, accusamus fugit deleniti
            quam, at voluptatem? Perferendis dignissimos labore consequatur,
            sapiente consequuntur repudiandae libero. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quo exercitationem, sequi non et,
            culpa, mollitia praesentium dignissimos ex consectetur obcaecati
            vero sed distinctio fuga consequatur delectus nesciunt velit hic
            autem.
          </p>
          <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 "
          >Contact Us</button>
          </div>
        </div>

        <div className="">
          {/* <img
            src="./Vector.png"
            alt="Image 1"
            className="w-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden object-cover z-10"
          />  */}
          <img 
            src={imagrUrl}
            alt="hero image"
            className="h-[300px]  sm:h-[400px] md:h-[500px] mx-auto"
          />
        </div>
      </section>
    </>
  );
}

export default Hero;
