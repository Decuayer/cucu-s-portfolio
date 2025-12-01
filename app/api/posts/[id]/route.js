import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function DELETE(req, { params }) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const postId = parseInt(id);

    await prisma.post.delete({
      where: { id:  postId },
    });

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await req.json();
        const { title, slug, content, imageUrl } = body;

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title,
                slug,
                content,
                imageUrl,
            },
        });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Error updating post" }, { status: 500 });
    }
}
