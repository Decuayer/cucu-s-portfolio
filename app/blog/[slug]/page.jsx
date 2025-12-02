import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogPostDetail from "@/components/BlogPostDetail"; // Yeni bileşeni çağırıyoruz

const BlogPostPage = async ({ params }) => {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }
  return <BlogPostDetail post={post} />;
};

export default BlogPostPage;