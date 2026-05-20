import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const saveUserToLocalStorage = (newUser) => {
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const userToSave = {
    ...newUser,
    _id: Date.now().toString(),
    status: true,
  };
  existingUsers.push(userToSave);
  localStorage.setItem("users", JSON.stringify(existingUsers));
};

function AddUser() {
  const {
    register,
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();

  //form submit
  const onUserCreate = (newUser) => {
    try {
      saveUserToLocalStorage(newUser);
      // Navigate to users list
      navigate("/users-list");
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-5xl text-gray-600">Add New User</h1>
      {/* Create user form */}
      <form onSubmit={handleSubmit(onUserCreate)} className="max-w-96 mx-auto mt-10">
        <input type="text" {...register("name")} className="mb-5 border w-full text-2xl" placeholder="Name" />
        <input type="email" {...register("email")} className="mb-5 border w-full text-2xl" placeholder="Email" />
        <input
          type="date"
          {...register("dateOfBirth")}
          className="mb-5 border w-full text-2xl"
          placeholder="Date of birth"
        />
        <input
          type="number"
          {...register("mobileNumber")}
          className="mb-5 border w-full text-2xl"
          placeholder="Mobile number"
        />
        <button type="submit" className="text-2xl bg-lime-400 text-lime-50 px-8 py-4">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;