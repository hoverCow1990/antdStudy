import React, { Component} from 'react';
import { 
  Router, 
  Route, 
  IndexRoute,
  hashHistory,
  IndexLink,
  IndexRedirect,
  Link, 
} from 'react-router';
import { Row, Col } from 'antd';
import SlideNav from "./slideNav/slideNav.js";
import Column from "./column/column.js";
import Login from "./login/login.js";
import Regist from "./regist/regist.js";
import Staff from "./staff/staff.js";
import '../node_modules/antd/dist/antd.css';
import './App.css';

var hasLogin = false,
    loginData = {
          userName : null,
          num : null,
          job : null,
          src : null,
          lastLogin : null,
    }; 

const Index = React.createClass({
  render() {
    return (
        <div className="adminView">
            {this.props.children}
        </div>
    )
  }
});

//登录页面
const LoginPage = React.createClass({
  getInitialState() {
      return {
        hasLogin : hasLogin,
        loginData : loginData,
      }
  },
  forLogin(data) {
      loginData = data;
      hasLogin = true;
      this.setState({
        hasLogin : hasLogin,
        loginData : data,
      })
  },
  render() {
    return(
      <div className = "loginBox app-Box">
        <Login hasLogin = {this.state.hasLogin} loginData = {this.state.loginData} forLogin = {this.forLogin}/>
      </div>
    )
  } 
});

//注册页面
const RegistPage = React.createClass({
    render() {
        return(
          <div className = "registBox app-Box">
            <Regist />
          </div>
      )
    }
});

//忘记密码
const StaffListPage = React.createClass({
  render (){
    return(
      <div className = "staffBox app-Box">
          <Staff />
      </div>
    )
  }
});

//路由机制
const Main = React.createClass({
    render() {
      return (
        <Router history={hashHistory}>
          <Route path ="/">
            <IndexRedirect to="login"/>                           //跳转至某页面依赖IndexRedirect
            <Route path = "login" component = {LoginPage}/>
            <Route path = "regist" component = {RegistPage}/>
            <Route path = "staffList" component = {StaffListPage}/>
          </Route>
        </Router>
      )
    }
})

//APP主要框架
var App = React.createClass({
  render() {
      return (
        <div className="MyAdmin">
          <Row>
            <Col span={4}>
              <SlideNav/>
            </Col>
            <Col span={12}>
              <Main/>
            </Col>
            <Col span={8}>
              <Column/>
            </Col>
          </Row>
        </div>
    );
  }
});

export default App;
