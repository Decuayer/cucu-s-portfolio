"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const PostActions = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (toastId) => {
    toast.dismiss(toastId);
    
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Article deleted!");
        router.refresh();
      } else {
        toast.error("Deletion failed.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2 items-center">
          <span className="font-bold text-sm">
            Are you sure you want to delete?
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleDelete(t.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 4000,
        style: {
          border: "1px solid #ef4444",
          padding: "16px",
          color: "#333",
        },
      }
    );
  };

  return (
    <div className="flex gap-4 justify-end">
      <Link href={`/admin/posts/${id}/edit`}>
        <button className="text-blue-500 hover:text-blue-400 text-sm font-bold transition-all">
          Edit
        </button>
      </Link>

      <button
        onClick={confirmDelete}
        disabled={loading}
        className="text-red-500 hover:text-red-400 text-sm font-bold transition-all disabled:opacity-50"
      >
        {loading ? "..." : "Delete"}
      </button>
    </div>
  );
};

export default PostActions;
