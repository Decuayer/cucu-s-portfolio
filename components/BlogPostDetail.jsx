"use client";

import Link from "next/link";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import Image from "next/image";

import { motion } from "framer-motion";

const BlogPostDetail = ({ post }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-12 xl:py-24"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* back btn */}
        <Link href="/blog">
          <button className="flex items-center gap-2 text-accent mb-8 hover:text-white transition-colors">
            <FaArrowLeft /> Back to Blog
          </button>
        </Link>

        {/* title and meta */}
        <div className="mb-8 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-white/60">
            <FaCalendar className="text-accent" />
            <span>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* photo (optional) */}
        {post.imageUrl && (
          <div className="w-full h-[400px] md:h-[500px] mb-10 rounded-xl overflow-hidden bg-gray-800 relative">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* content */}
        <article
          className="prose prose-invert lg:prose-xl max-w-none 
          prose-headings:text-accent prose-a:text-blue-400 hover:prose-a:text-blue-300
          prose-img:rounded-xl prose-img:shadow-lg"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </motion.section>
  );
};

export default BlogPostDetail;
