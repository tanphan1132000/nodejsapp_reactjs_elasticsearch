import { useEffect, useState } from 'react'
import axios from 'axios'
import Book from './Book'

const MainPage = () => {
  const [data, setData] = useState()

  useEffect(() => {
    axios.get('books')
      .then(res => {
        const d = res.data
        setData(d)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div className='flex flex-col p-10 gap-y-5 items-center'>
        <div className='flex h-40 w-5/6 rounded-xl bg-cover bg-[url(src/assets/adoptbanner.jpg)] p-5 justify-center items-center shadow-2xl'>
          <p className='text-6xl text-white font-bold font-mono shadow-3xl'>BOOKS STORE</p>
        </div>
        <div className='flex flex-wrap justify-center gap-5 text-sm'>
          {
            data?.map((book, id) => {
              return <Book key={id} book={book} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default MainPage;
