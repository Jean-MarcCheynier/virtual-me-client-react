import React, { useState, useRef } from 'react';
import styles from "./level.module.scss"
import { FaStar, FaRegStar } from 'react-icons/fa';
import { LevelEnum } from '@virtual-me/virtual-me-ts-core'
import { Overlay, Tooltip } from 'react-bootstrap';

/** Hover component to display explanation about the levels */
export const HoverLevel: React.FC<{ hoverContent: JSX.Element | string, children: any }> = (props) => {
  const { hoverContent, children } = props;
  const [show, setShow] = useState(false);
  const target = useRef(null)

  const handleOnMouseLeave = () => {
    setShow(false);
  }
  const handleOnMouseEnter = () => {
    setShow(true);
  }

  return <>
    <span className={styles.levelHover} ref={target}
      onMouseLeave={handleOnMouseLeave}
      onMouseEnter={handleOnMouseEnter}>
      {children}
    </span>
    <Overlay target={target.current} show={show} placement="top">
      {(props) => (
        <Tooltip id="example" {...props}>
          {hoverContent}
        </Tooltip>
      )}
    </Overlay>
  </>
}

/** Star Level component */
export const Level: React.FC<{ level: LevelEnum }> = (props) => {
  const { level } = props;
  switch (level) {
    case LevelEnum.JUNIOR:
      return <span><FaStar /><FaRegStar /><FaRegStar /></span>
    case LevelEnum.MEDIOR:
      return <span><FaStar /><FaStar /><FaRegStar /></span>
    case LevelEnum.SENIOR:
      return <span><FaStar /><FaStar /><FaStar /></span>
    default:
      return <></>;
  }
}