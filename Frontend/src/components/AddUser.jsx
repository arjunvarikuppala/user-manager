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
    formState: { errors },
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
      <h1 className="text-5xl font-semibold text-gray-700 mb-6">Add New User</h1>
      {/* Create user form */}
      <form onSubmit={handleSubmit(onUserCreate)} className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="mb-6">
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Name can only contain letters and spaces"
              }
            })}
            className="p-4 border border-gray-300 rounded-xl w-full text-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500 text-sm text-left mt-2 pl-1 font-medium">{errors.name.message}</p>}
        </div>

        <div className="mb-6">
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Please enter a valid email address"
              },
              validate: (value) => {
                try {
                  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
                  const isDuplicate = existingUsers.some(
                    (u) => u.email.toLowerCase() === value.toLowerCase() && u.status !== false
                  );
                  if (isDuplicate) {
                    return "Email is already registered";
                  }
                } catch (e) {
                  console.error("Failed to check duplicate email:", e);
                }
                return true;
              }
            })}
            className="p-4 border border-gray-300 rounded-xl w-full text-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm text-left mt-2 pl-1 font-medium">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <input
            type="date"
            {...register("dateOfBirth", {
              required: "Date of birth is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate > today) {
                  return "Date of birth cannot be in the future";
                }
                return true;
              }
            })}
            className="p-4 border border-gray-300 rounded-xl w-full text-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Date of birth"
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm text-left mt-2 pl-1 font-medium">{errors.dateOfBirth.message}</p>}
        </div>

        <div className="mb-8">
          <input
            type="text"
            {...register("mobileNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Please enter a valid 10-digit mobile number starting with 6-9"
              }
            })}
            className="p-4 border border-gray-300 rounded-xl w-full text-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Mobile number"
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm text-left mt-2 pl-1 font-medium">{errors.mobileNumber.message}</p>}
        </div>

        <button
          type="submit"
          className="text-xl bg-lime-400 hover:bg-lime-500 active:scale-98 transition-all text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl w-full"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;