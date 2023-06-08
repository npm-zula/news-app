import { Avatar, Button, Form, Input, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function MyForums() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    // Simulating fetching data from the server
    setTimeout(() => {
      const dummyData = [
        {
          id: 1,
          title: "Forum 1",
          content: "Content 1",
          question: null,
          answers: [],
        },
        {
          id: 2,
          title: "Forum 2",
          content: "Content 2",
          question: null,
          answers: [],
        },
      ];
      setDataSource(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddForum = () => {
    form.validateFields().then((values) => {
      setLoading(true);

      // Simulating adding a new forum
      const newForum = {
        id: Date.now(),
        title: values.title,
        content: values.content,
        question: null,
        answers: [],
      };

      const updatedDataSource = [...dataSource, newForum];
      setDataSource(updatedDataSource);

      setLoading(false);
      form.resetFields();
    });
  };

  const handleAddQuestion = (forumId, question) => {
    setLoading(true);

    const updatedDataSource = dataSource.map((forum) => {
      if (forum.id === forumId) {
        const newQuestion = {
          id: Date.now(),
          author: "User",
          question,
          answers: [],
        };
        return { ...forum, question: newQuestion };
      }
      return forum;
    });

    setDataSource(updatedDataSource);

    setLoading(false);
  };

  const handleAddAnswer = (forumId, answer) => {
    setLoading(true);

    const updatedDataSource = dataSource.map((forum) => {
      if (forum.id === forumId) {
        const updatedAnswers = [
          ...forum.answers,
          { id: Date.now(), author: "User", answer },
        ];
        return { ...forum, answers: updatedAnswers };
      }
      return forum;
    });

    setDataSource(updatedDataSource);

    setLoading(false);
  };

  const handleDeleteForum = (forumId) => {
    setLoading(true);

    const updatedDataSource = dataSource.filter((forum) => forum.id !== forumId);

    setDataSource(updatedDataSource);

    setLoading(false);
  };

  const handleDeleteAnswer = (forumId, answerId) => {
    setLoading(true);

    const updatedDataSource = dataSource.map((forum) => {
      if (forum.id === forumId) {
        const updatedAnswers = forum.answers.filter((answer) => answer.id !== answerId);
        return { ...forum, answers: updatedAnswers };
      }
      return forum;
    });

    setDataSource(updatedDataSource);

    setLoading(false);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>My Forums</Typography.Title>
      <Form form={form} layout="inline">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please enter content" }]}
        >
          <Input placeholder="Content" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddForum} style={{ backgroundColor: "#1890ff", color: "#fff" }}>
            Add Forum
          </Button>
        </Form.Item>
      </Form>
      <Table
        loading={loading}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Content",
            dataIndex: "content",
          },
          {
            title: "Actions",
            dataIndex: "id",
            render: (forumId) => (
              <Button
                type="danger"
                onClick={() => handleDeleteForum(forumId)}
                style={{
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                }}
              >
                Delete
              </Button>
            ),
          },
        ]}
        expandable={{
          expandedRowRender: (record) => {
            const { question, answers } = record;
            return (
              <Space size={20} direction="vertical">
                <Typography.Title level={5}>Questions</Typography.Title>
                {question ? (
                  <div>
                    <Typography.Title level={6}>
                      Question:
                    </Typography.Title>
                    <div>{question.question}</div>
                    <Form
                      layout="inline"
                      onFinish={(values) =>
                        handleAddAnswer(record.id, values.answer)
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
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: "#1890ff", color: "#fff" }}>
                          Add Answer
                        </Button>
                      </Form.Item>
                    </Form>
                    <Table
                      columns={[
                        {
                          title: "Author",
                          dataIndex: "author",
                        },
                        {
                          title: "Answer",
                          dataIndex: "answer",
                        },
                        {
                          title: "Actions",
                          dataIndex: "id",
                          render: (answerId) => (
                            <Button
                              type="danger"
                              onClick={() => handleDeleteAnswer(record.id, answerId)}
                              style={{
                                backgroundColor: "#ff4d4f",
                                color: "#fff",
                              }}
                            >
                              Delete
                            </Button>
                          ),
                        },
                      ]}
                      dataSource={answers.map((answer) => ({
                        ...answer,
                        key: answer.id,
                      }))}
                      pagination={false}
                    />
                  </div>
                ) : (
                  <Form
                    layout="inline"
                    onFinish={(values) =>
                      handleAddQuestion(record.id, values.question)
                    }
                  >
                    <Form.Item
                      label="Question"
                      name="question"
                      rules={[
                        { required: true, message: "Please enter a question" },
                      ]}
                    >
                      <Input placeholder="Question" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" style={{ backgroundColor: "#1890ff", color: "#fff" }}>
                        Add Question
                      </Button>
                    </Form.Item>
                  </Form>
                )}
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
        }}
      />
    </Space>
  );
}

export default MyForums;
