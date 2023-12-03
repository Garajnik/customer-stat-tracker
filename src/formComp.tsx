import { useState, useEffect } from "react";
import "./App.css";
import SimpleChart from "./SimpleChart";

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
  const [firstInt, setFirstInt] = useState<number[]>([0]);
  const [secondInt, setSecondInt] = useState<number[]>([0]);

  useEffect(() => {
    console.log(firstInt);
  }, [firstInt]);

  useEffect(() => {
    const jsonString = localStorage.getItem("myArray");
    if (jsonString) {
      setItems(JSON.parse(jsonString));
    }
  }, []);

  useEffect(() => {
    if (items.length > 1) {
      localStorage.setItem("myArray", JSON.stringify(items));
    } else if (items.length === 0) {
      localStorage.setItem("myArray", JSON.stringify(items));
    }
  }, [items]);

  function LogAllData() {
    console.log(items);
    const newFirstArray: number[] = [];
    for (let i = 0; i < items.length; i++) {
      if (i < items.length - 1) {
        // Check if items[i + 1] exists
        const num =
          convertTimeStringToNumbers(items[i + 1].ArriveTime) -
          convertTimeStringToNumbers(items[i].ArriveTime);
        newFirstArray.push(num);
      }
    }
    setFirstInt(newFirstArray);

    const newSecondArray: number[] = [];
    for (let i = 0; i < items.length; i++) {
      if (i < items.length) {
        // Check if items[i + 1] exists
        const num =
          convertTimeStringToNumbers(items[i].EndTime) -
          convertTimeStringToNumbers(items[i].StartTime);
        newSecondArray.push(num);
      }
    }
    setSecondInt(newSecondArray);
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
    localStorage.setItem("myArray", JSON.stringify(items));
  }

  function convertTimeStringToNumbers(timeString: string): number {
    const timeArr: number[] = timeString.split(":").map(Number);
    const time = timeArr[0] * 60 * 60 + timeArr[1] * 60 + timeArr[2];
    return time;
  }

  function deleteAll() {
    setItems([]);
    localStorage.setItem("myArray", JSON.stringify(items));
    setFirstInt([0]);
    setSecondInt([0]);
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
      <button type="button" onClick={deleteAll}>
        Удалить всё
      </button>
      <span>Осталось добавить: {100 - items.length}</span>
      <SimpleChart
        intervals={firstInt.length > 0 ? firstInt : [1]}
      ></SimpleChart>
      <SimpleChart
        intervals={secondInt.length > 0 ? secondInt : [1]}
      ></SimpleChart>
    </>
  );
};

export default FormComp;
