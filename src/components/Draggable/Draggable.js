import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { findIndex } from "./find-index";
import move from "array-move";
import { MdClose } from "react-icons/md";
import DeleteModal from "../Modals/DeleteModal";

export const Draggable = ({
  tabRef,
  setPosition,
  moveItem,
  i,
  tab,
  changeTab,
  setShowRemoveIcon,
  removeTab,
  showRemoveIcon,
  activeElement,
}) => {
  const [isDragging, setDragging] = useState(false);
  const [showDeleteAlert, setshowDeleteAlert] = useState(false);
  const dragOriginX = useMotionValue(0);

  useEffect(() => {
    setPosition(i, {
      height: tabRef.current?.offsetHeight,
      top: tabRef.current?.offsetTop,
    });
  });

  return (
    <>
      <motion.li
        ref={tabRef}
        initial={false}
        // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
        animate={isDragging ? onTop : flat}
        // style={{ height: heights[color] }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 1.12 }}
        drag="x"
        dragOriginX={dragOriginX}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onDrag={(e, { point }) => moveItem(i, point.x)}
        positionTransition={({ delta }) => {
          if (isDragging) {
            dragOriginX.set(dragOriginX.get() + delta.x);
          }
          return !isDragging;
        }}
        className={`${i == activeElement ? "active-tab" : ""}`}
        onClick={(e) => changeTab(i, e)}
        onMouseEnter={() => setShowRemoveIcon(tab.key)}
        onMouseLeave={() => setShowRemoveIcon("")}
      >
        <p className="cursor">{tab.name}</p>
        {i > 2 && showRemoveIcon == tab.key && (
          <MdClose onClick={() => setshowDeleteAlert(true)} />
        )}
      </motion.li>
      {showDeleteAlert && (
        <DeleteModal
          onCancel={() => setshowDeleteAlert(false)}
          onDelete={(e) => removeTab(tab, i, e)}
        />
      )}
    </>
  );
};

// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
};
