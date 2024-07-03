import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from '../users/PostAuthor'
import React, { useEffect } from 'react'
import { TimeAgo } from '../common/TimeAgo'
import { ReactionButton } from '../common/ReactionButtons'
import { fetchPosts, selectAllPosts } from './PostsSlice'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className={'post-content'}>{post.content.substring(0, 100)}</p>
      <ReactionButton post={post} />
      <Link to={`/editPost/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export const PostsList = () => {
  // 从stroe中拿出数据 posts
  const posts = useSelector(selectAllPosts)

  const dispatch = useDispatch()
  const postStatus = useSelector((state) => state.posts.status)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])
  let content
  if (postStatus === 'loading') {
    content = <Spinner text="loading posts..." />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ))
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
