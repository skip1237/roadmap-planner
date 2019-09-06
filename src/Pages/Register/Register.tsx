import React from "react";
import { Form, Icon, Input, Button, Row, Col, Typography } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";

const { Title } = Typography;
interface RegisterProps {
  register: Function;
  form: WrappedFormUtils;
}

class Register extends React.Component<RegisterProps, any> {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const { username, email, password } = values;
        auth
          .doCreateUserWithEmailAndPassword(email, password)
          .then(authUser => {
            console.log(authUser);
            if (!authUser || !authUser.user) return;
            // Create a user in your own accessible Firebase Database too
            db.doCreateUser(authUser.user.uid, username, email)
              .then(() => {
                console.log("done");
                this.props.form.resetFields();
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          alignItems: "center",
          height: "100vh",
          background: "#e4e5e6",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            boxShadow: "0 0px 2px #a6a6a6",
            padding: "20px 40px 10px",
            borderRadius: "10px",
            background: "white",
            minWidth: "420px"
          }}
        >
          <Title level={3}>Register</Title>
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
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  { required: true, message: "Please input your email!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
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
              <div>
                {" "}
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Create account
                </Button>
              </div>
              <div style={{ textAlign: "center" }}>
                Or <Link to="login">LogIn now!</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Row>
    );
  }
}
const WrappedRegister = Form.create({ name: "normal_register" })(Register);

export default WrappedRegister;
