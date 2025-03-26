import Image from "next/image";
import { ExportButton } from "./Component/ExportButton";

export default function Home() {
  return (
    <div className=" app-container ">
      <header className="app-header">
        <h1>Todo List</h1>
        <div className="user-controls">
          <ExportButton />
        </div>
      </header>
      <main className="app-main">hb</main>
    </div>
  );
}
