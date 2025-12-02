"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const EditPostForm = ({ post }) => {
  const router = useRouter();

  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [content, setContent] = useState(post.content);
  const [imageUrl, setImageUrl] = useState(post.imageUrl || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, imageUrl }),
      });

      if (res.ok) {
        toast.success("The article has been updated successfully!");
        router.refresh();
        router.push("/admin");
      } else {
        toast.error("Update failed.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg space-y-6 text-black"
    > 
      <div>
        <label className="block font-bold mb-2">Article Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-bold mb-2">URL (Slug)</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          required
        />
      </div>

      <div>
        <label className="block font-bold mb-2">Cover Image Link (Optional)</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="h-64 mb-12">
        <label className="block font-bold mb-2">Content</label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="h-48"
        />
      </div>

      <div className="pt-8">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
