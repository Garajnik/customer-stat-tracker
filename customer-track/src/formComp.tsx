import { useState } from "react";
import "./App.css";

const FormComp = () => {
  class ItemProp {
    constructor(
      id: number,
      ArriveTime: string,
      StartTime: string,
      EndTime: string
    ) {
      this.id = id;
      this.ArriveTime = ArriveTime;
      this.StartTime = StartTime;
      this.EndTime = EndTime;
    }
    id: number;
    ArriveTime: string;
    StartTime: string;
    EndTime: string;
  }

  const [, setArrTime] = useState("");
  const [, setStartTime] = useState("");
  const [, setEndTime] = useState("");
  const [items, setItems] = useState([new ItemProp(1, "", "", "")]);

  function LogAllData() {
    items.forEach((value) => {
      console.log(value);
    });
  }

  function GetTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const currentSecond = currentDate.getSeconds();
    return `${currentHour}:${currentMinute}:${currentSecond}`;
  }

  function removeItem(id: number) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  return (
    <>
      {items.map((item, index) => (
        <form key={item.id}>
          <label>
            Время прибытия:
            <input
              type="text"
              placeholder="Время прибытия"
              value={item.ArriveTime}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setArrTime(event.currentTarget.value);
                item.ArriveTime = event.currentTarget.value;
              }}
            />
            <button
              type="button"
              onClick={() => {
                const newTime = GetTime();
                const newItems = [...items];
                newItems[index] = new ItemProp(
                  item.id,
                  newTime,
                  item.StartTime,
                  item.EndTime
                );
                setItems(newItems);
              }}
            >
              Авто
            </button>
          </label>
          <label>
            Время начала обслуживания:
            <input
              type="text"
              placeholder="Начало обслуживания"
              value={item.StartTime}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setStartTime(event.currentTarget.value);
                item.StartTime = event.currentTarget.value;
              }}
            />
            <button
              type="button"
              onClick={() => {
                const newTime = GetTime();
                const newItems = [...items];
                newItems[index] = new ItemProp(
                  item.id,
                  item.ArriveTime,
                  newTime,
                  item.EndTime
                );
                setItems(newItems);
              }}
            >
              Авто
            </button>
          </label>
          <label>
            Конец обслуживания:
            <input
              type="text"
              placeholder="Конец обслуживания"
              value={item.EndTime}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setEndTime(event.currentTarget.value);
                item.EndTime = event.currentTarget.value;
              }}
            />
            <button
              type="button"
              onClick={() => {
                const newTime = GetTime();
                const newItems = [...items];
                newItems[index] = new ItemProp(
                  item.id,
                  item.ArriveTime,
                  item.StartTime,
                  newTime
                );
                setItems(newItems);
              }}
            >
              Авто
            </button>
          </label>
          <button type="button" onClick={() => removeItem(item.id)}>
            Удалить
          </button>
        </form>
      ))}
      <button onClick={LogAllData}>Вывести данные</button>
      <button
        onClick={() => {
          let highestId = Math.max(...items.map((item) => item.id));
          if (highestId == -Infinity) {
            highestId = 0;
          }
          setItems([...items, new ItemProp(highestId + 1, "", "", "")]);
        }}
      >
        Добавить строку
      </button>
      <span>Осталось добавить: {100 - items.length}</span>
    </>
  );
};

export default FormComp;
