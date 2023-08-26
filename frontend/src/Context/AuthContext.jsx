import { createContext, useState, useEffect } from "react"
import jwtDecode from "jwt-decode"
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext();
export default AuthContext;

const AuthProvider = ({ children }) =>{
     const [authTokens,setAuthTokens] = useState(()=>{
          localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authToken")) : null // JSON String Javascript Object
     });

     const [user, setUser] = useState(()=>{
          localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null
     });
     const [loading, setLoading] = useState(true);

     const navigate = useNavigate();

     const loginUser = async (email, password) => {
          const response = await fetch("http://127.0.0.1:8000/api/token/",{
               method : 'POST',
               headers : {
                    'Content-Type' : 'application/json'
               },
               body : JSON.stringify({
                    email,password
               })
          })
          const data = await response.json()  // convert a JavaScript value to a JSON string
          console.log(data);

          if (response.status === 200){
               console.log("Logged In");
               setAuthTokens(data)
               setUser(jwtDecode(data.access))
               localStorage.setItem("authTokens",JSON.stringify(data))
               navigate("/")
          } else {
               console.log(response.status);
               console.log("There was an server issue");
               alert("Something Went Wrong" + response.status)
          }
     }
     const registerUser = async (email, username, password, password2) => {
          const response = await fetch("http://127.0.0.1:8000/api/register/",{
               method : 'POST',
               headers : {
                    'Content-Type' : 'application/json'
               },
               body : JSON.stringify({
                    email, username, password, password2
               })
          })
          const data = await response.json()  // convert a JavaScript value to a JSON string
          console.log(data);

          if (response.status === 201){
               navigate('/login')
          } else {
               console.log(response.status);
               console.log("Issue From Server");
               alert("Something Went Wrong"+response.status)
          }
           
     }
     const logOutUser = () => {
          setAuthTokens(null)
          setUser(null)
          localStorage.removeItem("authTokens")
          navigate('/login')
     }
     const contextData = {
          user,
          setUser,
          setAuthTokens,
          registerUser,
          loginUser,
          logOutUser
     }
     useEffect(()=>{
          if(authTokens) {
               setUser(jwtDecode(authTokens.access))
          }
          setLoading(false)
     },[authTokens,loading])

     return (
               <AuthContext.Provider value={contextData}>
                    {loading ? null : children}
               </AuthContext.Provider>
     )
}