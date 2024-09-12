import React from 'react'
import { Button, Navbar } from "flowbite-react";
import { logo } from '../assets';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate()
    const [path , setPath] = useState('')
    const location = useLocation()
    const pointend = location.pathname.split('/')
    useEffect(()=>{setPath(pointend[pointend.length-1])} , [pointend])
  return (
    <Navbar fluid rounded className='border-2 bg-white/50 pb-2'>
    <Navbar.Brand>
        <Link to={'/'} className='flex' as='div'>
            <img src={logo} className="mr-3 h-9 rounded-lg sm:h-12" alt="Flowbite React Logo" />
            <span className="self-center whitespace-nowrap text-3xl font-serif font-bold  dark:text-white">AI<span className='px-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Generator</span></span>
        </Link>
      
    </Navbar.Brand>
    <div className="flex md:order-2">
        <Link to={path ? '/' : '/createPost'} as='div'>
            <Button outline gradientDuoTone="purpleToPink">
                {path ? 'Search Post' : 'Create New Post'}
            </Button>
        </Link>
        
    </div>
  </Navbar>
  )
}
