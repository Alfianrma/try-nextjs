import { useState, ChangeEvent, FormEvent, use } from "react";
import { useUserContext } from "@/context/UserContext";

function EditUserModal({
  setIsModalOpen,
  userData,
}: {
  setIsModalOpen: (value: boolean) => void;
  userData: {
    name: string;
    age: string;
    phoneNumber: string;
    date: Date;
    image: string;
  };
}) {
  const [editUserData, setEditUserData] = useState({
    name: userData.name,
    age: userData.age,
    phoneNumber: userData.phoneNumber,
    date: new Date(),
    image: "",
  });

  const { updateUser } = useUserContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setEditUserData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else if (type === "date") {
      setEditUserData((prev) => ({ ...prev, [name]: new Date(value) }));
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setEditUserData((prev) => ({ ...prev, [name]: base64String }));
        };

        reader.readAsDataURL(file);
      }
    } else {
      setEditUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(editUserData);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className="fixed z-50 p-6 w-[90%] md:w-fit h-fit border-2 border-slate-900 rounded-lg bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-xl font-bold text-center">User Form</h1>
        <form className="flex flex-col space-y-1" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Acumalaka"
            value={editUserData.name}
            onChange={handleChange}
            className="p-2 border-2 border-slate-500 rounded-md"
          />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            placeholder="20"
            value={editUserData.age}
            onChange={handleChange}
            className="p-2 border-2 border-slate-500 rounded-md"
          />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="08xxxxxxxxxx"
            value={editUserData.phoneNumber}
            onChange={handleChange}
            className="p-2 border-2 border-slate-500 rounded-md"
          />
          <label htmlFor="date">Birthdate:</label>
          <input
            type="date"
            name="date"
            id="date"
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
    </div>
  );
}

export default EditUserModal;
