import React , {useState} from 'react'
import { TextInput , Label , Button} from 'flowbite-react'
import { preview } from '../assets';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

export default function CretaPost() {
  const navigate = useNavigate()
  const [form , setForm] = useState({
    author : '',
    prompt : '',
    pathImg : '',
  });
  const [loading, setLoading] = useState(false);
  const [isPost , setIsPost] = useState(false)
  function handChange(e){
    setForm(prevalue => { console.log(prevalue) ;
      return {...prevalue,
      [e.target.name] : e.target.value
    }})
  }
  async function handGeneratorImage(){
      setLoading(true)
      if(form.prompt){
      try {
        const response = await fetch('http://localhost:3000/api/v1/dalleRoutes', 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...form }),
          }
        )
        const res = await response.json();
        if(response.ok){
          setForm(prevalue => {
            return {...prevalue , pathImg : res.img}
          })
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }else{
      alert('Please enter prompt')
      setLoading(false)
    }
  }
  async function handSubmitPost() {
    if(!form.author || !form.pathImg || !form.prompt){
      alert('please all fields are necessary');
      return;
    }
    try {
      setIsPost(true)
      const response = await fetch('http://localhost:3000/api/v1/postRoutes',{
        method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
         body: JSON.stringify({ ...form }),
      })
      const res = await response.json();
      if(response.ok){
        navigate('/')
      }
      setLoading(false)
      setIsPost(false)
    } catch (error) {
      console.log(error)
      setIsPost(false)
    }
  }
  return (
      <div className='flex flex-col sm:flex-row pt-10 justify-center items-center gap-20'>
        <div className='flex-1 flex justify-center sm:justify-end'>
          <div>
            <h1 className=' text-2xl font-inter font-bold'>Generate Image with prompt</h1>
            <p>Write your prompt according to the image you want to generate</p>
            <div className='py-4'>
              <Label htmlFor='author' value='Author'></Label>
              <TextInput className='w-full' type="text" placeholder='Author' id ='author' name='author' onChange={handChange}/>
              <label for="prompt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
              <textarea id="prompt" rows="4" name='prompt' onChange={handChange} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your prompt here..."></textarea>
              <div className='flex gap-5 pt-4'>
                <Button gradientMonochrome="cyan" className='flex-1' onClick={handGeneratorImage}>{loading ? 'Loading...' : 'Generator Image'}</Button>
                <Button gradientMonochrome="pink" className='flex-1' onClick={handSubmitPost}>{isPost ? 'Loading' : 'Post Image'}</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className='flex-1 flex justify-center sm:justify-start'>
          <div className='min-w-[430px] min-h-[450px] border-dashed relative border-2 p-8 border-indigo-600'>
              <img className='w-[430px] h-[450px]' src={form.pathImg ? form.pathImg : preview} alt="" />
              {loading ? <div className = 'bg-zinc-300/[0.6] absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center'>
                  <Loader></Loader>
              </div> : undefined}
          </div>
        </div>
      </div>
  )
}
