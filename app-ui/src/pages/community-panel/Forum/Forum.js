import { Button, Form, Input, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from 'axios'

function Forums() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [deletionStatus, setDeletionStatus] = useState(false); // Track deletion status

  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:5000/api/forum/retrieveForums')
      .then(response => {
        setDataSource(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [deletionStatus]); // Add deletionStatus as a dependency

  const handleAddAnswer = (forumId, questionId, answer) => {
    setLoading(true);

    const updatedDataSource = dataSource.map((forum) => {
      if (forum.id === forumId) {
        const updatedQuestions = forum.questions.map((question) => {
          if (question.id === questionId) {
            const newAnswer = {
              id: Date.now(),
              author: "User",
              answer,
            };
            const updatedAnswers = [...question.answers, newAnswer];
            return { ...question, answers: updatedAnswers };
          }
          return question;
        });
        return { ...forum, questions: updatedQuestions };
      }
      return forum;
    });

    setDataSource(updatedDataSource);

    setLoading(false);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Forums</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "User ID",
            dataIndex: "userID",
          },
          {
            title: "Question ID",
            dataIndex: "questionID",
          },
        ]}
        expandable={{
          expandedRowRender: (record) => {
            const question = record.question;
            return (
              <Space size={20} direction="vertical">
                <Typography.Title level={5}>Question</Typography.Title>
                <div>{record.question}</div>
                {/* <Table
                  columns={[
                    {
                      title: "Question",
                      dataIndex: "question",
                    },
                    {
                      title: "Answer",
                      dataIndex: "answer",
                    },
                  ]}
                  dataSource={question.answers.map((answer) => ({
                    ...answer,
                    key: answer.id,
                  }))}
                  pagination={false}
                /> */}
                <Form
                  layout="inline"
                  onFinish={(values) =>
                    handleAddAnswer(
                      record.id,
                      question.id,
                      values.answer
                    )
                  }
                >
                  <Form.Item
                    label="Answer"
                    name="answer"
                    rules={[
                      {
                        required: true,
                        message: "Please enter an answer",
                      },
                    ]}
                  >
                    <Input placeholder="Answer" />
                  </Form.Item>
                  <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ backgroundColor: 'blue' }}>
                    Add Answer
                  </Button>

                  </Form.Item>
                </Form>
              </Space>
            );
          },
        }}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          width: "700px",
        }}
      />
    </Space>
  );
}

export default Forums;
