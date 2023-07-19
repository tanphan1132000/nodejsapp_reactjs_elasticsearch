import { useRef, useState } from "react";
import NestedComment from "./NestedComment";
import Button from "./Button";

const Comment = ({ comment, addReply, updateComment, deleteComment, updateReply, deleteReply }) => {
    const [isReply, setIsReply] = useState(false)
    const [isChange, setIsChange] = useState(false)
    const replyInput = useRef(null)
    const changeInput = useRef(null)

    const ID = Object.keys(comment)[0];

    const AddReply = (e, id, text) => {
        if (e.key === 'Enter') {
            addReply(id, text);
            replyInput.current.value = '';
            setIsReply(!isReply);
        }
    }

    const UpdateComment = (e, id, text) => {
        if (e.key === 'Enter') {
            updateComment(id, text);
            changeInput.current.value = '';
            setIsChange(!isChange);
        }
    }

    const DeleteComment = (id) => {
        deleteComment(id);
    }

    const buttonStyle = "w-fit";
    
    return (
        <>
            <div className="flex flex-col">
                <div className="max-w-sm mt-2">
                    <p className="break-all bg-slate-200 rounded-lg p-2">{comment[ID]}</p>
                    {
                        isChange ?
                            <>
                                <input 
                                    ref={changeInput}
                                    className="border-b-2 w-full mt-2 focus:border-slate-300 focus:outline-none"
                                    placeholder="Change comment..."
                                    onKeyDown={(e) => UpdateComment(e, ID, changeInput?.current?.value)}
                                />
                            </> : null
                    }
                    <div className="flex justify-end space-x-4">
                        <Button func={() => setIsChange(!isChange)} style={buttonStyle}>
                            <p className="font-semibold text-xs text-slate-500">Modify</p>
                        </Button>
                        <Button func={() => setIsReply(!isReply)} style={buttonStyle}>
                            <p className="font-semibold text-xs text-slate-500">Reply</p>
                        </Button>
                        <Button func={() => DeleteComment(ID)} style={buttonStyle}>
                            <p className="font-semibold text-xs text-slate-500">Delete</p>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col">
                    {
                        isReply ? <div className="max-w-sm mt-2 ml-14">
                            <input
                                ref={replyInput}
                                className="w-full border-b-2 focus:border-slate-300 focus:outline-none"
                                placeholder="Reply something..."
                                onKeyDown={(e) => AddReply(e, ID, replyInput?.current?.value)}
                            />
                        </div> : null
                    }
                    <div>
                        {
                            Object.keys(comment.replies).map(replyID => {
                                return (
                                    <NestedComment
                                        key={replyID}
                                        rootID={ID}
                                        replyID={replyID}
                                        reply={comment.replies[replyID]}
                                        updateReply={updateReply}
                                        deleteReply={deleteReply}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Comment;