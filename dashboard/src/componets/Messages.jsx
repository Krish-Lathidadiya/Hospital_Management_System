import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Messages() {
  const [allMessages, setAllMessages] = useState([]);

  const {isLoggedIn}=useAuth()

  const getAllMessages = async () => {

    if(isLoggedIn){
      try {
        const response = await fetch('http://localhost:5000/getAllMessages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const resData = await response.json();
        console.log(resData);
  
        if (response.ok) {
          console.log("message recieved successfully");
          setAllMessages(resData.messages);
        }
      } catch (error) {
        console.error(error);
      }
    }else{
      toast.error("Your are not authorized person");
    }
   
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {

          allMessages.map((message, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold mb-2">{message.firstName} {message.lastName}</h2>
            <p className="text-sm text-gray-600 mb-2">{message.email}</p>
            <p className="text-sm text-gray-600 mb-2">{message.phone}</p>
            <p className="text-sm text-gray-800">{message.message}</p>
          </div>
        ))
        
        }
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Messages;
