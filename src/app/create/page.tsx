'use client'

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { v4 as uuid } from 'uuid'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export default function Create() {
  const { register, handleSubmit } = useForm()
  const userFriendlyAddress = useTonAddress();

  async function onSubmit(data, e) {
    e.preventDefault()
    const formData = new FormData()
    const filename = `${uuid()}.png`
    formData.append(filename, data.picture[0])

    const fileUrl = `https://filebin.net/tonbootcamp/${filename}`
    const resp = await fetch(fileUrl, {
      method: 'POST',
      body: formData,
    })
    const json = await resp.json()
    console.log(data, json)

    const upload = await fetch(`https://api.jsonbin.io/v3/b/64f14f498d92e126ae658a93`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        work: data.work,
        imageUrl: fileUrl 
      })
    })
    const uploadedJson = await upload.json()
    console.log(uploadedJson)

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-telegram-black">New Card</h2>
          <p className="mt-1 text-sm leading-6 text-telegram-black">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-telegram-black">
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-telegram-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="John Smith"
                    {...register('name')}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="work" className="block text-sm font-medium leading-6 text-telegram-black">
                Work
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                  <input
                    type="text"
                    id="work"
                    autoComplete="work"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-telegram-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="CEO @ SpaceX, Founder @ Nasa"
                    {...register('work')}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-telegram-black">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md flex-1 border-0 bg-transparent py-1.5 pl-1 text-telegram-black placeholder:text-gray-400 sm:text-sm sm:leading-6 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  defaultValue={''}
                  {...register('description')}
                  
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-telegram-black">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-telegram-black">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-telegram-black" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-telegram-white px-2.5 py-1.5 text-sm font-semibold text-telegram-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <input type="file" {...register('picture')}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link href="/">
        <button type="button" className="text-sm font-semibold leading-6 text-telegram-black">
          Cancel
        </button>
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
