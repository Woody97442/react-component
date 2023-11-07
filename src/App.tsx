import { Key, useEffect, useState } from "react";
import { getFrameWork } from "./sanity";
// import { useAppDispatch, useAppSelector } from "./app/hooks";
// import { getAllFramework } from "./features/framework/frameworkSlice";

function App() {
  const [framework, setFramework] = useState([]);
  const [categoryStates, setCategoryStates] = useState<{
    [key: number]: boolean;
  }>({});

  // const allFrameWork = useAppSelector((state) => state.framework.allFrameWork);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchFramework = async () => {
      const request = await getFrameWork();
      setFramework(request);
      // console.log(request);
    };
    fetchFramework();
    // dispatch(getAllFramework(allFrameWork));
  }, []);

  function showSubMuen(index: number) {
    const updatedCategoryStates = { ...categoryStates };
    updatedCategoryStates[index] = !updatedCategoryStates[index];
    setCategoryStates(updatedCategoryStates);
  }

  return (
    <>
      <input type="checkbox" id="check" />
      <label className="button bars" htmlFor="check">
        <i className="fas fa-bars"></i>
      </label>
      <div className="side-bar">
        <div className="title">
          <div className="logo">E-LoGame</div>
          <label className="button cancel" htmlFor="check">
            <i className="fas fa-times"></i>
          </label>
        </div>
        <ul>
          <li>
            <a href="#">
              <i className="fas fa-house"></i>Home
            </a>
          </li>
          {framework.map((menu: any, categoryIndex) => {
            return (
              <li key={categoryIndex} className="categories">
                <a
                  href="#"
                  onClick={() => {
                    showSubMuen(categoryIndex);
                  }}
                >
                  <i className="fas fa-stream"></i>
                  {menu.name}
                  <span className="fas fa-caret-down"></span>
                </a>
                <ul
                  className={
                    "list-submenu " +
                    (categoryStates[categoryIndex] ? "show" : "")
                  }
                >
                  {menu.categories.map(
                    (subMenu: any, subMenuIndex: Key | null | undefined) => {
                      return (
                        <li key={subMenuIndex}>
                          <a href={subMenu.url}>{subMenu.name}</a>
                        </li>
                      );
                    }
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
        <div className="media-icons">
          <a href="">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
