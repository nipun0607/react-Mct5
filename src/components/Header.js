import styled from 'styled-components'
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
  } from "firebase/firestore";
  
// import SearchIcon from '@material-ui/icons/Search';
// import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
// import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// import SettingsIcon from '@material-ui/icons/Settings';
// import AppsIcon from '@material-ui/icons/Apps';
// import { Avatar } from '@material-ui/core';

// const HeaderContainer = styled.div `
//     display: grid;
//     grid-template-columns: 300px auto 200px;
//     align-items: center;
//     padding: 5px 20px;
//     height: 60px;
//     border-bottom: 1px solid lightgray;
//     `

//     const HeaderLogo = styled.div `
//     display: flex;
//     align-items: center;
//     img {
//         width: 40px;
//     }
//     span{
//         font-size: 24px;
//         margin-left: 10px;
//         color: gray;
//     }
// `
//     const HeaderSearch = styled.div`
//     display: flex;
//     align-items: center;
//     width: 700px;
//     background-color: whitesmoke;
//     padding: 12px;
//     border-radius: 10px;
//     input{
//         background-color: transparent;
//         border: 0;
//         outline: 0;
//         flex: 1;
//     }
// `
// const HeaderIcons = styled.div`
//     display: flex;
//     align-items: center;
//     span {
//         display: flex;
//         align-items: center;
//         margin-left: 20px;
//     }
//     svg.MuiSvgIcon-root{
//         margin: 0px 10px;
//     }
// `
// const Header = ({photoURL}) => {
//   return (
//    <HeaderContainer>
//         <HeaderLogo>
//         <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" alt="Google Drive" />
//         <span>Drive</span>
//         </HeaderLogo>
       
//             <HeaderSearch>
//                 <SearchIcon/>
//                 <input placeholder="Search Drive"/>
//                 <FormatAlignCenterIcon/>
//             </HeaderSearch>
            
//             <HeaderIcons>
//                 <span>
//                     <HelpOutlineIcon />
//                     <SettingsIcon/>
//                 </span>
//                 <span>
//                     <AppsIcon />
//                     <Avatar src={photoURL} />
//                 </span>
//             </HeaderIcons>
       
//    </HeaderContainer>
//   )
// }

// export default Header;





import React from 'react';
// import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto 200px;
  align-items: center;
  padding: 5px 20px;
  height: 60px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 40px;
  }

  span {
    font-size: 24px;
    margin-left: 10px;
    color: gray;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  width: 700px;
  background-color: whitesmoke;
  padding: 12px;
  border-radius: 10px;

  input {
    background-color: transparent;
    border: 0;
    outline: 0;
    flex: 1;
  }
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;

  span {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  svg {
    margin: 0px 10px;
  }
`;

const Header = ({ photoURL }) => {
  return (
    <HeaderContainer>
      <HeaderLogo>
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" alt="Google Drive" />
        <span>Drive</span>
      </HeaderLogo>

      <HeaderSearch>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#000000">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-3.83-3.55-6.91-7.38-7.38a6.5 6.5 0 0 0-5.34 1.48l-.27.28v.79l-4.85 4.86a9 9 0 0 0 13.12 12.28l3.85 3.86L22 21.41l-3.86-3.85a9 9 0 0 0-2.64-3.56zM9 16.5a7.5 7.5 0 0 1 0-15 7.5 7.5 0 0 1 7.5 7.5 7.5 7.5 0 0 1-7.5 7.5z"/>
        </svg>
        <input placeholder="Search Drive" />
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#000000">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M21 19h-5v-1.78c1.15-1.02 2-2.49 2-4.22 0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6c1.73 0 3.29-.73 4.38-1.9L20 18v1h-2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"/>
        </svg>
      </HeaderSearch>

      <HeaderIcons>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 13h2v2h-2zm0-6h2v4h-2z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M16.39 13.86l1.75 1.75a7.95 7.95 0 0 1-1.75 1.75l-1.75-1.75a2 2 0 0 1-2.83 0l-1.41-1.41a2 2 0 0 1 0-2.83l1.75-1.75a7.95 7.95 0 0 1-1.75-1.75l-1.75 1.75a2 2 0 0 1-2.83 0L6.2 8.64a2 2 0 0 1 0-2.83l1.41-1.41a2 2 0 0 1 2.83 0l1.75 1.75a7.95 7.95 0 0 1 1.75-1.75L13.86 3.6a2 2 0 0 1 2.83 0l1.41 1.41a2 2 0 0 1 0 2.83l-1.75 1.75a7.95 7.95 0 0 1 1.75 1.75zM12 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
          </svg>
        </span>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 13h2v2h-2zm0-6h2v4h-2z"/>
          </svg>
          <img src={photoURL} alt="Avatar" />
        </span>
      </HeaderIcons>
    </HeaderContainer>
  );
};

export default Header;
