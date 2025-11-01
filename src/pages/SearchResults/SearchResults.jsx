import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, NavLink } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

export const SearchResults = () => {
    const{search} = useParams();
    const[users , setUsers] = useState([]);
    const[posts , setPosts] = useState([]);
    async function search_for_users(){
        try {
            const response = await axios.get(`https://dummyjson.com/users/search?q=${search}`)
            setUsers(response.data.users);
        } catch (error) {
            console.log(error)
        }
    }
    async function search_for_posts() {
        try {
            const response = await axios.get(`https://dummyjson.com/posts/search?q=${search}`);
            setPosts(response.data.posts);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        search_for_users();
        search_for_posts();    
    },[search])
  return (
    <Container fluid style={{height: "100vh"}}>
        <h1>Search Results for "{search}"</h1>
        <div className='users-results my-4 d-flex gap-3 align-items-center'>
            <h4>Users:</h4>
            {users.length == 0 ? (<h3>No users found with this username</h3>):(
                users.map((user) => (
                    <NavLink as={Link} key={user.id} to={`/profile/${user.id}`}> {user.username }</NavLink>
                ))
            )}
        </div>
        <div className="post-results">
        <h2>Posts with similar results:</h2>
        {posts.length == 0 ? (<h3>No posts found with this content</h3>):(
            posts.map((post) => (
                <div key={post.id} className="post-container mb-3">
                    <h1>UserID: {post.userId}</h1>
                    <h2>Title: {post.title}</h2>
                    <h3>Body: {post.body}</h3>
                </div>
            )))}
        </div>   
    </Container>
  )
}
