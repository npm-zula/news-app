import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
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
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Articles</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Body",
            dataIndex: "description",
          },
          {
            title: "Author",
            dataIndex: "brand",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            render: (_, record) => (
              <Space>
                {record.status !== "approved" && (
                  <Button
                    type="primary"
                    onClick={() => handleApprove(record.id)}
                  >
                    Approve
                  </Button>
                )}
                <Button onClick={() => handleDisapprove(record.id)}>
                  Disapprove
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}

export default ArticlesApproval;
