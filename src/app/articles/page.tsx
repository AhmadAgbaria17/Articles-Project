import ArticleItem from "@/components/articles/ArticleItem";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import Pagination from "@/components/articles/Pagination";
import { Metadata } from "next";
import { Article } from "@prisma/client";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import { ArticlePerPage } from "@/utils/constant";

interface ArticlesPageProps{
  searchParams: {pageNumber:string}
}



const ArticlePage = async ({searchParams}:ArticlesPageProps) => {

  const {pageNumber}= searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  const count:number = await getArticlesCount();
  const pages = Math.ceil(count / ArticlePerPage);
  

  return (
    <section className="fix-height container m-auto px-5">
      <SearchArticleInput/>
      <div className="flex items-center justify-center flex-wrap gap-7">
      {articles.map(item => (
        <ArticleItem article={item} key={item.id}/>
      ))}
    
      </div>

      <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages}/>
    </section>
  )
}

export default ArticlePage


export const metadata: Metadata = {
  title: "Article Page",
  description: "this is Article Page",
};
