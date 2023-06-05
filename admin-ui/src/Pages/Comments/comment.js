import { Avatar, Button, Rate, Space, Table, Typography, message, Modal } from "antd";
import { useEffect, useState } from "react";

function Comments() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulating API call to fetch data
    setTimeout(() => {
      const dummyData = [
        {
          id: 1,
          thumbnail: "image1.jpg",
          title: "Article 1",
          price: 10,
          rating: 4,
          stock: 5,
          brand: "Brand 1",
          category: "Category 1",
          Body: "this is the article 1",
          comments: [
            {
              id: 1,
              author: "User 1",
              content: "Comment 1",
            },
            {
              id: 2,
              author: "User 2",
              content: "Comment 2",
            },
          ],
        },
        {
          id: 2,
          thumbnail: "image2.jpg",
          title: "Article 2",
          price: 20,
          rating: 3,
          stock: 10,
          brand: "Brand 2",
          Body: "this is the article 2",
          category: "Category 2",
          comments: [
            {
              id: 3,
              author: "User 3",
              content: "Comment 3",
            },
            {
              id: 4,
              author: "User 4",
              content: "Comment 4",
            },
          ],
        },
        {
          id: 3,
          thumbnail: "image1.jpg",
          title: "Article 3",
          price: 10,
          rating: 4,
          stock: 5,
          brand: "Brand 1",
          category: "Category 1",
          Body: "this is the article 3",
          comments: [
            {
              id: 1,
              author: "User 5",
              content: "Comment 5",
            },
            {
              id: 2,
              author: "User 6",
              content: "Comment 6",
            },
          ],
        },
        {
          id: 1,
          thumbnail: "image1.jpg",
          title: "Article 4",
          price: 10,
          rating: 4,
          stock: 5,
          brand: "Brand 1",
          category: "Category 1",
          Body: "this is the article 4",
          comments: [
            {
              id: 1,
              author: "User 7",
              content: "Comment 7",
            },
            {
              id: 2,
              author: "User 8",
              content: "Comment 8",
            },
          ],
        },
      ];
      setDataSource(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (commentId) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((product) => {
        if (product.id === selectedProduct.id) {
          return {
            ...product,
            comments: product.comments.filter(
              (comment) => comment.id !== commentId
            ),
          };
        }
        return product;
      })
    );
    message.success("Comment deleted successfully.");
  };

  const handleViewComments = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
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
          // {
          //   title: "Thumbnail",
          //   dataIndex: "thumbnail",
          //   render: (link) => {
          //     return <Avatar src={link} />;
          //   },
          // },
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          // {
          //   title: "Price",
          //   dataIndex: "price",
          //   render: (value) => <span>${value}</span>,
          // },
          // {
          //   title: "Rating",
          //   dataIndex: "rating",
          //   render: (rating) => {
          //     return <Rate value={rating} allowHalf disabled />;
          //   },
          // },
          // {
          //   title: "Stock",
          //   dataIndex: "stock",
          // },
          {
            title: "Author",
            dataIndex: "brand",
          },

          {
            title: "Body",
            dataIndex: "Body",
          },
          // {
          //   title: "Category",
          //   dataIndex: "category",
          // },
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
              <Button onClick={() => handleViewComments(record)}>
                View Comments
              </Button>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
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
                dataIndex: "author",
              },
              {
                title: "Comment",
                dataIndex: "content",
              },
              {
                title: "Actions",
                dataIndex: "actions",
                render: (_, record) => (
                  <Button
                    type="link"
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </Button>
                ),
              },
            ]}
            dataSource={selectedProduct.comments}
            pagination={false}
          />
        )}
      </Modal>
    </Space>
  );
}

export default Comments;
