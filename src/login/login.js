import React, {Component} from 'react';
import { Form,Icon,Input,Button, Checkbox,Row,Col,message} from 'antd';
import '../../node_modules/antd/dist/antd.css';
import './login.css';

const FormItem = Form.Item;

const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.form.validateFields)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var val = values;
          val.src = "http://img.dongqiudi.com/uploads/avatar/2014/10/20/8MCTb0WBFG_thumb_1413805282863.jpg";
          val.num = "052124566";
          val.job = "IT大佬";
          val.lastLogin = "2016.12.28";
          this.props.forLog(val);
          message.success('登录成功',2);
      }
    });
  },
  checkName(rule, value, callback){
    if(/[\u4e00-\u9fa5]{2,}$/.test(value)){
      callback();                           //成功必定要回调一个空
      return;
    }
    callback('请输入正确的名字!')
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <Form onSubmit={this.handleSubmit} className="login-form" action="">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ validator: this.checkName }
              ],
              validateTrigger : 'onBlur',
            })(
              <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </FormItem>
        </Form>
    );
  },
}));

const Welcome = React.createClass({
    render() {
      var info = this.props.info;
      return (
        <div className = "loginSucess">
          <Row >
            <Col span={8}>
              <img src={info.src}/>
            </Col>
            <Col span={14} offset={2}>
              <h2>欢迎您登录成功</h2>
              <ul>
                <li>登录员工:<span>{info.userName}</span></li>
                <li>员工编号:<span>{info.num}</span></li>
                <li>职位:<span>{info.job}</span></li>
                <li>上次登录时间:<span>{info.lastLogin}</span></li>
              </ul>
            </Col>
          </Row>
        </div>
      )
    }
});

const Login = React.createClass({
  render() {
      let props = this.props,
          dom = props.hasLogin?<Welcome info = {props.loginData}/>:<NormalLoginForm forLog = {props.forLogin}/>;
      return (
        <div className="myLogin viewWrapper">
          <div className = "login">
            <div className = "loginWrapper">
              {dom}
            </div>
          </div>
        </div>
    );
  }
});

export default Login;
