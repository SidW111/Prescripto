import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import {toast} from 'react-toastify'
import axios from "axios"

const AddDoctor = () => {

  const [docImg,setDocImg] = useState(false);
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [experience,setExperience] = useState('1 Year')
  const [fees,setFees] = useState('')
  const [about,setAbout] = useState('')
  const [speciality,setSpeciality] = useState('General physician')
  const [degree,setDegree] = useState('')
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')


  const {backendUrl , aToken} = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if(!docImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',fees)
      formData.append('degree',degree)
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))

      //console log form data 
      formData.forEach((value,key)=>{
        console.log(`${key} : ${value}`);
      })
      
      const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData, {headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setFees('')
        setDegree('')
        setAbout('')
        
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full '>
      <p className=' mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-auto'>
  {/* Header Section */}
  <div className='flex items-center gap-4 mb-6 text-gray-500'>
    <label htmlFor="doc-img">
      <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload" />
    </label>
    <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
    <p>Upload doctor <br /> picture</p>
  </div>

  {/* Form Fields Section */}
  <div className='flex flex-col lg:flex-row gap-6 mb-6 text-gray-600'>
    {/* Left Column */}
    <div className='flex lg:flex-1 flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <p>Doctor Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
      </div>

      <div className='flex flex-col gap-2'>
        <p>Doctor Email</p>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
      </div>

      <div className='flex flex-col gap-2'>
        <p>Doctor Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
      </div>

      <div className='flex flex-col gap-2'>
        <p>Experience</p>
        <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2'>
          <option value="1 year">1 Year</option>
          <option value="2 year">2 Years</option>
          <option value="3 year">3 Years</option>
          <option value="4 year">4 Years</option>
          <option value="5 year">5 Years</option>
          <option value="6 year">6 Years</option>
          <option value="7 year">7 Years</option>
          <option value="8 year">8 Years</option>
          <option value="9 year">9 Years</option>
          <option value="10 year">10 Years</option>
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <p>Fees</p>
        <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Fees' required />
      </div>
    </div>

    {/* Right Column */}
    <div className='flex lg:flex-1 flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <p>Speciality</p>
        <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2'>
          <option value="General Physician">General Physician</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatricians">Pediatricians</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Gastroenterologist">Gastroenterologist</option>
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <p>Education</p>
        <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
      </div>

      <div className='flex flex-col gap-2'>
        <p>Address</p>
        <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2 mb-2' type="text" placeholder="Address 1" required />
        <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder="Address 2" required />
      </div>
    </div>
  </div>

  {/* About Doctor Section */}
  <div className='flex flex-col gap-2 mb-6'>
    <p>About Doctor</p>
    <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full py-2 border rounded' placeholder='Write about doctor' rows={5} required></textarea>
  </div>

  {/* Submit Button */}
  <button type='submit' className='bg-primary px-10 py-3 text-white rounded-full'>Add Doctor</button>
</div>

    </form>
  )
}

export default AddDoctor