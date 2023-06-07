import { Avatar, Button, Form, Input, Space, Table, Typography, message, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from 'axios';

function Forums() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState(false); // Track deletion status



  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:3001/api/forum/retrieveForums')
      .then(response => {
        setDataSource(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [deletionStatus]); // Add deletionStatus as a dependency



  const handleDelete = (questionId) => {

    axios.delete(`http://localhost:3001/api/forum/deleteForum/${questionId}`)
    .then(response => {
      console.log(response.data);
      setLoading(false);
      message.success("Forum deleted successfully.");
      setDeletionStatus(!deletionStatus); // Update deletionStatus to trigger rerender
      setModalVisible(false)
    })
    .catch(error => {
      console.error(error);
    });


    setDeletionStatus(!deletionStatus); // Update deletionStatus to trigger rerender
    setModalVisible(false)

  };

  const handleViewAnswers = (answers) => {

    // axios.get(`http://localhost:3001/api/comments/retrieveArticleComments/${articleID}`)
    // .then(response => {
    //   setSelectedProduct(response.data);
    //   //setLoading(false);
    //   console.log(response.data)
    //   setModalVisible(true)

    // })
    // .catch(error => {
    //   console.error(error);
    // });

    // setSelectedProduct(product);
    // setModalVisible(true);

      console.log(answers)
      setSelectedProduct(answers)
      setModalVisible(true)



  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  return (

      <Space size={20} direction="vertical">
      <Typography.Title level={4}>Comments on Article</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "User",
            dataIndex: "userID",
          },
          {
            title: "Question",
            dataIndex: "question",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
              <Button
                onClick={() => handleViewAnswers(record.answer)}
                style={{
                  color: "white",
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                }}
              >
                
                View Answers

              </Button>
            ),
          },
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
              <Button
                onClick={() => handleDelete(record.questionID)}
                style={{
                  color: "white",
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                }}
              >
                Delete
              </Button>
            ),
          }
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      />




      
      <Modal
        title={`Comments for ${selectedProduct?.title}`}
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedProduct && (
          <Table
            columns={[
              {
                title: " User ID",
                dataIndex: "userID",
              },
              {
                title: "Answer",
                dataIndex: "description",
              }
            ]}
            dataSource={selectedProduct}
            pagination={false}
          />
        )}
      </Modal>
    </Space>
  );
}

export default Forums;
