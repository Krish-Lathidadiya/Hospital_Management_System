import React, { useState } from "react";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function MessageForm() {
  const initialInputState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [input, setInput] = useState(initialInputState);

  const setData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(input);
    try {
      const response = await fetch("http://localhost:5000/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        toast.success("Message sent successfully!");
        setInput(initialInputState);
      } else {
        toast.error(
          responseData.extraDetails
            ? responseData.extraDetails
            : responseData.message
        );
      }
    } catch (error) {
      console.log("Message sent error:", error);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-center text-3xl font-bold font-serif">
          Send Us a Message
        </h1>
        <div className="w-1/3 h-2 border-b-2 border-gray-900 rounded-md mx-auto my-3"></div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-xl font-serif">
                FirstName:
              </label>
              <input
                className="p-3 rounded-md border border-black"
                placeholder="Enter the First Name"
                type="text"
                id="firstName"
                name="firstName"
                value={input.firstName}
                onChange={setData}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-xl font-serif">
                LastName:
              </label>
              <input
                className="p-3 rounded-md border border-black"
                placeholder="Enter the Last Name"
                type="text"
                id="lastName"
                name="lastName"
                value={input.lastName}
                onChange={setData}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-xl font-serif">
                Email:
              </label>
              <input
                className="p-3 rounded-md border border-black"
                placeholder="Enter The email address"
                type="text"
                id="email"
                name="email"
                value={input.email}
                onChange={setData}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-xl font-serif">
                Phone:
              </label>
              <input
                className="p-3 rounded-md border border-black"
                placeholder="Enter The Phone"
                type="text"
                id="phone"
                name="phone"
                value={input.phone}
                onChange={setData}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="text-xl font-serif">
              Message:
            </label>
            <textarea
              className="border border-black p-3"
              placeholder="Please Enter Some Message..."
              name="message"
              id="message"
              rows="7"
              value={input.message}
              onChange={setData}
            ></textarea>
          </div>

          <div className="flex justify-center mt-5">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MessageForm;
