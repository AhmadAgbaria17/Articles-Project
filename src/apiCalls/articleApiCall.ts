import axios from 'axios';
import { Article } from "@prisma/client";



export async function getArticles(pageNumber:string | undefined): Promise<Article[]>{
  try {
    const response = await axios.get('http://localhost:3000/api/articles',{
      params: { pageNumber:pageNumber },
    });
    
     return response.data;


  } catch (error) {
    throw new Error('Failed to fetch data in Article page');
  }
}


export async function getArticlesCount() :Promise<number>{

    const response = await fetch('http://localhost:3000/api/articles/count');
    if(!response.ok){
      throw new Error('Failed to fetch article count');
    }
    const {count} = await response.json() as {count:number};
    return count;

}


export async function getArticlesBySearchText(searchText:string) : Promise<Article[]>{
  try {
    const response = await axios.get('http://localhost:3000/api/articles/search',{
      params: { searchText:searchText },
    });
    
     return response.data;
     
  } catch (error) {
    throw new Error('Failed to fetch data in Article page');
  }

}

