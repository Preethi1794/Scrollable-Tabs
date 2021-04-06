import React, { useState, useRef, useEffect } from "react";
import { MdAdd, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Draggable } from "../Draggable/Draggable";
import { findIndex } from "../Draggable/find-index";
import move from "array-move";
import "./scrollableTabs.scss";
import LengthExceededAlert from "../Modals/LengthExceededAlert";

function ScrollableTabs({ defaultTabs, children }) {
  const [activeElement, setActiveElement] = useState(0);
  const [showRemoveIcon, setShowRemoveIcon] = useState("");
  const [showChevrons, setShowChevrons] = useState(false);
  const tabContainerRef = useRef();
  const tabRef = useRef();
  const [tabInfo, setTabInfo] = useState([]);
  const [showMaxAlert, setshowMaxAlert] = useState(false);
  const positions = useRef([]).current;
  const setPosition = (i, offset) => (positions[i] = offset);
  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) setTabInfo(move(tabInfo, i, targetIndex));
  };

  useEffect(() => {
    console.log(children);
    const tabInfoCopy = [];
    if (children.length > 0) {
      children.map((child) => {
        tabInfoCopy.push({ key: child.key, name: child.props.name });
      });
    }
    setTabInfo(tabInfoCopy);
  }, []);

  const changeTab = (index, e) => {
    setActiveElement(index);
  };

  const addTab = async () => {
    if (tabInfo.length < 10) {
      await setTabInfo([
        ...tabInfo,
        { key: tabInfo.length + 1, name: `Tab ${tabInfo.length + 1}` },
      ]);
      if (
        tabContainerRef.current.clientWidth <
        tabContainerRef.current.scrollWidth
      ) {
        setShowChevrons(true);
      }
      setActiveElement(tabInfo.length);
      tabRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      setshowMaxAlert(true);
      setTimeout(() => {
        setshowMaxAlert(false);
      }, 3000);
    }
  };

  const removeTab = async (tab, index, e) => {
    await setTabInfo(tabInfo.filter((item) => item.key != tab.key));
    setActiveElement(index);
  };

  const handleLeftClick = () => {
    tabContainerRef.current.scrollLeft -= 150;
    setActiveElement(activeElement - 1);
  };

  const handleRightClick = () => {
    tabContainerRef.current.scrollLeft += 150;
    setActiveElement(activeElement + 1);
  };

  return (
    <div className="scrollable-tab-container">
      <div className="tabs-holder">
        {activeElement != 0 && showChevrons && (
          <MdChevronLeft onClick={handleLeftClick} className="cursor" />
        )}
        <ul ref={tabContainerRef} className="horizontal-list">
          {tabInfo.map((tab, i) => (
            <Draggable
              tabRef={tabRef}
              i={i}
              setPosition={setPosition}
              moveItem={moveItem}
              key={tab.key}
              tab={tab}
              changeTab={changeTab}
              removeTab={removeTab}
              setShowRemoveIcon={setShowRemoveIcon}
              activeElement={activeElement}
              showRemoveIcon={showRemoveIcon}
            />
          ))}
        </ul>
        {activeElement != 9 && showChevrons && (
          <MdChevronRight onClick={handleRightClick} className="cursor" />
        )}
        <MdAdd className="cursor" onClick={addTab} />
      </div>
      {children.length <= defaultTabs &&
        tabInfo[activeElement]?.key === children[activeElement]?.key && (
          <div className="tab-content">
            {children[activeElement]?.props.children}
          </div>
        )}
      {showMaxAlert && <LengthExceededAlert />}
    </div>
  );
}

export default ScrollableTabs;
