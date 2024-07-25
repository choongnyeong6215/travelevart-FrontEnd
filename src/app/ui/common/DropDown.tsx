import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface IDropDownProps {
  toggleTitle: React.ReactNode | string; // react icons & text 모두 사용 가능
  openStatus?: boolean;
  contents: string[] | number[];
}

export default function DropDown({
  toggleTitle,
  openStatus = false,
  contents,
}: IDropDownProps) {
  const [isOpen, setIsOpen] = useState(openStatus);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOverlay = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) // Ref 영역 밖 부분
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOverlay);

    return () => {
      document.removeEventListener("mousedown", handleClickOverlay);
    };
  }, [dropdownRef]);

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="flex flex-col justify-center items-center mt-20 relative"
      ref={dropdownRef}
    >
      <button
        onClick={handleDropDown}
        className="bg-transparent border-none cursor-pointer outline-none "
      >
        {toggleTitle}
      </button>
      {isOpen && (
        <div
          className={`absolute top-8 p-2 w-32 bg-primary shadow-md rounded-xl flex justify-start items-center transition-all duration-100 ${
            isOpen ? "animate-fade-in" : "animate-fade-out"
          }`}
        >
          <ul className="w-full">
            {contents.map((content) => (
              <li
                key={content}
                className=" hover:bg-secondary rounded-xl py-2 cursor-pointer pl-2"
              >
                {/* 연동 이후 링크 재설정 필요 */}
                <Link href={`/`}>{content}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
