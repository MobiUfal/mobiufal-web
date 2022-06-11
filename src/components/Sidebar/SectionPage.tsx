import { ComponentType, ReactNode, useEffect, useState } from "react";
import { IconBaseProps } from "react-icons";

interface SectionPageProps {
    sectionName: string;
    Icon: ComponentType<IconBaseProps>;
    sectionLink: string;
    children?: ReactNode;
}

export function SectionPage({ 
  sectionName,
  Icon,
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
                <Icon
                  className={`mr-7 w-9 h-9
                              ${isActiveLink ? "text-[#29AAD7]" : "text-white"}
                            `}
                />

                <a 
                  className={`max-w-[145px] text-2xl leading-6 font-normal
                              ${isActiveLink ? "text-[#29AAD7] pointer-events-none" : "text-white hover:cursor-pointer hover:opacity-60 transition-opacity duration-300 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-white"}
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