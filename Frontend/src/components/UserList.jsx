import { useState } from "react";
import {useNavigate} from 'react-router'

function UsersList() {
  let [users] = useState(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers === null) {
        const mockUsers = [
          {
            _id: "mock1",
            name: "Ravi Kumar",
            email: "ravi@gmail.com",
            dateOfBirth: "2005-08-27",
            mobileNumber: 9876543213,
            status: true,
          },
          {
            _id: "mock2",
            name: "Deeksha Sharma",
            email: "deeksha@gmail.com",
            dateOfBirth: "2006-03-15",
            mobileNumber: 9849639877,
            status: true,
          }
        ];
        localStorage.setItem("users", JSON.stringify(mockUsers));
        return mockUsers;
      } else {
        const parsedUsers = JSON.parse(storedUsers);
        return parsedUsers.filter(u => u.status !== false);
      }
    } catch (err) {
      console.error("Failed to load users from localStorage:", err);
      return [];
    }
  });
  let navigate=useNavigate()


  //go to user
  const gotoUser=(userObj)=>{
    navigate("/user",{state:{user:userObj}})
  }

  return (
    <div>
      <h1 className="text-5xl text-gray-600">List of Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {users?.map((userObj) => (
          <div key={userObj.email} className="p-10 shadow-2xl cursor-pointer" onClick={()=>gotoUser(userObj)}>
            <p className="text-3xl">{userObj.name}</p>
            <p className="text-2xl">{userObj.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;