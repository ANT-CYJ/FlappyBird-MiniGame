/*
 * @Author: Carlos
 * @Date: 2021-03-18 15:38:00
 * @LastEditors: Carlos
 * @LastEditTime: 2021-03-22 13:36:29
 * @Description: file content
 */
import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/Login";
import HomePage from "./Pages/Home";

const app: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path='/' exact component={HomePage}></Route>
          <Route path='/login' exact component={LoginPage}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default app;
