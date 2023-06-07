import { Avatar, Button, Rate, Space, Table, Typography, message, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from 'axios';

function Comments() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState(false); // Track deletion status



  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:3001/api/articles/retrieveArticle')
      .then(response => {
        setDataSource(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [deletionStatus]); // Add deletionStatus as a dependency



  const handleDelete = (commentId) => {

    axios.delete(`http://localhost:3001/api/comments/deleteComment/${commentId}`)
    .then(response => {
      console.log(response.data);
      setLoading(false);
      message.success("Comment deleted successfully.");
      setDeletionStatus(!deletionStatus); // Update deletionStatus to trigger rerender
      setModalVisible(false)
    })
    .catch(error => {
      console.error(error);
    });


    setDeletionStatus(!deletionStatus); // Update deletionStatus to trigger rerender
    setModalVisible(false)

  };

  const handleViewComments = (articleID) => {
    axios.get(`http://localhost:3001/api/comments/retrieveArticleComments/${articleID}`)
    .then(response => {
      setSelectedProduct(response.data);
      //setLoading(false);
      console.log(response.data)
      setModalVisible(true)

    })
    .catch(error => {
      console.error(error);
    });

    // setSelectedProduct(product);
    // setModalVisible(true);
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
            title: "Article ID",
            dataIndex: "articleID",
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Author",
            dataIndex: "author",
          },
          {
            title: "Body",
            dataIndex: "body",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
              <Button
                onClick={() => handleViewComments(record.articleID)}
                style={{
                  color: "white",
                  backgroundColor: "#1890ff",
                  borderColor: "#1890ff",
                }}
              >
                View Comments
              </Button>
            ),
          },
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
                title: "Author",
                dataIndex: "userName",
              },
              {
                title: "Comment ID",
                dataIndex: "commentID",
              },
              {
                title: "Article",
                dataIndex: "articleID",
              },
              {
                title: "Comment",
                dataIndex: "body",
              },
              {
                title: "Actions",
                dataIndex: "actions",
                render: (_, record) => (
                  <Button
                    type="link"
                    onClick={() => handleDelete(record.commentID)}
                  >
                    Delete
                  </Button>
                ),
              },
            ]}
            dataSource={selectedProduct}
            pagination={false}
          />
        )}
      </Modal>
    </Space>
  );
}

export default Comments;
