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
  children,
}: SectionPageProps) {
  const currentURL = window.location.href;
  const [isActiveLink, setIsActiveLink] = useState<RegExpMatchArray | null>(
    null
  );

  useEffect(() => {
    const matches = currentURL.match(sectionLink);
    setIsActiveLink(matches);
  }, []);

  return (
    <>
      <div
        className={`w-100 h-[60px] px-6 flex flex-row 
          ${isActiveLink ? "bg-[#555555]" : "bg-transparent"}
        `}
      > 
        
        <a
          className={`min-w-[180px] text-md leading-6 font-normal flex flex-row items-center
          ${
            isActiveLink
            ? "text-[#29AAD7] pointer-events-none"
            : "text-white hover:cursor-pointer hover:opacity-60 transition-opacity duration-300 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-white"
          }
          `}
          href={sectionLink}
        > 
          <Icon
            size={32}
            className={`mr-7 ${isActiveLink ? "text-[#29AAD7]" : "text-white"}`}
          />       
          {sectionName}
        </a>
      </div>

      {children}
    </>
  );
}
