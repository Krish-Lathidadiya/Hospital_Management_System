import React from "react";
import { useAuth } from "../store/auth";

function AboutUs() {
  const { name } = useAuth();

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Page</h1>
        <p className="text-lg text-gray-700 mb-8">
          Hi, Welcome {name ? name : "to our website"}
        </p>
      </div>
    </section>
  );
}

export default AboutUs;
