import { ReactNode, useEffect, useState } from "react";

interface SectionPageProps {
    sectionName: string;
    iconLink: string;
    sectionLink: string;
    children?: ReactNode;
}

export function SectionPage({ 
  sectionName,
  iconLink,
  sectionLink,
  children
}: SectionPageProps) {
    const currentURL = window.location.href
    const [isActiveLink, setIsActiveLink] = useState<RegExpMatchArray | null>(null)

    useEffect(() => {
      const matches = currentURL.match(sectionLink)
      setIsActiveLink(matches) 
    }, [])

    return (
        <>
            <div className={`w-100 h-[60px] px-6  flex flex-row items-center
                              ${isActiveLink ? "bg-[#555555]" : "bg-transparent"}
                           `}>
                <img 
                  className="mr-7 w-9 h-9"
                  src={iconLink} 
                  alt="Logo da seção" 
                />

                <a 
                  className={`max-w-[145px] text-2xl leading-6 font-normal
                              ${isActiveLink ? "text-[#29AAD7] pointer-events-none" : "text-white hover:cursor-pointer hover:opacity-60 transition-opacity duration-300"}
                            `}
                  href={sectionLink} 
                >
                    {sectionName}
                </a>    
            </div>

            { children }
        </>
    )
}