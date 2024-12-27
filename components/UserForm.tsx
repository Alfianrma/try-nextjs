"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useUserContext } from "../context/UserContext";

function UserForm() {
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    phoneNumber: "",
    date: new Date(),
    image: "",
  });

  const { user, addUser } = useUserContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setUserData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else if (type === "date") {
      setUserData((prev) => ({ ...prev, [name]: new Date(value) }));
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setUserData((prev) => ({ ...prev, [name]: base64String }));
        };

        reader.readAsDataURL(file);
      }
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(userData);
    setUserData({
      name: "",
      age: "",
      phoneNumber: "",
      date: new Date(),
      image: "",
    });

    console.log("userData", userData);
  };

  return (
    <div className="p-6 w-[90%] md:w-fit h-fit border-2 border-slate-900 rounded-lg">
      <h1 className="text-xl font-bold text-center">User Form</h1>
      <form className="flex flex-col space-y-1" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Acumalaka"
          value={userData.name}
          onChange={handleChange}
          className="p-2 border-2 border-slate-500 rounded-md"
        />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          placeholder="20"
          value={userData.age}
          onChange={handleChange}
          className="p-2 border-2 border-slate-500 rounded-md"
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="+628xxxxxxxxxx"
          value={userData.phoneNumber}
          onChange={handleChange}
          className="p-2 border-2 border-slate-500 rounded-md"
        />
        <label htmlFor="date">Birthdate:</label>
        <input
          type="date"
          name="date"
          id="date"
          value={userData.date.toISOString().split("T")[0]}
          onChange={handleChange}
          className="p-2 border-2 border-slate-500 rounded-md"
        />
        <label htmlFor="image">Profile Picture:</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-700 p-2 text-white rounded-md mt-10"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
