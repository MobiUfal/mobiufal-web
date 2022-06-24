import { useEffect, useState } from "react";

interface SubSectionPageProps {
    subSectionName: string;
    subSectionLink: string;
}

export function SubsectionPage({
  subSectionName,
  subSectionLink,
}: SubSectionPageProps) {
    const currentURL = window.location.href
    const [isActiveLink, setIsActiveLink] = useState<RegExpMatchArray | null>(null)

    useEffect(() => {
        const matches = currentURL.match(subSectionLink)
        setIsActiveLink(matches) 
    }, [])
    
    return (
        <div className="max-w-[172px] h-[25px] ml-[76px]">
            <a 
              className={`text-base leading-4 font-normal 
                            ${isActiveLink ? 'text-[#29AAD7] pointer-events-none' : 'text-white hover:cursor-pointer hover:opacity-60 transition-opacity duration-300 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-white'}
                        `}
              href={subSectionLink}
            >
                { subSectionName }
            </a>
        </div>
    )
}