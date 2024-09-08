import axios from 'axios';
import { Article } from "@prisma/client";
import { DOMAIN } from '@/utils/constant';
import { SingleArticle } from '@/utils/types';



// Get all the articles 
export async function getArticles(pageNumber:string | undefined): Promise<Article[]>{
  try {
    const response = await axios.get(`${DOMAIN}/api/articles`,{
      params: { pageNumber:pageNumber },
    });
    
     return response.data;


  } catch (error) {
    throw new Error('Failed to fetch data in Article page');
  }
}

// get article count
export async function getArticlesCount() :Promise<number>{

    const response = await fetch(`${DOMAIN}/api/articles/count`);
    if(!response.ok){
      throw new Error('Failed to fetch article count');
    }
    const {count} = await response.json() as {count:number};
    return count;

}

// get Articles by search text
export async function getArticlesBySearchText(searchText:string ) : Promise<Article[]>{
  try {
    const response = await axios.get(`${DOMAIN}/api/articles/search`,{
      params: { searchText:searchText },
    });
    
     return response.data;
     
  } catch (error) {
    throw new Error('Failed to fetch data in Article page');
  }

}

// get single Article
export async function getSingleArticle(ArticleId:string): Promise<SingleArticle> {

  try {
    const response = await axios.get(`${DOMAIN}/api/articles/${ArticleId}`)
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch single article page');
  }

}

