import { useContext } from "react";
import { Route,Navigate, Routes } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

// const PrivateRouter = ({ path , element }) => {
//      let { user } = useContext(AuthContext);
//      return user ? (
//           <Routes>
//                <Route path={path} element={element} />
//           </Routes>     
//         ) : (
//           <Navigate to="/login"/>
//      );
// };
   
// export default PrivateRouter;