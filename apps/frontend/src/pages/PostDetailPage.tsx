import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boardService } from '../api/boardService';
import type { Post, Comment, CreateCommentRequest } from '../api/boardService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import {
  DetailContainer,
  PostContainer,
  PostHeader,
  PostTitle,
  PostMeta,
  PostContent,
  PostStats,
  ActionButtons,
  EditButton,
  DeleteButton,
  BackButton,
  CommentSection,
  CommentTitle,
  CommentForm,
  CommentTextarea,
  CommentSubmitButton,
  CommentList,
  CommentItem,
  CommentAuthor,
  CommentContent,
  CommentMeta,
  ReplyButton,
  CommentActions,
  Badge
} from '../styles/pages/postDetailPage.styles';
import toast from 'react-hot-toast';

export const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null);

  useEffect(() => {
    loadPostAndComments();
  }, [postId]);

  const loadPostAndComments = async () => {
    if (!postId) return;

    try {
      setLoading(true);
      
      const [postData, commentsData] = await Promise.all([
        boardService.getPost(parseInt(postId)),
        boardService.getComments(parseInt(postId))
      ]);
      
      setPost(postData);
      setComments(commentsData);
    } catch (error) {
      console.error('게시글 로드 실패:', error);
      toast.error('게시글을 불러올 수 없습니다.');
      navigate('/board');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postId || !commentContent.trim()) {
      toast.error('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      setSubmittingComment(true);
      
      const createRequest: CreateCommentRequest = {
        content: commentContent.trim(),
        ...(replyTo && { parentId: replyTo })
      };

      await boardService.createComment(parseInt(postId), createRequest);
      toast.success('댓글이 작성되었습니다! 🎉');
      
      setCommentContent('');
      setReplyTo(null);
      await loadPostAndComments();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      toast.error('댓글 작성에 실패했습니다. 😢');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      await boardService.deleteComment(commentId);
      toast.success('댓글이 삭제되었습니다.');
      await loadPostAndComments();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      toast.error('댓글 삭제에 실패했습니다.');
    }
  };

  const handleDeletePost = async () => {
    if (!postId || !confirm('게시글을 삭제하시겠습니까?')) return;

    try {
      await boardService.deletePost(parseInt(postId));
      toast.success('게시글이 삭제되었습니다.');
      navigate(`/board/${post?.categoryId}`);
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      toast.error('게시글 삭제에 실패했습니다.');
    }
  };

  const handleEditPost = () => {
    navigate(`/board/post/${postId}/edit`);
  };

  const handleReply = (commentId: number, authorName: string) => {
    setReplyTo(commentId);
    setCommentContent(`@${authorName} `);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR');
  };

  const formatRating = (rating?: number) => {
    if (!rating) return null;
    return '⭐'.repeat(rating);
  };

  if (loading) {
    return (
      <DetailContainer>
        <LoadingSpinner type="ring" size="large" showText={true} text="게시글을 불러오는 중..." />
      </DetailContainer>
    );
  }

  if (!post) {
    return (
      <DetailContainer>
        <div>게시글을 찾을 수 없습니다.</div>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <PostContainer>
        <PostHeader>
          <PostTitle>
            {post.isPinned && <Badge color="error">공지</Badge>}
            {post.isSecret && <Badge color="warning">비밀글</Badge>}
            {post.title}
          </PostTitle>
          <PostMeta>
            <span>{post.authorNickname || post.authorName}</span>
            <span>{formatDate(post.createdAt)}</span>
            {post.productName && <span>상품: {post.productName}</span>}
            {post.rating && <span>{formatRating(post.rating)}</span>}
          </PostMeta>
        </PostHeader>

        <PostContent 
          dangerouslySetInnerHTML={{ 
            __html: post.content?.replace(/\n/g, '<br />') || '' 
          }} 
        />

        <PostStats>
          <span>조회 {post.viewCount}</span>
          <span>좋아요 {post.likeCount}</span>
          <span>댓글 {post.commentCount}</span>
        </PostStats>

        <ActionButtons>
          <BackButton onClick={() => navigate(`/board/${post.categoryId}`)}>
            목록으로
          </BackButton>
          <div>
            <EditButton onClick={handleEditPost}>수정</EditButton>
            <DeleteButton onClick={handleDeletePost}>삭제</DeleteButton>
          </div>
        </ActionButtons>
      </PostContainer>

      <CommentSection>
        <CommentTitle>댓글 ({comments.length})</CommentTitle>
        
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentTextarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder={
              replyTo 
                ? "답글을 입력하세요..." 
                : "댓글을 입력하세요..."
            }
            maxLength={1000}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {replyTo && (
              <button 
                type="button" 
                onClick={() => { setReplyTo(null); setCommentContent(''); }}
                style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
              >
                답글 취소
              </button>
            )}
            <CommentSubmitButton type="submit" disabled={submittingComment}>
              {submittingComment ? (
                <LoadingSpinner type="dots" size="small" showText={false} />
              ) : (
                replyTo ? '답글 작성' : '댓글 작성'
              )}
            </CommentSubmitButton>
          </div>
        </CommentForm>

        <CommentList>
          {comments.map((comment) => (
            <div key={comment.id}>
              <CommentItem>
                <CommentAuthor>
                  {comment.authorNickname || comment.authorName}
                </CommentAuthor>
                <CommentContent>{comment.content}</CommentContent>
                <CommentMeta>
                  <span>{formatDate(comment.createdAt)}</span>
                  <span>좋아요 {comment.likeCount}</span>
                </CommentMeta>
                <CommentActions>
                  <ReplyButton onClick={() => handleReply(comment.id, comment.authorName)}>
                    답글
                  </ReplyButton>
                  <DeleteButton onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </DeleteButton>
                </CommentActions>
              </CommentItem>
              
              {comment.replies && comment.replies.map((reply) => (
                <CommentItem key={reply.id} style={{ marginLeft: '40px', backgroundColor: '#f8f9fa' }}>
                  <CommentAuthor>
                    {reply.authorNickname || reply.authorName}
                  </CommentAuthor>
                  <CommentContent>{reply.content}</CommentContent>
                  <CommentMeta>
                    <span>{formatDate(reply.createdAt)}</span>
                    <span>좋아요 {reply.likeCount}</span>
                  </CommentMeta>
                  <CommentActions>
                    <DeleteButton onClick={() => handleDeleteComment(reply.id)}>
                      삭제
                    </DeleteButton>
                  </CommentActions>
                </CommentItem>
              ))}
            </div>
          ))}
        </CommentList>
      </CommentSection>
    </DetailContainer>
  );
};