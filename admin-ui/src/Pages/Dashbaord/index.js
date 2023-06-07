import {
  BookFilled,
  CommentOutlined,
  UserOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";

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
  const [pendingArticles, setPendingArticles] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
    // Fetch data for pendingArticles field
    // Example:
    // getPendingArticles().then((res) => {
    //   setPendingArticles(res.total);
    // });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
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
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
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
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
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
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            />
          }
          title={"Users"}
          value={customers}
        />
        
       
        <DashboardCard
          icon={
            <TeamOutlined
              style={{
                color: "cyan",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            />
          }
          title={"Team Members"}
          value={'4'}
        />
      </Space>
      <Space>
        {/* <RecentOrders /> */}
        <DashboardChart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card
      style={{
        width: 200,
        height: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ marginBottom: 10 }}>{icon}</div>
      <Statistic title={title} value={value} />
    </Card>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
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
            label: "Articles",
            data,
            backgroundColor: "rgba(255, 0, 0, 0.6)",
            borderColor: "rgba(255, 0, 0, 1)",
            borderWidth: 1,
            borderRadius: 5,
            hoverBackgroundColor: "rgba(255, 0, 0, 0.8)",
            hoverBorderColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setRevenueData(dataSource);
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
        text: "Article Stats",
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <Card
      style={{
        width: 500,
        height: 250,
        borderRadius: 10,
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Bar data={revenueData} options={options} />
    </Card>
  );
}

export default Dashboard;
