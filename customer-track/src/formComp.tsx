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

  const [arrTime, setArrTime] = useState("");
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

  return (
    <>
      {items.map((item) => (
        <form key={item.id}>
          <label>
            Время прибытия:
            <input
              type="text"
              placeholder="Время прибытия"
              value={arrTime}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setArrTime(event.currentTarget.value);
                item.ArriveTime = event.currentTarget.value;
              }}
            />
            <button
              type="button"
              onClick={() => {
                item.ArriveTime = GetTime();
                setArrTime(item.ArriveTime);
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
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                item.StartTime = event.currentTarget.value;
              }}
            />
            <button type="button">Авто</button>
          </label>
          <label>
            Конец обслуживания:
            <input
              type="text"
              placeholder="Конец обслуживания"
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                item.EndTime = event.currentTarget.value;
              }}
            />
            <button type="button">Авто</button>
          </label>
        </form>
      ))}
      <button onClick={LogAllData}>Вывести данные</button>
      <button
        onClick={() => {
          setItems([...items, new ItemProp(items.length + 1, "", "", "")]);
        }}
      >
        Добавить строку
      </button>
    </>
  );
};

export default FormComp;
