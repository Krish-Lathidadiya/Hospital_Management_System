import React from "react";

function Biography({ imageUrl }) {
  return (
    <section>

      <div className="flex md:flex-row flex-col mx-10 rounded-lg bg-slate-600 text-white ">

          <div className="p-6">
         
          <img src={imageUrl} alt="Biography image.." className="rounded-xl relative h-[350px] w-full md:h-[auto]"/>
          </div>
 
        <div>
          <div className="my-5 mx-10 space-y-5">
          <h2 className="sm:text-xl font-semibold">Biography</h2>
          <h1 className="sm:text-4xl  font-bold ">Who We Are</h1>
          <div  className="text-md sm:text-lg">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum soluta
            itaque id ea accusantium labore sint natus officiis eligendi, quo
            error numquam minus iste iure modi hic debitis est eos!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo, iure.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            ducimus maiores nisi dolor quaerat odit quibusdam. Esse maxime velit
            commodi sit maiore.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione,
            ad?
          </p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Biography;