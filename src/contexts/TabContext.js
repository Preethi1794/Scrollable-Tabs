// import React, { createContext, useState } from "react";

// export const TabContext = createContext();

// export const TabProvider = (props) => {
//   const [activeElement, setActiveElement] = useState(1);
//   const [tabInfo, setTabInfo] = useState([
//     { key: 1, name: "Tab 1" },
//     { key: 2, name: "Tab 2" },
//     { key: 3, name: "Tab 3" },
//   ]);

//   const changeTab = (tabDetails, e) => {
//     setActiveElement(tabDetails.key);
//   };

//   return (
//     <TabContext.Provider
//       value={{
//         activeElement,
//         setActiveElement,
//         tabInfo,
//         setTabInfo,
//         changeTab,
//       }}
//     >
//       {props.children}
//     </TabContext.Provider>
//   );
// };

// export default TabContext;
