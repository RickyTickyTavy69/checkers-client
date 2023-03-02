import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"

import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

// material icons
import 'material-icons/iconfont/material-icons.css';

//React Query
import queryClient from "./utilits/ReactQuery";
import {QueryClientProvider} from "react-query";
import Redirect from "./Redirect";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
    <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
                {/*the app will be opened, if there is a unique id, if not the user will be redirected to a page, where the id is created*/}
                    <Route path={"/:id"} element={<App/>}/>
                    <Route path={"/"} element={<Redirect/>}/>
            </Routes>
        </Router>
    </QueryClientProvider>
);
