import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment, postReply, fetchComments } from '../Redux/commentSlice';
import { Textarea, Button, Spinner, Badge } from '@nextui-org/react';

const Comments = ({ auctionId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector(state => state.comments);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      dispatch(postComment({ auctionId, userId: 'currentUserId', content: newComment }));
      setNewComment('');
    }
  };

  const handleReply = (commentId, replyContent) => {
    // Prompt user for reply content and then dispatch the action
    const userReply = prompt('Enter your reply:');
    if (userReply.trim() !== '') {
      dispatch(postReply({ auctionId, commentId, userId: 'currentUserId', content: userReply }));
    }
  };

  // Fetch comments on initial component mount
  useEffect(() => {
    dispatch(fetchComments(auctionId));
  }, [dispatch, auctionId]);

  return (
    <div>
      <h2>Comments and Questions</h2>
      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <Button onClick={handleSubmitComment} disabled={loading} auto>
        {loading ? <Spinner color="white" size="mini" /> : 'Post Comment'}
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {comments && comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            {comment.replies && (
              <ul>
                {comment.replies.map(reply => (
                  <li key={reply.id}>
                    <p>{reply.content}</p>
                  </li>
                ))}
              </ul>
            )}
            <Button onClick={() => handleReply(comment.id)} auto>
              <Badge color="info">Reply</Badge>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
