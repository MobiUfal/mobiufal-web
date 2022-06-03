import { ReactNode } from "react";

interface SectionPageProps {
    sectionName: string;
    iconLink: string;
    sectionLink: string;
    isActive?: boolean;
    children?: ReactNode;
}

export function SectionPage({ 
  sectionName,
  iconLink,
  sectionLink,
  isActive,
  children
}: SectionPageProps) {
    return (
        <>
            <div className="w-100 h-[60px] px-6 bg-[#555555] flex flex-row items-center">
                <img 
                  className="mr-7 w-9 h-9"
                  src={iconLink} 
                  alt="Logo da seção" 
                />

                <a 
                  className="text-[#29AAD7] max-w-[145px] hover:cursor-pointer text-2xl leading-6 font-normal"
                  href={sectionLink} 
                >
                    {sectionName}
                </a>    
            </div>

            { children }
        </>
    )
}