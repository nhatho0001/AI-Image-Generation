import React , {useState , useEffect} from 'react'
import { ImSearch} from "react-icons/im";
import { TextInput } from 'flowbite-react';
import { Button } from 'flowbite-react';

export default function Home() {
  const [data , setData] = useState([]);
  const [resultData , setresultData] = useState([])
  const [searchText, setSearchText] = useState('');
  async function getData() {
    try {
      const response = await fetch('http://localhost:3000/api/v1/postRoutes' , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();
      if(response.ok && res.data){
        setData(res.data);
        setresultData(res.data)
      }
    } catch (error) {
      console.log('Get data fail')
    }
  }
  async function handSubmit(e){
    e.preventDefault();
    console.log(searchText)
    const searchResult = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
    setresultData(searchResult)
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <section className='max-w-7xl min-h-screen mx-auto'>
      <div className='flex flex-col al justify-center items-center pt-10 gap-5'>
          <h1 className='text-3xl font-inter w-[600px] font-bold text-center'>Feel free to explore Our AI Image Generation tech</h1>
          <form onSubmit={handSubmit} className='w-full md:w-1/2 relative'>
            <TextInput placeholder='Search...' type='text' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
            <Button type='submit' gradientMonochrome="purple" className='absolute top-0 end-0 h-full'>
              <ImSearch className='w-4 h-5'></ImSearch>
            </Button>
        </form>
        {resultData?<div className='grid grid-flow-row grid-cols-4 gap-4 h-[450px]'>
          {resultData.map((item , index) => {
            return <div className={index%5===0 ? 'row-span-2 col-span-2' : 'row-span-1 col-span-1'}><img className='w-full h-full' src={item.photo} alt="AI" /></div>
          })}
        </div> : undefined}
        
      </div>
      
    </section>
  )
}
