import { Avatar, Button, Form, Input, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function Forums() {
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
          questions: [
            {
              id: 1,
              author: "User A",
              question: "Question 1",
              answers: [
                {
                  id: 1,
                  author: "User B",
                  answer: "Answer 1",
                },
                {
                  id: 2,
                  author: "User C",
                  answer: "Answer 2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          title: "Forum 2",
          content: "Content 2",
          questions: [],
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
        questions: [],
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
        const updatedQuestions = [...forum.questions, newQuestion];
        return { ...forum, questions: updatedQuestions };
      }
      return forum;
    });

    setDataSource(updatedDataSource);

    setLoading(false);
  };

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

  const handleDeleteQuestion = (forumId, questionId) => {
    setLoading(true);

    const updatedDataSource = dataSource.map((forum) => {
      if (forum.id === forumId) {
        const updatedQuestions = forum.questions.filter(
          (question) => question.id !== questionId
        );
        return { ...forum, questions: updatedQuestions };
      }
      return forum;
    });

    setDataSource(updatedDataSource);

    setLoading(false);
  };

  const handleDeleteAnswer = (forumId, questionId, answerId) => {
    setLoading(true);

    const updatedDataSource = dataSource.map((forum) => {
      if (forum.id === forumId) {
        const updatedQuestions = forum.questions.map((question) => {
          if (question.id === questionId) {
            const updatedAnswers = question.answers.filter(
              (answer) => answer.id !== answerId
            );
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
          <Button type="primary" onClick={handleAddForum}>
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
        ]}
        expandable={{
          expandedRowRender: (record) => {
            const { questions } = record;
            return (
              <Space size={20} direction="vertical">
                <Typography.Title level={5}>Questions</Typography.Title>
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
                    <Button type="primary" htmlType="submit">
                      Add Question
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
                      title: "Question",
                      dataIndex: "question",
                    },
                    {
                      title: "Answers",
                      dataIndex: "answers",
                      render: (answers, record) =>
                        answers.map((answer) => (
                          <div key={answer.id}>
                            {answer.answer}
                            <Button
                              type="danger"
                              onClick={() =>
                                handleDeleteAnswer(
                                  record.forumId,
                                  record.questionId,
                                  answer.id
                                )
                              }
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                marginLeft: 8,
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        )),
                    },
                    {
                      title: "Actions",
                      dataIndex: "id",
                      render: (questionId) => (
                        <Space>
                          <Form
                            layout="inline"
                            onFinish={(values) =>
                              handleAddAnswer(
                                record.id,
                                questionId,
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
                              <Button type="primary" htmlType="submit">
                                Add Answer
                              </Button>
                            </Form.Item>
                          </Form>
                          <Button
                            type="danger"
                            onClick={() =>
                              handleDeleteQuestion(record.id, questionId)
                            }
                            style={{ backgroundColor: "red", color: "white" }}
                          >
                            Delete
                          </Button>
                        </Space>
                      ),
                    },
                  ]}
                  dataSource={questions.map((question) => ({
                    ...question,
                    forumId: record.id,
                    questionId: question.id,
                    key: question.id,
                  }))}
                  pagination={false}
                />
              </Space>
            );
          },
        }}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
}

export default Forums;
