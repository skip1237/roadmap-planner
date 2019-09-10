import React from "react";
import { firebase } from "../../firebase";
import { Switch, Route, Redirect } from "react-router-dom";
import { Hello, Hello2, Admin } from "../index";
import { Layout, Menu, Breadcrumb, Icon, Empty } from "antd";
import * as _ from "lodash";
import history from "../../history";
import { useObjectVal } from "react-firebase-hooks/database";
import { useSession } from "../../hooks/useSession";

const { Header, Content, Footer } = Layout;

interface HomeProps {
  location: {
    pathname: string;
  };
}

const Home: React.FC<HomeProps> = props => {
  const user = useSession();
  const [userSnapshot, userLoading, userError]: any = useObjectVal(
    firebase.db.ref(`users/${user.uid}`)
  );

  const permissionCheck = (who: "ADMIN" | "USER") => {
    const role = _.get(userSnapshot, "role");

    switch (role) {
      case "ADMIN":
        return true;
      case "USER":
        if (who === "USER") {
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  let nav: Array<{
    icon: string;
    path: string;
    name: string;
    component: any;
    exact?: boolean;
  }> = [];

  if (permissionCheck("USER")) {
    nav.push(
      {
        icon: "calculator",
        path: "/hello",
        name: "Hello",
        exact: true,
        component: Hello
      },
      {
        icon: "database",
        path: "/hello2",
        name: "Hello2",
        exact: true,
        component: Hello2
      }
    );
  }

  if (permissionCheck("ADMIN")) {
    nav.push({
      icon: "message",
      path: "/admin",
      name: "Admin",
      exact: true,
      component: Admin
    });
  }

  const navOnClick = ({ key }) => {
    if (key === "logout") return;
    history.push(nav[key].path);
  };

  const generateNav = () => {
    const menuElements = _.map(nav, (el, index) => {
      return (
        <Menu.Item key={index}>
          <Icon type={el.icon} />
          <span>{el.name}</span>
        </Menu.Item>
      );
    });

    const currentEl = _.findIndex(nav, ["path", props.location.pathname]);

    return (
      <Menu
        onClick={navOnClick}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[currentEl.toString()]}
      >
        {menuElements}
        <Menu.Item style={{ float: "right" }} key="logout">
          <Icon type="logout" />
          <span
            onClick={() => {
              firebase.auth.signOut().then(
                function() {
                  // Sign-out successful.
                },
                function(error) {
                  // An error happened.
                }
              );
            }}
          >
            LogOut
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  const loading = !user || userLoading;

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout">
      <Header style={{ height: "auto" }}>
        <div className="logo" />
        {generateNav()}
      </Header>
      <Content style={{ padding: "50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          {loading ? (
            <Empty description={<span>Loading</span>} />
          ) : (
            <Switch>
              {nav.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    render={props => <route.component {...props} />}
                  />
                ) : null;
              })}

              <Redirect from="/" to="/hello" />
            </Switch>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Footer ©2018</Footer>
    </Layout>
  );
};

export default Home;
