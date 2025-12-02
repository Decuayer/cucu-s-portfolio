"use client";

import Link from "next/link";
import Image from "next/image";
import { FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";

const BlogList = ({ posts }) => {
  if (posts.length === 0) {
    return <p className="text-center text-white/60">No articles found.</p>;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] py-12 xl:py-24"
    >
      <div className="container mx-auto">
        <h2 className="h2 mb-12 text-center">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group">
                <article className="bg-[#27272c] rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-accent/20 border border-transparent hover:border-accent/50">
                  {/* photo */}
                  <div className="h-48 w-full bg-primary/50 relative overflow-hidden">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>

                  {/* content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-accent text-sm mb-3">
                      <FaCalendar />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold leading-tight mb-4 text-white group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    <span className="mt-auto text-white/60 text-sm group-hover:text-white transition-colors">
                      Read More →
                    </span>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BlogList;
