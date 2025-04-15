import style from "./WallCom.module.css"
import { useEffect, useRef, useState } from "react"

const WallCom = ({ leftBarRef, messageAreaRef }) => {
  const isDragging = useRef(false);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      const newLeftWidth = e.clientX;
      if (newLeftWidth > 150 && newLeftWidth < 400) {
        leftBarRef.current.style.flex = `0 0 ${newLeftWidth}px`
        messageAreaRef.current.style.flex = `1`
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  }, [leftBarRef, messageAreaRef])
  return (
    <div
      className={style["wall"]}
      onMouseDown={() => isDragging.current = true}
    >
    </div>
  )
}

export default WallCom