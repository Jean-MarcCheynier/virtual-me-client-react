
import React from 'react';
import './typeWriter.scss';

export function TypeWriterContainer(props: any) {
  const { children, className } = props;
  return <div className={`type-writer-container ${className}`}>{children}</div>
}

export function TypeWriterBlock(props: any) {
  
  const { children, className } = props;
  
  return (<div className="wrapper text-left">
    <div className={`type-writer ${className}`}>
      {children}
    </div>
  </div>)
}