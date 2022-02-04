import React from "react";

const SearchBar = () => {
  return (
    <section className="bg0 search_bar_adj p-b-0">
      <div>
        <div className="categories-thumbs category-stories">
          <div className="container">
            <div className="set-inline">
              <div className="category-strip">
                <div
                  className="bredcrumb"
                  style={{
                    paddingTop: "0px !important",
                    paddingBottom: "0px !important",
                  }}
                >
                  <div
                    className="sidebar-links  st-search-bar"
                    style={{ marginTop: 20 }}
                  >
                    <form>
                      <input
                        style={{}}
                        type="text"
                        name="search"
                        placeholder="Search..."
                        defaultValue
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
