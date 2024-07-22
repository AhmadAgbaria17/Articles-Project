import ArticleItem from "@/components/articles/ArticleItem";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import Pagination from "@/components/articles/Pagination";
import { Article } from "@/utils/types";
import { Metadata } from "next";
import { resolve } from "path";



const ArticlePage = async () => {

  await new Promise ((resolve)=> setTimeout(resolve,2000));
  
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
  ); 
  
  if(!response.ok){
    throw new Error("Failed to fetch data in Article page");
  }

  const articles: Article[] = await response.json();
  return (
    <section className="fix-height container m-auto px-5">
      <SearchArticleInput/>

      <div className="flex items-center justify-center flex-wrap gap-7">
      {articles.slice(0,6).map(item => (
        <ArticleItem article={item} key={item.id}/>
      ))}
      </div>

      <Pagination/>
      
    </section>
  )
}

export default ArticlePage


export const metadata: Metadata = {
  title: "Article Page",
  description: "this is Article Page",
};
