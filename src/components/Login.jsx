import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {db} from '../firebase.config'
import { client } from '../client'
const Login = () => {
    const navigate = useNavigate()
    const onClickHandler = async () => {
        try{
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth,provider)
            const user = result.user

            console.log(user)

            const doc = {
                _id:user.uid,
                _type:'user',
                userName:user.displayName,
                image:user.photoURL
            }

            localStorage.setItem('user',JSON.stringify(doc))
            
            client.createIfNotExists(doc)
                .then(()=>{
                    navigate('/',{replace:true})
                })
        }catch(e){
            console.log(e)
        }
    }

    return (
    <div className='flex flex-col justify-start items-center h-screen'>
        <div className='relative w-full h-full'>
            <video 
                src={shareVideo}
                type="video/mp4"
                loop
                controls={false}
                muted
                autoPlay
                className="w-full h-full object-cover"
                />
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img src={logo} width="130px" alt="logo" />
                </div>
                <div className='shadow-2xl'>
                    <button
                        type="button"
                        className='bg-mainColor flex justify-center items-center p-3 rounded-lg outline-none'
                        onClick={()=>onClickHandler()}
                    >
                        <FcGoogle className='mr-4' />Sign in With Google
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login