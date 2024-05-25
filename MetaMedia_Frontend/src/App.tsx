import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import AdminRouter from "./Routes/AdminRouter";
import UserRouter from "./Routes/UserRouter";
import MetaRouter from './Routes/MetaRouter'
function App() {
  
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/admin/*" element={ <AdminRouter /> } />
          <Route path="/meta/*" element={ <MetaRouter /> } />
          <Route path="/*" element={<UserRouter />} />
        </Routes>
      </Router>
    </>
  );
}  

export default App;
