import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession();

    const body = await req.json();
    const { title, content, slug, imageUrl } = body;

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: "Title, content and URL (slug) required." },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        imageUrl,
        published: true,  
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Article save error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This URL (slug) address is using." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Server error occured." },
      { status: 500 }
    );
  }
}
