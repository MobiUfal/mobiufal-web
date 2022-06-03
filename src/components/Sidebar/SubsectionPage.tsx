interface SubSectionPageProps {
    subSectionName: string;
    subSectionLink: string;
    isActive?: boolean;
}

export function SubsectionPage({
  subSectionName,
  subSectionLink,
  isActive,
}: SubSectionPageProps) {
    return (
        <div className="max-w-[172px] h-[25px] ml-[76px]">
            <a 
              className="text-[#29AAD7] text-base leading-4 font-normal hover:cursor-pointer"
              href={subSectionLink}
            >
                { subSectionName }
            </a>
        </div>
    )
}