import React from "react";
import { Form, Icon, Input, Button, Row, Typography, Alert } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { Link, Redirect } from "react-router-dom";
import { firebase } from "../../firebase";
import { userContext } from "../../hooks/useSession";

const { Title } = Typography;
interface LoginProps {
  form: WrappedFormUtils;
}

class Login extends React.Component<LoginProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null
    };
  }

  handleLoading = loading => {
    this.setState({ loading });
  };
  handleError = error => {
    this.setState({ error });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { handleLoading, handleError } = this;
      if (!err) {
        handleLoading(true);
        const { email, password } = values;
        firebase.auth
          .signInWithEmailAndPassword(email, password)
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log({ errorCode, errorMessage });
            handleError(errorMessage);
            handleLoading(false);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <userContext.Consumer>
        {user => {
          if (user.user) {
            return <Redirect to="/" />;
          }
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
                  width: "420px"
                }}
              >
                <Title>LogIn</Title>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item>
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your email!"
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="email"
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Password!"
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </Form.Item>
                  {this.state.error && (
                    <Alert message={this.state.error} type="error" />
                  )}
                  <Form.Item>
                    <div style={{ textAlign: "center" }}>
                      <Link className="login-form-forgot" to="register">
                        {" "}
                        Forgot password
                      </Link>
                    </div>
                    <div>
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        disabled={this.state.loading}
                      >
                        Log in
                      </Button>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      Or <Link to="register">register now!</Link>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </Row>
          );
        }}
      </userContext.Consumer>
    );
  }
}
const WrappedLogin = Form.create({ name: "normal_login" })(Login);

export default WrappedLogin;
