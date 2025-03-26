import { useState } from "react";

export default function FilterSidebar() {
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  return (
    <aside className="app-sidebar">
      <div className="filter-section">
        <h3>Filters</h3>

        <div className="filter-group">
          <h4>Priority</h4>
          <div className="filter-options">
            <label>
              <input
                type="checkbox"
                value="high"
                // checked={}
                // onChange={}
              />
              High
            </label>
            <label>
              <input
                type="checkbox"
                value="medium"
                // checked={}
                // onChange={}
              />
              Medium
            </label>
            <label>
              <input
                type="checkbox"
                value="low"
                // checked={}
                // onChange={}
              />
              Low
            </label>
          </div>
        </div>
        {availableTags.length ? (
          <div className="filter-group">
            <h4>Tags</h4>
            <div className="filter-options tags-filter">
              {availableTags.map((tag, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={tag}
                    // checked={}
                    // onChange={}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </aside>
  );
}
