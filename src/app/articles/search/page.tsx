import { getArticlesBySearchText } from "@/apiCalls/articleApiCall"
import { Article } from "@prisma/client"
import ArticleItem from "@/components/articles/ArticleItem"
import Link from "next/link"

interface SearchArticlePageProps{
  searchParams: {searchText : string}
}

const SearchArticlePage = async ({searchParams:{searchText}}:SearchArticlePageProps) => {

  const articles: Article[] = await getArticlesBySearchText(searchText);
  
  return (
    <section className='fix-height container m-auto px-5'>
    {articles.length === 0 ? (
  <div>
        <h2 className="text-gray-800 text-2xl font-bold p-5">
          Article Based on 
          <span className="text-red-500 mx-1">{ searchText }</span>
          not Found
        </h2>
        <Link className="p-2 border-2 ml-3 bg-gray-200 rounded-lg font-bold" href={"http://localhost:3000/articles?pageNumber=1"}>
          back to Articles
        </Link>
  </div>
    ) : (
      <div>
        <h1 className='text-2xl font-bold mb-2 mt-7 text-gray-800'>
        Articles based on
        <span className="ms-1 text-green-700 text-3xl font-bold">{searchText}</span>
      </h1>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map(item =>(
          <ArticleItem key={item.id} article={item} />
        ))}
      </div>
      </div>
    )}
      </section>
  )
}

export default SearchArticlePage
