import React from 'react'
import PeopleIcon from '@mui/icons-material/People';
import UserTable from '../../../components/table/UserTable';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../../context/ApiContext';
import { useUser } from '../../../context/UserContext';

const User = () => {
  const Navigate =useNavigate();
  const {setSearchOpen ,SearchQuery} = useApi();
    const { fetchUsers ,users } =useUser();
    useEffect(()=>{
      fetchUsers();
    },[])

    const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(SearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(SearchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(SearchQuery.toLowerCase())
  );
  return (
    <>
      <div className="dashboard-back inventory-back">
        <div className="dashboard-main inventory-main">
          <div className="admin-head-back inventory-head-back">
            <h1 className="admin-heading">
              <PeopleIcon /> Users
            </h1>
            <label className="no-of-products" htmlFor="">
              (no of users {filteredUsers.length})
            </label>
            <div className="inventory-btn-back">
              <button
              onClick={()=>setSearchOpen("open")}
              className="inventory-add-btn">
                SEARCH
              </button>
              <button
              onClick={()=>Navigate("/admin/add-user")}
                className="inventory-add-btn"
              >
                ADD 
              </button>
            </div>
          </div>
          <div className="inventory-table-back">
            <UserTable filteredUsers={filteredUsers}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
