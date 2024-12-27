"use client";
import { useState } from "react";
import Image from "next/image";
import { useUserContext } from "../context/UserContext";
import { TiPencil } from "react-icons/ti";
import EditUserModal from "./modal/EditUserModal";

function UserProfileCard() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useUserContext();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const formattedDate = user.date.toLocaleDateString("id-ID", options);
  return (
    <div className="p-6 w-fit h-fit border-2 border-slate-900 rounded-lg">
      <h1 className="text-xl font-bold text-center">User Profile</h1>
      <div className="flex flex-col space-y-1 w-24 mx-auto">
        <Image
          src={user.image}
          alt="user"
          width={500}
          height={500}
          className="rounded-full object-cover aspect-square"
        />
      </div>
      <div className="flex flex-row space-y-1">
        <div>Name : {user.name}</div>
      </div>
      <div className="flex flex-row space-y-1">
        <div>Age : {user.age}</div>
      </div>
      <div className="flex flex-row space-y-1">
        <div>Phone Number : {user.phoneNumber}</div>
      </div>
      <div className="flex flex-row space-y-1">
        <div>Birth Date : {formattedDate}</div>
      </div>
      <button
        className="p-2 mt-4 bg-blue-600 text-white rounded-2xl flex mx-auto items-center cursor-pointer hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        <TiPencil className="text-xl mr-1" />
        Edit Profile
      </button>
      {isModalOpen && (
        <EditUserModal setIsModalOpen={setIsModalOpen} userData={user} />
      )}
    </div>
  );
}

export default UserProfileCard;
