import Dotdotdot from 'react-dotdotdot';

const BookInfor = ({ style, book, children, isFullDescription }) => {
    return (
        <>
            <div className={style}>
                <div className="flex max-[620px]:justify-center">
                    <img className='h-32 w-40 max-[620px]:w-32' src='src/assets/book.png' />
                </div>
                <div className='flex flex-col w-4/5 max-[860px]:w-full'>
                    <h1 className='text-lg font-semibold'>{book.title}</h1>
                    <h2 className='text-base italic mb-2'>{book.author}</h2>
                    <div className='flex flex-row flex-wrap gap-x-4 gap-y-2'>
                        <p className='font-semibold'>Publish date: {book.publishedDate}</p>
                        <p className='font-semibold'>Price: <span className='text-lime-600 font-semibold'>{book.price}$</span></p>
                    </div>
                    {
                        isFullDescription ?
                            <Dotdotdot clamp={2}>
                                <p><span className='font-semibold'>Description: </span>{book.description}</p>
                            </Dotdotdot> : <p><span className='font-semibold'>Description: </span>{book.description}</p>
                    }
                    <div className='flex max-[620px]:justify-center'>
                      {children}  
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default BookInfor;