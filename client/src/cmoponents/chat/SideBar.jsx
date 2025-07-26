import { useEffect, useRef, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import axios from "axios";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa6";
import { BeatLoader } from "react-spinners"
import { FaDownload } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";

export const Sidebar = ({ onChatSelect }) => {
    const [chats, setChats] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [menuOpenId, setMenuOpenId] = useState(null);
    const [renamingId, setRenamingId] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [loadingChatId, setLoadingChatId] = useState(null);
    const [creating, setCreating] = useState(false);

    const menuRef = useRef(null);

    const fetchChats = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/chat/all", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });
            setChats(res.data.userChats || []);
        } catch (error) {
            console.error("Failed to fetch chats:", error);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    const handleNewChat = async () => {
        try {
            setCreating(true);
            const res = await axios.post(
                "http://localhost:3000/api/v1/transcript/create",
                { videoUrl },
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.getItem("token"),
                    },
                }
            );

            const newChat = res.data.chat;
            setVideoUrl("");
            setShowModal(false);
            fetchChats();

            if (onChatSelect) {
                onChatSelect(newChat._id);
            }
        } catch (err) {
            console.error("Error creating chat:", err);
        } finally {
            setCreating(false)
        }
    };


    const handleDelete = async (chatId) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/chat/delete/${chatId}`,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            fetchChats();
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    };

    const handelRename = (chat) => {
        setRenamingId(chat._id);
        setNewTitle(chat.videoTitle);
        setMenuOpenId(null);
    };

    const submitRename = async () => {
        if (!newTitle.trim()) return;
        try {
            await axios.put(
                `http://localhost:3000/api/v1/chat/rename/${renamingId}`,
                { videoTitle: newTitle },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            );
            setRenamingId(null);
            setNewTitle("");
            fetchChats();
        } catch (error) {
            console.error("Error renaming chat:", error);
        }
    };

    const handleSummaryDownload = async (chatId) => {
        try {
            setLoadingChatId(chatId); // set loading state for this chatId

            const res = await axios.get(
                `http://localhost:3000/api/v1/transcript/summarize/${chatId}`,
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                    responseType: "blob",
                }
            );

            const blob = new Blob([res.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "summary.pdf";
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            link.remove();
        } catch (error) {
            console.error("Error downloading summary:", error);
        } finally {
            setLoadingChatId(null); // reset loading state
        }
    };


    useEffect(() => {
        const handleClickOutside = (e) => {
            // If the click is not on a 3-dot button or inside a menu, close it
            if (!e.target.closest(".chat-menu-button") && !e.target.closest(".chat-menu-dropdown")) {
                setMenuOpenId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div className="pt-15 px-3 h-dvh overflow-y-auto text-white">
            {/* New Chat Button */}
            <button
                onClick={() => setShowModal(true)}
                className="flex gap-3 text-sm rounded-xl hover:bg-[#2a2a2a] w-full items-center py-2 px-4 cursor-pointer"
            >
                <FaPenToSquare />
                New Chat
            </button>

            {/* Chat List */}
            <div className="px-1 border-t border-white/10 mt-4 pt-2">
                <p className="text-white/60 mb-2 px-2 font-light">Chats</p>
                <div className="flex flex-col gap-2">
                    {chats.length === 0 ? (
                        <p className="text-xs text-white/30 italic">No chats found</p>
                    ) : (
                        chats.map((chat) => (
                            <div
                                key={chat._id}
                                onClick={() => onChatSelect(chat._id)}
                                className="relative group text-sm hover:bg-[#2a2a2a] px-2 py-2 rounded-lg cursor-pointer flex justify-between items-center"
                            >
                                {renamingId === chat._id ? (
                                    <input
                                        autoFocus
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        onBlur={submitRename}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") submitRename();
                                            if (e.key === "Escape") {
                                                setRenamingId(null);
                                                setNewTitle("");
                                            }
                                        }}
                                        className="w-full bg-transparent border border-white/20 text-white px-2 py-1 rounded-md text-sm"
                                    />
                                ) : (
                                    <span className="truncate max-w-[80%]">{chat.videoTitle}</span>
                                )}

                                {/* 3-dot menu */}
                                <div className="relative" ref={menuRef}>
                                    {/* Button to open menu */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMenuOpenId(menuOpenId === chat._id ? null : chat._id);
                                        }}
                                        className="hover:text-white/80 flex chat-menu-button"
                                    >
                                        <HiOutlineDotsHorizontal className="cursor-pointer" size={20} />
                                    </button>


                                    {menuOpenId === chat._id && (
                                        <div className="absolute right-0 top-6 bg-[#2a2a2a] border border-white/10 rounded-xl p-1 shadow-lg z-20 w-40 text-sm chat-menu-dropdown">
                                            {/*rename*/}
                                            <button
                                                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#3a3a3a]"
                                                onClick={() => handelRename(chat)}
                                            >
                                                <FaPen />Rename
                                            </button>

                                            {/*summary*/}
                                            <button
                                                className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg hover:bg-[#3a3a3a]"
                                                onClick={() => handleSummaryDownload(chat._id)}
                                            >
                                                {loadingChatId === chat._id ? (
                                                    <span className="flex items-center gap-1">
                                                        <BeatLoader color="white" size={5} speedMultiplier={0.5} />
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1">
                                                        <FaRegFilePdf size={17} />
                                                        Summary
                                                    </span>
                                                )}
                                            </button>

                                            {/*convo download*/}
                                            <button className="w-full flex items-center gap-2 text-left pl-3 pr-2 py-2 rounded-lg hover:bg-[#3a3a3a]">
                                                <FaDownload size={17} />Download Chat
                                            </button>

                                            {/*share chat*/}
                                            <button className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg hover:bg-[#3a3a3a]">
                                                <FaShare size={17} /> Share Chat
                                            </button>

                                            {/*delete*/}
                                            <button
                                                className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg hover:bg-red-600/15 text-red-400"
                                                onClick={() => handleDelete(chat._id)}
                                            >
                                                <RiDeleteBin6Line size={17} />Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
                    <div className="bg-[#1a1a1a] p-6 rounded-xl w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold text-white mb-4">
                            Enter YouTube Video URL
                        </h2>
                        <input
                            type="text"
                            className="w-full p-2 rounded-lg bg-[#2a2a2a] text-white mb-4"
                            placeholder="https://youtube.com/watch?v=..."
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                                onClick={handleNewChat}
                                disabled={creating}
                            >
                                {creating ? "Creating..." : "Start Chat"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
