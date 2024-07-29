import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HiOutlineSearch } from 'react-icons/hi';
import { FaReddit } from "react-icons/fa";

import { setSearchTerm } from "../../store/redditSlice.js"

const Header = () => {
   const [searchTermLocal, setSearchTermLocal] = useState("");
   const searchTerm = useSelector((state) => state.reddit.searchTerm);
   const dispatch = useDispatch();

   const onSearchTernChange = (e) => {
      setSearchTermLocal(e.target.value);
   };

   useEffect(() => {
      setSearchTermLocal(searchTerm);
   }, [searchTerm]);

   const onSearchTermSubmit = (e) => {
      e.preventDefault();

      dispatch(setSearchTerm(searchTermLocal));
   }

   return (
      <header>
         <div className='logo'>
            <FaReddit className="logo-icon" />
            <p>
               <span>Mini</span>Reddit
            </p>
         </div>
         <form className="search" onSubmit={onSearchTermSubmit}>
            <input
               type="text"
               placeholder='Search'
               value={searchTermLocal}
               onChange={onSearchTernChange}
               aria-label="Search posts"
            />
            <button
               type="submit"
               onClick={onSearchTermSubmit}
               aria-label="Search"
            >
               <HiOutlineSearch />
            </button>
         </form>
      </header>
   )
}
export default Header;