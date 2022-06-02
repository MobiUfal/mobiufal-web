import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

type PathType = {
  pathName: string;
  link: string;

}

interface Props {
  paths: PathType[]
}

export const Breadcrumbs = ( { paths }: Props) => {
  return (
    <>
      <nav className="bg-grey-light rounded-md w-full">
        <ol className="list-reset flex">
          {paths && paths.map((path, i) => {
            return (
              <div className='flex' key={path.pathName}>

                <li><a href={path.link} className="text-blue-600 hover:text-blue-700">{path.pathName}</a></li>
                {i-1 < paths.length ? '' : (<li><span className="text-gray-500 mx-2">{">"}</span></li>)}
                
              </div>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

