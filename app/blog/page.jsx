import prisma from "@/lib/prisma";
import BlogList from "@/components/BlogList";

export const dynamic = "force-dynamic";

const BlogPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  return (<BlogList posts={posts} />);
};

export default BlogPage;