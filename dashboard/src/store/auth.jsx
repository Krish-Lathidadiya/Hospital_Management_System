import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminName, setAdminName] = useState();
  const [doctorCount, setDoctorCount] = useState();
  const [appointmentCount, setAppointmentCount] = useState();

  const countDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/countDoctors", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const resData = await response.json();
      console.log(resData.totalDoctors);
      setDoctorCount(resData.totalDoctors)
    } catch (error) {
      console.error("Error fetching doctor count:", error);
    }
  };

  const countAppointment=async()=>{
    try {
        const response = await fetch("http://localhost:5000/countAppointment", {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const resData = await response.json();
        console.log(resData.totalAppointment);
        setAppointmentCount(resData.totalAppointment)
      } catch (error) {
        console.error("Error fetching appointment count:", error);
      }

  }

  useEffect(() => {
    countAppointment();
    countDoctors();
  }, []);

  const [token, setToken] = useState(localStorage.getItem("adminToken"));

  //logout ni upper rakhavu
  const storeTokenInLS = (serverToken) => {
    //refresh logout
    setToken(serverToken);
    return localStorage.setItem("adminToken", serverToken);
  };

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("adminToken");
  };

  let isLoggedIn = !!token;
  console.log("isLoggedIn", isLoggedIn);

  return (
    //value = function pass
    <AuthContext.Provider
      value={{
        doctorCount,
        appointmentCount,
        adminName,
        setAdminName,
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  // return useContext(AuthContext)

  const useContextValue = useContext(AuthContext);
  if (!useContextValue) {
    throw new Error("userAuth used outside the provider");
  }

  return useContextValue;
};

// const {storeTokenInLS}=useAuth();
// storeTokenInLS("token",res_data.token)
