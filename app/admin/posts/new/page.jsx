"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const NewPostPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(generatedSlug);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, imageUrl }),
      });

      if (res.ok) {
        setMessage("Text added successfully! You are being redirected...");
        setTimeout(() => {
          router.push("/admin");
        }, 1500);
      } else {
        const data = await res.json();
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl text-black">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Write a New Article
        </h1>
        <Link href="/admin">
          <button
            type="button"
            className="flex items-center gap-2 font-medium text-white/60 hover:text-accent transition-colors"
          >
            <FaArrowLeft /> Cancel / Go Back
          </button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        {/* title */}
        <div>
          <label className="block font-bold mb-2">Article Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            placeholder="Exp: What is Next.js?"
          />
        </div>

        {/* Slug (URL) Alanı */}
        <div>
          <label className="block font-bold mb-2">
            URL (It occurs automatically)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500"
            required
          />
        </div>

        {/* cover image */}
        <div>
          <label className="block font-bold mb-2">
            Cover Image Link (Optional)
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {/* editor */}
        <div className="h-64 mb-12">
          <label className="block font-bold mb-2">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="h-48"
          />
        </div>

        {/* Mesaj ve Buton */}
        <div className="pt-8">
          {message && (
            <p
              className={`mb-4 p-2 rounded ${
                message.includes("Error")
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "..." : "Publish Article"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostPage;
