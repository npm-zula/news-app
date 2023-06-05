import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";

function ArticlesApproval() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Simulating fetching data from the server
    getOrders().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);

  const handleApprove = (articleId) => {
    // Update the status of the approved article in the dataSource
    const updatedDataSource = dataSource.map((article) =>
      article.id === articleId ? { ...article, status: "approved" } : article
    );
    setDataSource(updatedDataSource);
  };

  const handleDisapprove = (articleId) => {
    // Remove the disapproved article from the dataSource
    const updatedDataSource = dataSource.filter((article) => article.id !== articleId);
    setDataSource(updatedDataSource);
  };

  return (
    <Space size={20} direction="vertical" style={{ backgroundColor: "#f7f7f7", padding: "20px" }}>
      <Typography.Title level={4} style={{ color: "#1890ff" }}>
        Articles
      </Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            width: 80,
            align: "center",
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Body",
            dataIndex: "description",
            width: 400,
          },
          {
            title: "Author",
            dataIndex: "brand",
            render: (author) => (
              <Space>
                <Avatar>{author.charAt(0)}</Avatar>
                <span>{author}</span>
              </Space>
            ),
          },
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
              <Space>
                {record.status !== "approved" && (
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => handleApprove(record.id)}
                    style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => handleDisapprove(record.id)}
                  style={{ backgroundColor: "#f5222d", borderColor: "#f5222d", color: "#fff" }}
                >
                  Disapprove
                </Button>
              </Space>
            ),
            width: 180,
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        bordered
      />
    </Space>
  );
}

export default ArticlesApproval;
