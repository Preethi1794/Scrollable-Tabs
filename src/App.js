import "./App.scss";
import ScrollableTabs from "./components/ScrollableTabs/ScrollableTabs";
import Tab from "./components/ScrollableTabs/Tab";

function App() {
  return (
    <>
      <div className="triangle"></div>
      <div className="main-container">
        <ScrollableTabs defaultTabs={3}>
          <Tab key="1" name="Tab 1">
            <p>first tab</p>
          </Tab>
          <Tab key="2" name="Tab 2">
            <p>second tab</p>
          </Tab>
          <Tab key="3" name="Tab 3">
            <p>third tab</p>
          </Tab>
        </ScrollableTabs>
      </div>
    </>
  );
}

export default App;
