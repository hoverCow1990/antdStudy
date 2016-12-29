import React from 'react';
import {
	Form, 
	Select, 
	InputNumber, 
	Switch, 
	Radio,
	Slider, 
	Button, 
	Upload, 
	Icon,
	Input, 
	Modal,
	message,
	Steps
}from 'antd';
import './regist.css';

class ViewPort extends React.Component {
  	state = {};
    beforeUpload(file) {
	    const isJPG = file.type === 'image/jpeg';
	    if (!isJPG) {
	      message.error('请上传图片格式');
	    }
	    const isLt2M = file.size / 1024 / 1024 < 2;
	    if (!isLt2M) {
	      message.error('文件必须小于2MB!');
	    }
	    return isJPG && isLt2M;
    }
    getBase64(img, callback) {
	  const reader = new FileReader();
	  reader.addEventListener('load', () => callback(reader.result));
	  reader.readAsDataURL(img);
    }
    handleChange = (info) => {
	    if (info.file.status === 'done') {
	      // Get this url from response in real world.
	      this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
	    }
    }
	render() {
	    const imageUrl = this.state.imageUrl;
	    return (
	      <Upload
	        className="avatar-uploader"
	        name="avatar"
	        showUploadList={false}
	        action=""
	        beforeUpload={this.beforeUpload}
	        onChange={this.handleChange}
	      >
	        {
	          imageUrl ?
	            <img src={imageUrl} role="presentation" className="avatar" /> :
	            <Icon type="plus" className="avatar-uploader-trigger" />
	        }
	      </Upload>
	    );
	}
}

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Step = Steps.Step;

const Regist = Form.create()(React.createClass({
	getInitialState() {
    	return { 
    		visible: false,
    		step : 0, 
    	};
  	},
	handleSubmit(e) {
	    e.preventDefault();
	    var This = this;
	    this.props.form.validateFields((err, values) => {
	    	if(!values.switch){
	    		return;
	    	} 
	      	if(!err) {
	      		This.showModal(JSON.stringify(values));
	      	}
	    });
  	},
  	showModal() {
	    this.setState({
	      visible: true,
	    });
	},
	handleOk() {
    	this.setState({
	      visible: false,
	    });
    },
    handleCancel(e) {
	    this.setState({
	      visible: false,
	    });
    },
    checkName(rule, value, callback){
	    if(/[\u4e00-\u9fa5]{2,}$/.test(value)){
	      callback();                           //成功必定要回调一个空
	      return;
	    }
	    callback('请输入正确的名字!')
  	},
  	checkPassword(rule, value, callback){
  		console.log(value)
	    if(value.length>4){
	      callback();                          
	      return;
	    }
	    callback('密码至少5位')
  	},

	render(){
		const { getFieldDecorator } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
		return (
			<div className="myRegist viewWrapper">
				<div className="regist">
					<div className="step">
						<Steps current={this.state.step}>
						    <Step title="填写信息" description="填写您的基础信息" />
						    <Step title="手机验证" description="验证您的手机号" />
						    <Step title="完成" description="注册成功" />
						</Steps>
					</div>
					<Form horizontal onSubmit={this.handleSubmit}>
				        <FormItem
				          {...formItemLayout}
				          label="员工姓名"
				        >
				          {getFieldDecorator('userName', {
				              rules: [{required: true,validator: this.checkName,message: '输入正确的姓名'}],
				              validateTrigger : 'onBlur',
				            })(
				           	<Input placeholder="用户名" />	           
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="设置密码"
				        >
				          {getFieldDecorator('tele', {
				            rules: [{ required: true,validator: this.checkPassword,message: '密码至少5位'},],
				            validateTrigger : 'onBlur',
				          })(
				           	<Input placeholder="您的密码" />	           
				          )}
				        </FormItem>
				         <FormItem
				          {...formItemLayout}
				          label="员工职位"
				        >
				          {getFieldDecorator('select-multiple', {
				            rules: [
				              { required: true, message: '请选择您的工种'},
				            ],
				          })(
				            <Select placeholder="您的职位">
				              <Option value="it">IT大佬</Option>
				              <Option value="Person">人事王者</Option>
				              <Option value="finance">财务仙子</Option>
				              <Option value="Purchase">采购大神</Option>
				              <Option value="sale">销售老司机</Option>
				            </Select>
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="年龄"
				        >
				          {getFieldDecorator('input-number', { initialValue: 20 })(
				            <InputNumber min={1} max={70} />
				          )}
				          <span className="ant-form-text"> 岁</span>
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="性别"
				        >
				          {getFieldDecorator('radio-group')(
				            <RadioGroup>
				              <Radio value="male">男</Radio>
				              <Radio value="female">女</Radio>
				            </RadioGroup>
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="职位级别"
				        >
				          {getFieldDecorator('slider',{
				          	rules : [
				          		{ required: true, message: 'Please select your favourite colors!',}
				          	]
				          })(
				            <Slider marks={{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }} />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="项目"
				        >
				          {getFieldDecorator('item')(
				            <RadioGroup>
				              <RadioButton value="a">item 1</RadioButton>
				              <RadioButton value="b">item 2</RadioButton>
				              <RadioButton value="c">item 3</RadioButton>
				            </RadioGroup>
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="头像照片"
				        >
				          	<ViewPort />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="接受"
				        >
				          {getFieldDecorator('switch', { 
				          	valuePropName: 'checked'})(
				            <Switch />
				          )}
				        </FormItem>
				        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
				          <Button type="primary" htmlType="submit">Submit</Button>
				        </FormItem>
				      </Form>
				      <Modal title="Basic Modal" visible={this.state.visible}
				          onOk={this.handleOk} onCancel={this.handleCancel}
				        >
				        	<p>恭喜你注册成功</p>
				        </Modal>
				</div>
			</div>
		)
	}
}));

export default Regist;