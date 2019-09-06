import React from "react";
import { Form, Icon, Input, Button, Row, Col, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;
interface LoginProps {
  logIn: Function;
  form?: any;
}

class Login extends React.Component<LoginProps, any> {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          alignItems: "center",
          height: "100vh",
          background: "#e4e5e6",
          justifyContent: "center"
        }}
      >
        <Col
          span={9}
          style={{
            boxShadow: "0 0px 2px #a6a6a6",
            padding: "20px 40px 10px",
            borderRadius: "10px",
            background: "white"
          }}
        >
          <Title>LogIn</Title>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Link className="login-form-forgot" to="register">
                {" "}
                Forgot password
              </Link>
              <div>
                {" "}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </div>
              <div>
                Or <Link to="register">register now!</Link>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}
const WrappedLogin = Form.create({ name: "normal_login" })(Login);

export default WrappedLogin;
