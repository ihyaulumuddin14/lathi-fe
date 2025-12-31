import React from 'react';

const Loader = ({
   className
} : {
   className?: string
}) => {
  return (
      <div className={`loader aspect-square w-[20px] border-2 border-muted-foreground ${className}`} />
  );
}
export default Loader;
