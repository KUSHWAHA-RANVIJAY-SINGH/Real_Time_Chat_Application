import React from 'react'
import OtherUser from './OtherUser';
import {useSelector} from "react-redux";
// import useGetMessages from '../hook/useGetMessages';
import useGetOtherUsers from '../hook/useGetOtherUsers';

const OtherUsers = () => {
  // Custom hook to fetch other users
  useGetOtherUsers();

  // Get otherUsers from Redux store
  const { otherUsers } = useSelector((store) => store.user);

  // Early return if otherUsers is not an array or is empty
  if (!Array.isArray(otherUsers) || otherUsers.length === 0) {
    console.log('data not found');
      return <div>No users found</div>;
  }

  return (
      <div className="overflow-auto flex-1">
          {otherUsers.map((user) => (
              <OtherUser key={user._id} user={user} />
          ))}
      </div>
  );
};

export default OtherUsers;