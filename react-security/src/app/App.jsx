import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route ,createBrowserRouter, redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getCurrentUser, getMenu, removeCurrentUser } from "../util/APIUtils";
import { userContext } from "../util/userContext";
import Main , {routeList}from "../components/layout/Main";
import LoadingIndicator from "../components/common/LoadingIndicator";
import AppHeader from "../components/common/AppHeader";
import Login from "../pages/user/login/Login";
import Home from "../pages/home/Home";
import NotFound from "../pages/notfound/NotFound";
import Signup from "../pages/user/signup/Signup";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import SidebarMenu from "../routes/SidebarMenu";
import "../style/components.css"

function App(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    loadCurrentlyLoggedInUser();
   /* if (currentUser) {
      console.log("userfound");
      setAuthenticated(true);
    }*/
    return () => {
      console.log("cleanup");
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log("toggle show sidebar");
  };

  const loadCurrentlyLoggedInUser =  async () => {
    setLoading(true);
    /*getCurrentUser()
      .then((response) => {
        
        setCurrentUser(response);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        removeCurrentUser();
        setLoading(false);
      });*/
      //setTimeout(()=>{setLoading(false)}, 500);

    try {
      let response = await getCurrentUser();
      setCurrentUser(response);
      setAuthenticated(true);
      setLoading(false);
    } catch (error){
      removeCurrentUser();
      setLoading(false);
    }
  };

  const handleLogout = (params) => {
    //localStorage.removeItem(ACCESS_TOKEN);
    removeCurrentUser();
    setAuthenticated(false);
    setCurrentUser(null);
    setShowSidebar(false);


    //Alert.success("You're safely logged out!");
    //toast("You're safely logged out!");
    //window.history.pushState({}, undefined, "/");
    window.location.href="http://localhost:3000/";
  };
  const internalRouter = createBrowserRouter([
    { // insert my root at this position
      path: "/",
      element: <InternalRoot currentUser={currentUser} showSidebar={showSidebar} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />,
      errorElement: <NotFound />,
      children: [
        {
          errorElement: <NotFound />,
          children: [
            
            ...routeList
          ],
        },
      ],
    },
  ]);


  const externalRouter = createBrowserRouter([
    {
      path: "/",
      element: <ExternalRoot  handleLogout={handleLogout} />,
      errorElement: <NotFound />,
      children: [
        {
          errorElement: <NotFound />,
          children: [
            {index:true, Component: Home},
            {path:"login", element: <Login {...props} handleLoginSuccess={loadCurrentlyLoggedInUser} />},
            {path:"signup", element : <Signup authenticated={authenticated} {...props} />},
          ],
        },
      ],
    },
  ]);

  if (loading) {
    return <LoadingIndicator />;
  } else {
    if (authenticated) {
      
      return (
          <RouterProvider router={internalRouter}/>
      );
    } else {
      return (
        <RouterProvider router={externalRouter} />
      );
    }
  }
}



function InternalRoot({currentUser, showSidebar , toggleSidebar, handleLogout}){
  const ctxValue = {
    user: currentUser,
    doLogout: handleLogout,
    sidebarData: getMenu(currentUser),
  };

  return (
    <div className="wrapper">
        
        <userContext.Provider value={ctxValue}>
        <div className='container-fluid col-12 d-flex justify-content-start'>
        <SidebarMenu showSidebar={showSidebar} toggleSidebar={toggleSidebar} onLogout={handleLogout}/>
            <Outlet/>
        </div>
        </userContext.Provider>

        <ToastContainer autoClose={3000} pauseOnHover />

    </div>
  );
}

function ExternalRoot({handleLogout }){

  return (
    <div className="app">
      <div className="app-top-box">
        <AppHeader onLogout={handleLogout} />
      </div>
      <div className="app-body">        
        <Outlet/>
      </div>
      <ToastContainer autoClose={3000} pauseOnHover />
    </div>
  );
}
export default App;
