import React, { useState, useEffect } from 'react';
import { Card, Space, Statistic, Table, Typography, message} from "antd";
import axios from 'axios'


const AddArticle = ({ onAddArticle, onCancel }) => {
  const [newArticle, setNewArticle] = useState({
    articleID: '',
    title: '',
    body: '',
    published: '',
    tags: '',
    authorUserName: ''

  });

  const handleInputChange = (e) => {
    setNewArticle((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const handleAddArticle = () => {
    if (
      newArticle.title.trim() === '' ||
      newArticle.body.trim() === '' ||
      newArticle.tags.trim() === ''
    ) {
      alert('Please enter a title, content, and tags for the article.');
      return;
    }

    const tagsArray = newArticle.tags.split(',').map((tag) => tag.trim());

    const formData = {
      articleID: Math.floor(Math.random() * 1000),
      title: newArticle.title,
      body: newArticle.body,
      published: false,
      tags: tagsArray,
      authorUserName: 'janedoe'
    };

    axios.post('http://localhost:5000/api/approval/createArticle', formData)
    .then(response => {
      message.success("Article Added successfully.");
      //setDataSource(response.data);
      //setLoading(false);
    })
    .catch(error => {
      console.error(error);
    });

    


    //console.log('Article', newArticleWithId);
    onAddArticle(formData);

    setNewArticle({
      articleID: '',
      title: '',
      body: '',
      published: '',
      tags: '',
      authorUserName:''
    });
  };

  return (
    <div className="add-article">
      <h2>Add New Article</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={newArticle.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Content:</label>
        <textarea
          id="body"
          value={newArticle.body}
          onChange={handleInputChange}
          rows="5"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags:</label>
        <input
          type="text"
          id="tags"
          value={newArticle.tags}
          onChange={handleInputChange}
        />
      </div>

      <div className="buttons">
        <button className="add-btn" onClick={handleAddArticle}>
          Add Article
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>

      <style jsx>{`
        .add-article {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: left;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          background-color: #ffffff;
          transform: translateY(0);
          transition: transform 0.3s ease-in-out;
          transform-style: preserve-3d;
        }
        
        .add-article:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        
        h2 {
          color: #333;
          font-size: 24px;
          margin-bottom: 20px;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        label {
          display: block;
          color: #333;
          font-size: 16px;
          margin-bottom: 5px;
        }
        
        input[type='text'],
        textarea {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #f8f8f8;
          transition: border-color 0.3s ease;
        }
        
        input[type='text']:focus,
        textarea:focus {
          outline: none;
          border-color: #007bff;
        }
        
        .buttons {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 20px;
        }
        
        .add-btn,
        .cancel-btn {
          background-color: red;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .add-btn:hover{
          background-color: #0056b3;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

        }
        .cancel-btn:hover {
          background-color: #E71639;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        
      `}</style>
    </div>
  );
};





const UpdateArticle = ({ article, onUpdateArticle, onCancel }) => {
  const [updateArticle, setUpdateArticle] = useState({ ...article });

  const handleInputChange = (e) => {
    setUpdateArticle((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const handleSaveUpdateArticle = () => {
    if (updateArticle.title.trim() === '' || updateArticle.content.trim() === '') {
      alert('Please enter a title and content for the article.');
      return;
    }

    onUpdateArticle(updateArticle);
  };

  return (
    <div className="update-article">
      <h2>Update Article</h2>
      <div className="form-group">
        <label htmlFor="updateArticleTitle">Title:</label>
        <input
          type="text"
          id="title"
          value={updateArticle.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="updateArticleContent">Content:</label>
        <textarea
          id="content"
          value={updateArticle.content}
          onChange={handleInputChange}
          rows="5"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="updateArticleAuthor">Author Name:</label>
        <input
          type="text"
          id="authorName"
          value={updateArticle.authorName}
          onChange={handleInputChange}
        />
      </div>
      <div className="buttons">
        <button className="save-btn" onClick={handleSaveUpdateArticle}>
          Save Changes
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
  
      <style jsx>{`
      .update-article {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: left;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        background-color: #ffffff;
        transform: translateY(0);
        transition: transform 0.3s ease-in-out;
        transform-style: preserve-3d;
      }
      
      .update-article:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      }
      
      h2 {
        color: #333;
        font-size: 24px;
        margin-bottom: 20px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      }
      
      .form-group {
        margin-bottom: 20px;
      }
      
      label {
        display: block;
        color: #333;
        font-size: 16px;
        margin-bottom: 5px;
      }
      
      input[type='text'],
      textarea {
        width: 100%;
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f8f8f8;
        transition: border-color 0.3s ease;
      }
      
      input[type='text']:focus,
      textarea:focus {
        outline: none;
        border-color: #007bff;
      }
      
      .buttons {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
      }
      
      .save-btn{
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      }

      .cancel-btn {
        background-color: red;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      }
      
      .save-btn:hover{
        background-color: #0056b3;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

      }
      .cancel-btn:hover {
        background-color: #E71639;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      }
      
        
      `}</style>
    </div>
  );
};

const ViewArticle = () => {
  const [articles, setArticles] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('view');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [deletionStatus, setDeletionStatus] = useState(false)

  useEffect(() => {
    //setLoading(true);

    var userID = 'janedoe'
    axios.get(`http://localhost:5000/api/articles/retrieveUserArticles/${userID}`)
      .then(response => {
        //console.log(response.data)
         setArticles(response.data);
        //setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });

  }, [deletionStatus]); // Add deletionStatus as a dependency


  const handleAddArticle = (newArticle) => {
    //setArticles((prevState) => [...prevState, newArticle]);
    setCurrentScreen('view');
  };

  const handleDeleteArticle = (articleId) => {
    const confirmed = window.confirm('Are you sure you want to delete this article?');
    if (confirmed) {
      //setArticles((prevState) => prevState.filter((article) => article.id !== articleId));
    
      axios.delete(`http://localhost:5000/api/articles/deleteArticle/${articleId}`)
      .then(response => {
        console.log(response.data);
        //setLoading(false);
        message.success("Article deleted successfully.");
        setDeletionStatus(!deletionStatus); // Update deletionStatus to trigger rerender
        //setModalVisible(false)
      })
      .catch(error => {
        console.error(error);
      });
      
    }
  };

  const handleEditArticle = (article) => {
    setCurrentScreen('edit');
    setSelectedArticle(article);
  };

  const handleUpdateArticle = (updatedArticle) => {
    setArticles((prevState) =>
      prevState.map((article) => {
        if (article.id === updatedArticle.id) {
          return updatedArticle;
        }
        return article;
      })
    );
    setCurrentScreen('view');
    setSelectedArticle(null);
  };

  const handleCancel = () => {
    setCurrentScreen('view');
    setSelectedArticle(null);
  };

  return (
    <div className="view-article">
      {currentScreen === 'view' && (
        <>
          <button className="add-btn" onClick={() => setCurrentScreen('add')}>
            Add Article
          </button>
          <h1>Articles</h1>
          {articles.length === 0 ? (
            <p>No articles found.</p>
          ) : (
            <div className="article-list">
              {articles.map((article) => (
                <div key={article.id} className="article-card">
                  <h2 className="article-title">{article.title}</h2>Content: 
                  <p className="article-content">{article.body}</p>
                  <p className="article-author">Author: {article.authorUserName}</p>
                  <div className="actions">
                    <button className="edit-btn" onClick={() => handleEditArticle(article)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteArticle(article.articleID)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {currentScreen === 'add' && (
        <AddArticle onAddArticle={handleAddArticle} onCancel={handleCancel} />
      )}

      {currentScreen === 'edit' && (
        <UpdateArticle
          article={selectedArticle}
          onUpdateArticle={handleUpdateArticle}
          onCancel={handleCancel}
        />
      )}

      <style jsx>{`
.article-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

.article-card {
  background-color: #ECF1F5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.article-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.article-title {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
}

.article-content {
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.4;
}

.article-author {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
  margin-left: 100px;
  font-weight: bold;
}

.article-author-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.edit-btn,
.delete-btn {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease-in-out;
}

.edit-btn:hover,
.delete-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #f44336;
}


        .view-article {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        h1 {
          color: #333;
          font-size: 28px;
          margin-bottom: 20px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 20px;
          margin-bottom: 20px;
        }

        h2 {
          color: #333;
          font-size: 24px;
          margin-bottom: 10px;
        }

        p {
          color: #666;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .actions {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .edit-btn,
        .delete-btn {
          background-color: #007bff;
          color: #fff;
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          margin-right: 10px;
        }

        .delete-btn {
          background-color: #f44336;
        }

        .add-btn {

          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          margin-top: 20px;
          margin-bottom: 20px;
          
         
        }
      `}</style>
    </div>
  );
};

export default ViewArticle;