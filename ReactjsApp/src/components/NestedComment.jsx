import { useRef, useState } from "react";
import Button from "./Button";


const NestedComment = ({ rootID, replyID, reply, updateReply, deleteReply }) => {
    const [isChange, setIsChange] = useState(false)
    const changeInput = useRef(null)

    const ID = replyID;
    const RootID = rootID;

    const UpdateReply = (e, rootID, id, text) => {
        if (e.key === 'Enter') {
            updateReply(rootID, id, text);
            changeInput.current.value = '';
            setIsChange(!isChange);
        }

    }

    const DeleteReply = (rootID, id) => {
        deleteReply(rootID, id);
    }

    const buttonStyle = "w-fit";

    return (
        <>
            <div className="max-w-sm mt-2 ml-14">
                <div>
                    <p className="break-all bg-slate-200 rounded-lg p-2">{reply}</p>
                    {
                        isChange ?
                            <>
                                <input
                                    ref={changeInput}
                                    className="border-b-2 w-full mt-2 focus:border-slate-300 focus:outline-none"
                                    placeholder="Change comment..."
                                    onKeyDown={(e) => UpdateReply(e, RootID, ID, changeInput?.current?.value)}
                                />
                            </> : null
                    }
                </div>
                <div className="flex justify-end space-x-4">
                    <Button func={() => setIsChange(!isChange)} style={buttonStyle}>
                        <p className="font-semibold text-xs text-slate-500">Modify</p>
                    </Button>
                    <Button func={() => DeleteReply(RootID, ID)} style={buttonStyle}>
                        <p className="font-semibold text-xs text-slate-500">Delete</p>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default NestedComment;