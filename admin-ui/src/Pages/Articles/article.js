import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from 'axios';

//import { getInventory, getOrders } from "../../API";

function ArticlesApproval() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const [deletionStatus, setDeletionStatus] = useState(false); // Track deletion status

  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:3001/api/approval/retrieveArticles')
      .then(response => {
        setDataSource(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [deletionStatus]); // Add deletionStatus as a dependency

  const handleApprove = (article) => {
    setLoading(true);

    axios.post('http://localhost:3001/api/articles/approveArticle', article)
      .then(response => {
        console.log(response.data);
        handleDisapprove(article.articleID);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDisapprove = (articleId) => {
    setLoading(true);

    axios.delete(`http://localhost:3001/api/approval/deleteArticle/${articleId}`)
      .then(response => {
        console.log(response.data);
        setLoading(false);
        setDeletionStatus(!deletionStatus); // Update deletionStatus to trigger rerender
      })
      .catch(error => {
        console.error(error);
      });
  };




  // useEffect(() => {
  //   setLoading(true);
  //   // Simulating fetching data from the server

  //   axios.get('http://localhost:3001/api/approval/retrieveArticles')
  //     .then(response => {
  //       // Handle successful response
  //       //const data = response.data;
  //       setDataSource(response.data);
  //       console.log(response.data)
  //       setLoading(false)

  //      // console.log(data);
  //       // Perform further operations with the data
  //     })
  //     .catch(error => {
  //       // Handle error
  //       console.error(error);
  //       // Perform error handling
  //     });
    

  // },[]);


  // const handleApprove = (article) => {
  //   // Update the status of the approved article in the dataSource
  //   //const updatedDataSource = dataSource.map((article) =>{
  //   setLoading(true)


  //   console.log(article)

  //       var flag = false;
  //       axios.post('http://localhost:3001/api/articles/approveArticle', article)
  //       .then(response => {
  //         // Handle successful response
  //         console.log(response.data);
  //         flag = true;
  //         console.log(flag)
  //         handleDisapprove(article.articleID)
          

  //       })
  //       .catch(error => {
  //         // Handle error
  //         console.error(error);
  //         // Perform error handling
  //       });

  //   //setDataSource(updatedDataSource);
  // };

  // const handleDisapprove = (articleId) => {

  //   setLoading(true)
  //   // Remove the disapproved article from the dataSource

  //   console.log("In Deletion")
  //   axios.delete(`//localhost:3001/api/approval/deleteArticle/${articleId}`)
  //   .then(response => {
  //     // Handle successful response
  //     console.log(response.data);
  //     setLoading(false)
  //     window.location.reload(false)
  //     // Perform further operations after successful deletion
  //   })
  //   .catch(error => {
  //     // Handle error
  //     console.error(error);
  //     // Perform error handling
  //   });

  //   // setDataSource(updatedDataSource);
  // };

  return (

    <Space size={20} direction="vertical" style={{ backgroundColor: "#f7f7f7", padding: "20px" }}>
  <Typography.Title level={4} style={{ color: "#1890ff" }}>
    Articles
  </Typography.Title>
  <Table
    loading={loading}
    columns={[
      {
        title: "Article ID",
        dataIndex: "articleID",
        width: 80,
        align: "center",
      },
      {
        title: "Title",
        dataIndex: "title",
      },
      {
        title: "Body",
        dataIndex: "body",
        width: 400,
      },
      {
        title: "Author",
        dataIndex: "authorUserName",
        render: (authorUserName) => (
          <Space>
            <Avatar>{authorUserName.charAt(0)}</Avatar>
            <span>{authorUserName}</span>
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
                onClick={() => handleApprove(record)}
                style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
              >
                Approve
              </Button>
            )}
            <Button
              icon={<CloseOutlined />}
              onClick={() => handleDisapprove(record.articleID)}
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

export default ArticlesApproval;
