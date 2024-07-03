import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from '../users/PostAuthor'
import React from 'react'
import { TimeAgo } from '../common/TimeAgo'
import { ReactionButton } from '../common/ReactionButtons'

export const PostsList = () => {
  // 从stroe中拿出数据 posts
  const posts = useSelector((state) => state.posts)
  console.log("PostsList",posts)
  // 根据日期时间倒叙排序
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.user} />
      <br />
      <TimeAgo timestamp={post.date} />
      <br />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <ReactionButton post={post} />
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}