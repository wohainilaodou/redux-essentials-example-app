import {useDispatch} from "react-redux";
import {reactionAdded} from "../posts/PostsSlice";

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButton = ({ post }) => {
  const dispatch = useDispatch();
  console.log("ReactionButton",post)
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" className="muted-button reaction-button"
        onClick={()=>{
          dispatch(reactionAdded({postId:post.id,reaction:name}))
        }}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return <div>{reactionButtons}</div>
}

