import React from 'react'

export default function Post({ post }) {
  return (
    <div>
      <img src={post.image} alt="" />
      <p>description: {post.description}</p>
    </div>
  )
}
