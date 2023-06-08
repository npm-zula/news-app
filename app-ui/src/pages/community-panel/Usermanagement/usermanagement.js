import { Button, Space, Table, Typography, message} from "antd";
import { useEffect, useState } from "react";
import axios from 'axios'

function UserManagement() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   // Simulating fetching data from the server
  //   setTimeout(() => {
  //     const dummyUsers = [
  //       {
  //         id: 1,
  //         name: "John Doe",
  //         email: "john.doe@example.com",
  //       },
  //       {
  //         id: 2,
  //         name: "Jane Smith",
  //         email: "jane.smith@example.com",
  //       },
  //       {
  //           id: 3,
  //           name: "shah g",
  //           email: "shah.g@example.com",
  //         },
  //     ];
  //     setUsers(dummyUsers);
  //     setLoading(false);
  //   }, 1000);
  // }, []);




  const [deletionStatus, setDeletionStatus] = useState(false); // Track deletion status



  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:5000/api/Admin/retrieveRoles')
      .then(response => {
        setUsers(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [deletionStatus]); // Add deletionStatus as a dependency


  const handleDeleteUser = (userId) => {
    setLoading(true);

    console.log("userID",userId)

    axios.delete(`http://localhost:5000/api/Admin/users/${userId}`)
    .then(response => {
      console.log(response.data);
      setLoading(false);
      message.success("User deleted successfully.");
      setDeletionStatus(!deletionStatus); // Update deletionStatus to trigger rerender
      //setModalVisible(false)
    })
    .catch(error => {
      console.error(error);
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "User Name",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (userId) => (
        <Button
          type="danger"
          onClick={() => handleDeleteUser(userId)}
          style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>User Management</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        dataSource={users}
        pagination={false}
      />
    </Space>
  );
}

export default UserManagement;
