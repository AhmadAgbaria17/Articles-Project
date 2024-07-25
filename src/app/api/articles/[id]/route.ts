import {NextRequest,NextResponse} from 'next/server';
import {articles} from '@/utils/data';
import {UpdateArticleDto} from '@/utils/dtos';

interface Props{
  params: { id: string}
}


/**
 * @method GET
 * @route ~/api/articles/:id
 * @description Get one Article By ID
 * @access public
 */

export function GET(request: NextRequest, {params}: Props){
  const article = articles.find(a => a.id === parseInt(params.id))
  if(!article){
    return NextResponse.json({message:"article not found"},{status:404})
  }
  return NextResponse.json(article,{status:200})
} 


/**
 * @method PUT
 * @route ~/api/articles/:id
 * @description Update one Article By ID
 * @access public
 */

export async function PUT(request: NextRequest, {params}: Props){
  const article = articles.find(a => a.id === parseInt(params.id))
  if(!article){
    return NextResponse.json({message:"article not found"},{status:404})
  }

  const body = await request.json() as UpdateArticleDto;
  console.log(body);


  return NextResponse.json({message:"article updated" },{status:200})
} 


/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @description Delete one Article By ID
 * @access public
 */

export function DELETE(request: NextRequest, {params}: Props){
  const article = articles.find(a => a.id === parseInt(params.id))
  if(!article){
    return NextResponse.json({message:"article not found"},{status:404})
  }


  return NextResponse.json({message:"article deleted" },{status:200})
} 

