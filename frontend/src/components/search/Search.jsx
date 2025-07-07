import React from 'react';
import "./Search.css";
import Cross from '../../assets/cancel.png';
import SearchIcon from '../../assets/search.png';
import { useGlobal } from '../../context/GlobalContext';

const Search = () =>{
   const {SearchQuery,setSearchQuery,searchOpen,setSearchOpen} = useGlobal();

    return(
        <>
        <div className="search-main-back" 
        style={{
        transform:searchOpen==="open"?"translateY(-0px)":"translateY(-100px)",
        boxShadow:searchOpen==='open'?'0px 0px 1000px 1000px rgba(0, 0, 0, 0.85)':'none'
        }}>
           <div className="search-main">
           <img src={SearchIcon} alt="" className='search'/>
            <input type="text" className="search-input" placeholder='Search Store'
            value={SearchQuery}
            onChange={(e)=>{setSearchQuery(e.target.value)}}/>
            <img src={Cross} alt="" className='cross' onClick={()=>{return setSearchOpen('close')}}/>
           </div>
        </div>
        </>
    )
}
export default Search;