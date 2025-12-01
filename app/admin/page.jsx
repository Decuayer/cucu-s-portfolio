import Link from "next/link";
import prisma from "@/lib/prisma";

import PostActions from "@/components/PostActions";

import { motion } from "framer-motion";

const AdminPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="py-6">
      <div className="container mx-auto">
        <div className="flex flex-col gap-3[30px] p-10 w-full bg-[#27272c] rounded-xl">
          {/* Üst Kısım: Başlık ve Ekle Butonu */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
            <Link href="/admin/posts/new">
              <button className="bg-accent hover:bg-accent-hover text-primary font-bold py-3 px-6 rounded-xl transition-all">
                + New Article Add
              </button>
            </Link>
          </div>

          {/* İstatistik Kartları (Şimdilik Basit) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-primary p-6 rounded-lg text-white">
              <h3 className="text-lg font-medium text-white/80">Total Article</h3>
              <p className="text-4xl font-bold mt-2">{posts.length}</p>
            </div>
            {/* İleride Projeler vs. buraya eklenebilir */}
          </div>

          {/* Blog Yazıları Listesi */}
          <div className="bg-primary rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 border-b bg-primary flex justify-between items-center">
              <h3 className="font-bold text-white/80">Last Articles</h3>
            </div>

            {posts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No articles have been added yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white/80 text-sm uppercase">
                    <th className="p-4 border-b">Title</th>
                    <th className="p-4 border-b">URL (Slug)</th>
                    <th className="p-4 border-b">Date</th>
                    <th className="p-4 border-b text-right">Transactions</th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-accent hover:text-primary border-b last:border-0"
                    >
                      <td className="p-4 font-medium">{post.title}</td>
                      <td className="p-4 text-sm">
                        /{post.slug}
                      </td>
                      <td className="p-4 text-sm">
                        {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="p-4 text-right">
                        <PostActions id={post.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
