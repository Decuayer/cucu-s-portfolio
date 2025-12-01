import prisma from "@/lib/prisma";
import EditPostForm from "@/components/EditPostForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const EditPage = async ({ params }) => {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      imageUrl: true,
    }
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8 text-white">Edit Article</h1>

        <Link href="/admin">
          <button
            type="button"
            className="flex items-center gap-2 font-medium text-white/60 hover:text-accent transition-colors"
          >
            <FaArrowLeft /> Cancel / Go Back
          </button>
        </Link>
      </div>
      {/* Veriyi forma gönderiyoruz */}
      <EditPostForm post={post} />
    </div>
  );
};

export default EditPage;
