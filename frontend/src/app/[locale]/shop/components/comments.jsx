import { useEffect, useRef } from "react";
import useRegistering from "../../user_registering/store/useRegisteringStore";
import useCommentStore from "../store/useCommentsStore";
import Loader from "../../global/widgets/loader";
import useTranslationStore from "../../global/state/useTranslationStore";

import { PropTypes } from "prop-types";
const CommentsWidget = ({ productId }) => {
  const t = useTranslationStore((state) => state.t);
  const isLogedIn = useRegistering((state) => state.isLogedIn);
  const commentFeildRef = useRef();

  const {
    comments,
    isCommentsLoading,
    showMore,
    addComment,
    fetchComments,
    loadMoreComments,
  } = useCommentStore((state) => ({
    comments: state.comments,
    isCommentsLoading: state.isCommentsLoading,
    showMore: state.showMore,
    addComment: state.addComment,
    fetchComments: state.fetchComments,
    loadMoreComments: state.loadMoreComments,
  }));

  useEffect(() => {
    fetchComments(productId);
  }, [fetchComments, productId]);

  async function submitComment(event) {
    event.preventDefault();

    const comment = commentFeildRef.current.value;

    addComment(comment, productId, commentFeildRef);
  }
  return (
    <>
      <section className="custom-scrollbar mt-2 max-h-96 overflow-y-scroll">
        <h3 className="mb-4 mt-8 text-xl font-bold text-indigo-900">
          {t("comments")}
        </h3>
        {isCommentsLoading ? (
          <Loader />
        ) : (
          comments?.map((comment, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <p className="font-bold text-indigo-500">{comment.customer}</p>
              <p>{comment.comment}</p>
            </div>
          ))
        )}
      </section>
      {showMore && (
        <button
          onClick={() => loadMoreComments(productId)}
          className="my-4 text-indigo-500"
        >
          Load More
        </button>
      )}

      {isLogedIn && (
        <form
          autoComplete="off"
          onSubmit={submitComment}
          className="input-field   flex items-end  gap-2"
        >
          <input
            ref={commentFeildRef}
            type="text"
            name="comment"
            placeholder="Enter your comment"
            className="mt-4 rounded-md border border-gray-300 px-2 py-1"
          />
          <button
            type="submit"
            className=" h-fit rounded  bg-indigo-500 px-2 py-1  text-white"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

CommentsWidget.propTypes = {
  productId: PropTypes.string,
};

export default CommentsWidget;
