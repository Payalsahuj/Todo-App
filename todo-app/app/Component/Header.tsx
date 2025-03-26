import { Dropdown } from "./Dropdown";
import { ExportButton } from "./ExportButton";

export const Header = () => {
  return (
    <header className="app-header">
      <h1>Todo List</h1>
      <div className="user-controls">
        <ExportButton />

        <Dropdown options={[]} />

        <div className="user-profile"></div>
      </div>
    </header>
  );
};
