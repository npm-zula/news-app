import React, { useState, useEffect } from 'react';
import axios from 'axios'

const ViewArticle = () => {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [deletionStatus, setDeletionStatus] = useState(false); // Track deletion status

  // useEffect(() => {
  //   // // Simulating data fetching
  //   // const dummyData = [
  //   //   {
  //   //     id: 1,
  //   //     title: 'Article 1',
  //   //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //   //     authorName: 'John Doe',
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     title: 'Article 2',
  //   //     content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   //     authorName: 'Jane Smith',
  //   //   },
  //   //   {
  //   //     id: 3,
  //   //     title: 'Article 3',
  //   //     content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //   //     authorName: 'Bob Johnson',
  //   //   },
  //   //   {
  //   //     id: 4,
  //   //     title: 'Article 4',
  //   //     content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //   //     authorName: 'Ehsan Rasul',
  //   //   },
  //   // ];
  //   //setArticles(dummyData);
  // }, []);


  useEffect(() => {
    //setLoading(true);

    axios.get('http://localhost:5000/api/articles/retrieveArticles')
      .then(response => {
        //console.log(response.data)
        setArticles(response.data);
        //setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });

      axios.get('http://localhost:5000/api/comments/retrieveComments')
      .then(response => {
        //console.log(response.data)
        setComments(response.data);
        //setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });

      mapData();

  }, [deletionStatus]); // Add deletionStatus as a dependency


  const mapData = () => {
    var mapped_array = []

    // // Iterate over each comment and map it to the corresponding article
    // for (const comment of comments) {
    //   const article = articles.find((a) => a.articleID === comment.articleID);
    //   if (article) {
    //     mapped_array.push({ comment, article });
    //   }
    // }



    for(const article of articles){

        var mappedComments = []
        for(const comment of comments){
          if(article.articleID === comment.articleID){
          mappedComments.push(comment)            
          }
        }


        mapped_array.push(article, mappedComments)

    }


    //console.log("This is mapped Array",mapped_array)
    // for(const i of mapped_array){

    //   console.log(i)

    // }
    setArticles(mapped_array)
    // // Print the mapped array
    // for (const item of mapped_array) {
    //   console.log(item);
    // }

  };



  // useEffect(() => {
  //   // Simulating data fetching
  //   const dummyComments = {
  //     1: [
  //       { authorName: 'Alice', comment: 'Great article!' },
  //       { authorName: 'Bob', comment: 'I enjoyed reading this.' },
  //     ],
  //     2: [
  //       { authorName: 'Charlie', comment: 'Well written!' },
  //     ],
  //   };

  //   setComments(dummyComments);
  // }, []);

  const handleAddComment = (articleId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [articleId]: [...(prevComments[articleId] || []), comment],
    }));
  };

  const handleArticleSelection = (articleId) => {
    setSelectedArticle(articleId);
  };

  return (
    <div className="view-article">
      <h1>Articles</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="article-list">
          {articles.map((article, index) => (
            <div
              key={article.id}
              className={`article-card ${index < 3 ? 'highlighted' : ''}`}
            >
              {index < 3 && <span className="top-rated-badge">Top Rated</span>}
              <h2 className="article-title">{article.title}</h2>
              <p className="article-content">{article.body}</p>
              <p className="article-author">Author: {article.authorUserName}</p>

              <div className="comments-section">
                <div className="comments-header">
                  <h3>Comments</h3>
                  <button
                    className={`dropdown-btn ${
                      selectedArticle === article.id ? 'open' : ''
                    }`}
                    onClick={() =>
                      handleArticleSelection(
                        selectedArticle === article.id ? null : article.id
                      )
                    }
                  >
                    {selectedArticle === article.id ? 'Hide' : 'Show'} Comments
                  </button>
                </div>
                {selectedArticle === article.id && comments[article.id] && (
                  <ul className="comments-list">
                    {article.mappedComments.map((comment, index) => (
                      <li key={index} className="comment-item">
                        <span className="comment-author">{comment.userName}: </span>
                        {comment.body}
                      </li>
                    ))}
                  </ul>
                )}
                {selectedArticle === article.id && (
                  <form
                    className="comment-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const comment = e.target.elements.comment.value;
                      handleAddComment(article.id, {
                        authorName: 'John Doe', // Replace with the actual author name
                        comment,
                      });
                      e.target.reset();
                    }}
                  >
                    <textarea
                      name="comment"
                      placeholder="Add a comment..."
                    ></textarea>
                    <button type="submit">Add Comment</button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
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
          position: relative;
        }

        .article-card.highlighted {
          background-color: #F5DD99;
        }

        .article-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .top-rated-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #7DCB7D;
          color: #333;
          padding: 4px 8px;
          border-radius: 5px;
          font-size: 14px;
          font-weight: bold;
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

        .comments-section {
          margin-top: 20px;
        }

        h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .comments-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .comment-item {
          margin-bottom: 10px;
        }

        .comment-author {
          font-weight: bold;
        }

        .dropdown-btn {
          background: none;
          border: none;
          color: #007bff;
          cursor: pointer;
          font-size: 14px;
          margin-top: 5px;
        }

        .dropdown-btn.open {
          color: #333;
        }

        form {
          margin-top: 10px;
        }

        textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 5px;
          resize: vertical;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button[type='submit'] {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 16px;
          font-size: 14px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ViewArticle;
