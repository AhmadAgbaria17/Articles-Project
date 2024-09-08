import { NextRequest, NextResponse } from "next/server";
import { createArticleSchema } from "@/utils/validationSchemas";
import { CreateArticleDto } from "@/utils/dtos";
import { Article } from "@prisma/client";
import prisma from '@/utils/db';
import { ArticlePerPage } from "@/utils/constant";
import { verifyToken } from "@/utils/verifyToken";


/**
 * @method GET
 * @route ~/api/articles?pageNumber
 * @description Get Articles By Page number
 * @access public
 */

export async function GET(request: NextRequest) {
  try {
    const pageNumber= request.nextUrl.searchParams.get("pageNumber") || "1";
    const articles = await prisma.article.findMany({
      skip: ArticlePerPage *(parseInt(pageNumber) - 1),
      take:  ArticlePerPage,
      orderBy:{createdAt: 'desc'},
    });
    return NextResponse.json(articles, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @description create new article
 * @access private (only admin)
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json({message:"only Admin can create article"},{status:403})
    }
    const body = (await request.json()) as CreateArticleDto;

    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch(error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
