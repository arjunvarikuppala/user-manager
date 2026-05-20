import { useLocation } from "react-router";

function User() {
  let { state } = useLocation();

  console.log(state?.user);

  if (!state?.user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-3xl text-red-500">No user selected</h2>
        <p className="text-xl text-gray-500 mt-2">Please go to the users list to view a user.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border p-6">
      <h2 className="text-4xl font-bold text-gray-700 mb-4">User Details</h2>
      <div className="space-y-3 text-2xl">
        <p><span className="font-semibold text-gray-600">Name:</span> {state.user.name}</p>
        <p><span className="font-semibold text-gray-600">Email:</span> {state.user.email}</p>
        <p><span className="font-semibold text-gray-600">Date of Birth:</span> {state.user.dateOfBirth ? new Date(state.user.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
        <p><span className="font-semibold text-gray-600">Mobile Number:</span> {state.user.mobileNumber || 'N/A'}</p>
      </div>
    </div>
  );
}

export default User;