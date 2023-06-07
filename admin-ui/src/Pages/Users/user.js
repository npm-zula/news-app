import { Avatar, Button, Form, Input, Space, Table, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";
import axios from 'axios';


function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [deletionStatus, setDeletionStatus] = useState(false); // Track deletion status



  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:3001/api/Admin/retrieveRoles')
      .then(response => {
        setDataSource(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [deletionStatus]); // Add deletionStatus as a dependency



  const handleAddUser = () => {
    form.validateFields().then((values) => {
      setLoading(true);

      // Simulating adding a new user
      const newUser = {
        id: Date.now(), // Generate a unique ID (you may use a UUID library for this)
        ...values,
      };

      // Updating the data source with the new user
      const updatedDataSource = [...dataSource, newUser];
      setDataSource(updatedDataSource);

      setLoading(false);
      form.resetFields();
    });
  };

  const handleDeleteUser = (userId) => {
    setLoading(true);


    axios.delete(`http://localhost:3001/api/Admin/users/${userId}`)
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


    // // Filter out the user with the matching ID
    // const updatedDataSource = dataSource.filter((user) => user.id !== userId);
    // setDataSource(updatedDataSource);

    setLoading(false);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4} style={{ color: "#1890ff" }}>
        Users
      </Typography.Title>
      <Form form={form} layout="inline">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please enter age" }]}
        >
          <Input placeholder="Age" type="number" min={0} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleAddUser}
            style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
          >
            Add User
          </Button>
        </Form.Item>
      </Form>
      {/* <Table
        loading={loading}
        columns={[
          {
            title: "User Name",
            dataIndex: "firstName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "Age",
            dataIndex: "age",
          },
          {
            title: "Actions",
            dataIndex: "id",
            render: (userId) => {
              return (
                <Button
                  type="danger"
                  onClick={() => handleDeleteUser(userId)}
                  style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
                >
                  Delete
                </Button>
              );
            },
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        bordered

        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      /> */}


<Table
  loading={loading}
  columns={[
    {
      title: "Name",
      dataIndex: "name", // Updated dataIndex to "name"
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
      title: "Role", // You need to define the "phone" field in the schema to use it here
      dataIndex: "role", // Update dataIndex to the correct field from the schema
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Actions",
      dataIndex: "_id", // Updated dataIndex to "_id" (assuming it represents the user's ID)
      render: (userId) => {
        return (
          <Button
            type="danger"
            onClick={() => handleDeleteUser(userId)}
            style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
          >
            Delete
          </Button>
        );
      },
    },
  ]}
  dataSource={dataSource}
  pagination={{
    pageSize: 5,
  }}
  bordered
  style={{
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  }}
/>
   

    </Space>
  );
}

export default Users;
