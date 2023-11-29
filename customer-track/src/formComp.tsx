import { ReactNode } from "react";
import "./app.css";

interface formProps {
  children: ReactNode;
}

export default function FormComp({ children }: formProps) {
  return (
    <div id="content-holder">
      {children}
      <div className="input-container">
        <input placeholder="Время прихода" />
        <div className="button-container">
          <button>Авто</button>
          <button>Удалить</button>
        </div>
      </div>

      <div className="input-container">
        <input placeholder="Начало обслуживания" />
        <div className="button-container">
          <button>Авто</button>
          <button>Удалить</button>
        </div>
      </div>

      <div className="input-container">
        <input placeholder="Конец обслуживания" />
        <div className="button-container">
          <button>Авто</button>
          <button>Удалить</button>
        </div>
      </div>
    </div>
  );
}
