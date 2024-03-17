import React, { useState, useEffect } from 'react';
import './Postdisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
function Postdisplay() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:8080/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleLike = async (postId, index) => {
        try {
            const response = await fetch(`http://localhost:8080/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postId }) 
            });
    
            if (!response.ok) {
                throw new Error('Failed to update like status');
            }
    
            const updatedPosts = [...posts];
            updatedPosts[index].likes = updatedPosts[index].likes === 0 ? 1 : 0;
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };
        return (
            <div className="post-container">
                {posts.map((post, index) => (
                    <div key={index} className="post">
                        <h2>{post.title}</h2>
                        <img src={`http://localhost:8080${post.imageUrl}`} alt={post.title} />
                        <p>{post.description}</p>
                        <div className="like-section">
                            <span
                                role="button"
                                className="like-icon"
                                onClick={() => handleLike(post.pid, index)}
                            >
                                <FontAwesomeIcon icon={faThumbsUp} style={{ color: post.likes === 0 ? 'black' : 'blue', background: post.likes === 0 ? 'white' : 'blue' }} />
                            </span>
                        </div>
                        <div className="like-count-container">
                            <span className="like-count">{post.likes}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
}

export default Postdisplay;
