import {
    BookFilled,
    CommentOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Card, Space, Statistic, Table, Typography } from "antd";
  import { useEffect, useState } from "react";
  import { getCustomers, getInventory, getOrders, getRevenue } from "../Api";
  import axios from 'axios'
  import { useUserProfile } from '../../userProfile';
  

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  function Dashboard() {
    const [orders, setOrders] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [data, setData] = useState([]);
    const[articles, setArticles] = useState([null])
    const[comments, setComments] = useState([null])
    

    const [user, setUser] = useState(null);


 useEffect(() => {
    const token = getTokenFromCookie();
  
    fetchUserProfile(token)
      .then((user) => {
        setUser(user);
        
      //var username = user.username;
      console.log("userName", user.username)
      var userID = user.username;
      axios.get(`http://localhost:5000/api/articles/retrieveUserArticles/${userID}`)
        .then(response => {
           setArticles(response.data);
           console.log("response", response.data)
        })
        .catch(error => {
          console.error(error);
        });

      //var username = user.username;
      axios
        .get('http://localhost:5000/api/comments/retrieveComments')
        .then((response) => {
             setComments(response.data);
             console.log("Comments",response.data)
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });


    mapData();

  }, []);
  
  

  const mapData = () => {
    var mapped_data = []
    var commentCount = 0;
    
    for (const article of articles) {
        var mapped_comment = [];
        for (const comment of comments) {
          if (article && comment && article.articleID === comment.articleID) {
            mapped_comment.push(comment);
            commentCount++;
          }
        }
        mapped_data.push(article, mapped_comment);
      }
    

    for(const i of mapped_data){

        console.log("Data",i);

    }

    setOrders(articles.length)
    setInventory(commentCount)
    //console.log("comments",commentCount)

}




  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const user = await response.json();
        //console.log(user);
        return user;
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith("token=")) {
        return cookie.substring("token=".length, cookie.length);
      }
    }
    
    return null;
  };

  
    return (
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Analytics</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <BookFilled
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Articles"}
            value={orders}
          />
          <DashboardCard
            icon={
              <CommentOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Comments"}
            value={inventory}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Users"}
            value={customers}
          />
          {/* <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Revenue"}
            value={revenue}
          /> */}
        </Space>
        <Space>
          <RecentOrders />
          <DashboardChart />
        </Space>
      </Space>
    );
  }
  
  function DashboardCard({ title, value, icon }) {
    return (
      <Card>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    );
  }
  function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      getOrders().then((res) => {
        setDataSource(res.products.splice(0, 3));
        setLoading(false);
      });
    }, []);
  
    return (
      <>
        <Typography.Text>Recent Articles</Typography.Text>
        <Table
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
            },
            {
              title: "Price",
              dataIndex: "discountedPrice",
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={false}
        ></Table>
      </>
    );
  }
  
  function DashboardChart() {
    const [reveneuData, setReveneuData] = useState({
      labels: [],
      datasets: [],
    });
  
    useEffect(() => {
      getRevenue().then((res) => {
        const labels = res.carts.map((cart) => {
          return `User-${cart.userId}`;
        });
        const data = res.carts.map((cart) => {
          return cart.discountedTotal;
        });
  
        const dataSource = {
          labels,
          datasets: [
            {
              label: "Revenue",
              data: data,
              backgroundColor: "rgba(255, 0, 0, 1)",
            },
          ],
        };
  
        setReveneuData(dataSource);
      });
    }, []);
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Order Revenue",
        },
      },
    };
  
    return (
      <Card style={{ width: 500, height: 250 }}>
        <Bar options={options} data={reveneuData} />
      </Card>
    );
  }
  export default Dashboard;
  