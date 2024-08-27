const articleSkeleton = [1,2,3,4,5,6];

const Articleloading = () => {
  return (
    <section className='fix-height container  w-full px-5 md:w-3/4 m-auto mt-8 animate-pulse'>
    <div className='bg-white p-7 rounded-lg ' >
      <h1 className='bg-gray-300 mb-2 h-6 rounded-lg'></h1>
      <div className='bg-gray-300 h-4 rounded-lg'></div>
      <p className='bg-gray-300 h-6 rounded-lg mt-5'></p>
    </div>

    <div className="mt-8">
      <div className="p-2 bg-gray-300 h-10 rounded-lg"></div>
      <button className="bg-gray-300 mt-2 p-1 h-8 w-20 rounded-lg"></button>
    </div>

  
    
    
  </section>
  )
}

export default Articleloading
