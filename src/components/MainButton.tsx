import React from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | "outline",
  className?: string,
  children: React.ReactNode,
  onClick?: () => void,
  up?: string
}

const MainButton = ({ onClick, variant = "primary", className, children, up }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`group lando-transition uppercase text-md w-fit h-fit py-[.4em] px-[.8em] rounded-md cursor-pointer flex flex-col gap-[1em] relative overflow-hidden whitespace-nowrap shadow-2xs
      hover:scale-103 active:scale-98 hover:shadow-none transition-all duration-300 cubic-bezier(0.65,-0.67,0.27,0.99);
      ${variant === "primary" && "bg-primary hover:bg-primary/90"}
      ${variant === "secondary" && "bg-primary-foreground hover:bg-primary-foreground/90"}
      ${variant === "outline" && typeof children === "string" && `border border-primary backdrop-blur-2xl hover:brightness-110`}
      text-white ` + className}
      >
        <span>
          { typeof children !== "string" ? children : Array.from(children).map((char, index) => (
              <span
                key={index}
                style={{ transitionDelay: `${index * 20}ms` }}
                className={`
                  inline-block
                  transition-all duration-300 cubic-bezier(0.65,-0.67,0.27,0.99);
                  translate-y-0
                  group-hover:-translate-y-[2em]
                  ${variant === "primary" && "text-primary-foreground"}
                  ${variant === "secondary" && "text-primary"}
                  ${variant === "outline" && "text-primary"}
                `}
              >
                {char === " " ? "\u00A0" : char}
              </span>
          )) }
        </span>

        { typeof children === "string" && (
          <span className="absolute top-full left-1/2 -translate-x-1/2 flex">
            {Array.from(children).map((char, index) => (
              <span
                key={index}
                style={{ transitionDelay: `${index * 20}ms` }}
                className={`
                  inline-block
                  transition-all duration-300 cubic-bezier(0.65,-0.67,0.27,0.99);
                  translate-y-0
                  ${up ? up : "group-hover:-translate-y-[2em]"}
                  ${variant === "primary" && "text-primary-foreground"}
                  ${variant === "secondary" && "text-primary"}
                  ${variant === "outline" && "text-primary"}
                `}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        ) }


    </button>
  )
}

export default MainButton