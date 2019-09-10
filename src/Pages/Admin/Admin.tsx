import React from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebase, db } from "../../firebase";
import { Table, Icon, Alert } from "antd";
import { useSession } from "../../hooks/useSession";
import * as _ from "lodash";
import { Select } from "antd";

const { Option } = Select;

interface AdminProps {
  someProp?: any;
}

const Admin: React.FC<AdminProps> = props => {
  const user = useSession();

  const [snapshots, loading, error]: any = useObjectVal(
    firebase.db.ref("users")
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (role, el) => {
        return (
          <span>
            {user.uid === el.id ? (
              role
            ) : (
              <Select
                defaultValue={role || "NONE"}
                style={{ width: 120 }}
                onChange={value => {
                  db.doSetRole(el.id, value === "NONE" ? null : value);
                }}
              >
                <Option value="NONE">NONE</Option>
                <Option value="USER">USER</Option>
                <Option value="ADMIN">ADMIN</Option>
              </Select>
            )}
          </span>
        );
      }
    }
  ];

  const data = _.map(snapshots, (row, index) => {
    if (!row) return;
    return {
      key: index,
      id: index,
      email: row.email,
      username: row.username,
      role: row.role
    };
  });

  return (
    <div>
      Admin Functional Component
      {error && <Alert message={error.code} type="error" />}
      <Table
        pagination={false}
        loading={loading}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default Admin;
