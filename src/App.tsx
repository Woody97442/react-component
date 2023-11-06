import { useEffect, useState } from "react";
import { getCategories, getSubCategories } from "./sanity";
import Category from "./models/Category";

function App() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryStates, setCategoryStates] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await getCategories();
      setCategories(allCategories);

      // Initialize category states
      const initialCategoryStates: { [key: number]: boolean } = {};
      allCategories.forEach((index: number) => {
        initialCategoryStates[index] = false;
      });
      setCategoryStates(initialCategoryStates);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      const subCategories = await getSubCategories();
      setSubCategories(subCategories);
      console.log(subCategories);
    };
    fetchSubCategories();
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
          {categories.map((category: Category, index) => {
            return (
              <li key={index} className="categories">
                <a
                  href={category.href}
                  onClick={() => {
                    showSubMuen(index);
                  }}
                >
                  <i className="fas fa-stream"></i>
                  {category.name}
                  <span className="fas fa-caret-down"></span>
                </a>
                <ul
                  className={
                    "list-submenu " + (categoryStates[index] ? "show" : "")
                  }
                >
                  {subCategories
                    .filter((subCategories: any) => {
                      if (subCategories.refCat === category.name) {
                        return subCategories;
                      } else {
                        return 0;
                      }
                    })
                    .map((subCat: any, index) => {
                      return (
                        <>
                          <li key={index}>
                            <a href="#">{subCat.name}</a>
                          </li>
                        </>
                      );
                    })}
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
