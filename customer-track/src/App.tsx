import React, { useState, useEffect } from "react";
import FormComp from "./formComp";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  // Используем локальное хранилище для сохранения/восстановления массива компонентов
  const storedComponents = localStorage.getItem("formComponents");
  const initialComponents: JSX.Element[] = storedComponents
    ? JSON.parse(storedComponents)
    : [];

  // Состояние для хранения массива компонентов
  const [formComponents, setFormComponents] =
    useState<JSX.Element[]>(initialComponents);

  // Функция для добавления нового компонента в массив
  const addFormComponent = () => {
    setFormComponents((prevComponents) => [
      ...prevComponents,
      <FormComp key={prevComponents.length + 1}>
        <button id="deleteBtn">Удалить строку</button>
      </FormComp>,
    ]);
  };

  // Сохраняем массив компонентов в локальное хранилище при каждом изменении
  useEffect(() => {
    localStorage.setItem("formComponents", JSON.stringify(formComponents));
  }, [formComponents]);

  return (
    <div>
      {/* Вывод компонентов из массива */}
      {formComponents}

      {/* Кнопка для добавления нового компонента в массив */}
      <button onClick={addFormComponent}>Добавить строку</button>
    </div>
  );
};

export default App;

// <FormComp key={prevComponents.length + 1}>
// <button id="deleteBtn">Удалить строку</button>
// </FormComp>
