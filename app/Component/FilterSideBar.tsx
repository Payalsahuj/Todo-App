import { useContext, useEffect, useState } from "react";
import { todoContext } from "./HomePage";

export default function FilterSidebar() {
  const {
    todoList,
    filterPriority,
    setFilterPriority,
    filterTags,
    setFilterTags,
  } = useContext(todoContext);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    const tags = todoList.reduce((acc, todo) => {
      todo.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
      return acc;
    }, [] as string[]);
    setAvailableTags(tags);
  }, [todoList]);

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
                className="cursor-pointer"
                checked={filterPriority.includes("high")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilterPriority([...filterPriority, "high"]);
                  } else {
                    setFilterPriority(
                      filterPriority.filter((priority) => priority !== "high")
                    );
                  }
                }}
              />
              High
            </label>
            <label>
              <input
                type="checkbox"
                value="medium"
                className="cursor-pointer"
                checked={filterPriority.includes("medium")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilterPriority([...filterPriority, "medium"]);
                  } else {
                    setFilterPriority(
                      filterPriority.filter((priority) => priority !== "medium")
                    );
                  }
                }}
              />
              Medium
            </label>
            <label>
              <input
                type="checkbox"
                value="low"
                className="cursor-pointer"
                checked={filterPriority.includes("low")}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilterPriority([...filterPriority, "low"]);
                  } else {
                    setFilterPriority(
                      filterPriority.filter((priority) => priority !== "low")
                    );
                  }
                }}
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
                    className="cursor-pointer"
                    type="checkbox"
                    value={tag}
                    checked={filterTags.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilterTags([...filterTags, tag]);
                      } else {
                        setFilterTags(
                          filterTags.filter(
                            (selectedTag) => selectedTag !== tag
                          )
                        );
                      }
                    }}
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
