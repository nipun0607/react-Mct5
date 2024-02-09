import React, { useState } from "react";
import { Modal } from "@mui/material";
import styled from "styled-components"
// import { db, storage } from "../firebase";
import { db, storage, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import {
//   getDocs,
//   collection,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore";

const SidebarContainer = styled.div`
    margin-top: 10px;
`
const SidebarBtn = styled.div`
    button {
        background: transparent;
        border: 1px solid lightgray;
        display: flex;
        align-items: center;
        border-radius: 40px;
        padding:5px 10px;
        box-shadow:2px 2px 2px #ccc;
        margin-left: 20px;
        span {
            font-size: 16px;
            margin-right: 20px;
            margin-left: 10px;
        }
    }
`

const SidebarOptions = styled.div`
    margin-top: 10px;
    .progress_bar {
        padding: 0px 20px;
    }
    .progress_bar span {
        display: block;
        color:#333;
        font-size: 13px;
    }
`

const SidebarOption = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: 0px 20px 20px 0px;
    &:hover{
        background: whitesmoke;
        cursor: pointer;
    }
    svg.MuiSvgIcon-root {
        color:rgb(78, 78, 78);
    }
    span {
        margin-left: 15px;
        font-size: 13px;
        font-weight: 500;
        color:rgb(78, 78, 78)
    }
`

const ModalPopup = styled.div`
    top: 50%;
    background-color: #fff;
    width: 500px;
    margin: 0px auto;
    position: relative;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 10px;
`

const ModalHeading = styled.div`
    text-align: center;
    border-bottom: 1px solid lightgray;
    height: 40px;
`

const ModalBody = styled.div`
    input.modal__submit {
        width: 100%;
        background: darkmagenta;
        padding: 10px 20px;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 5px;
        font-size: 16px;
        border: 0;
        outline: 0;
        border-radius: 5px;
        cursor: pointer;
        margin-top:20px
    }
    input.modal__file {
        background: whitesmoke;
        padding: 20px;
        color: #000;
        display: block;
        margin-top:20px
    }
`

const UploadingPara = styled.p`
    background: green;
    color: #fff;
    margin: 20px;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;
`



const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const storageRef = ref(storage, `files/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      // Check if snapshot.totalBytes is defined, use 0 if not
      const size = snapshot.metadata.size || 0;

      // Associate the file with the authenticated user ID
      await addDoc(collection(db, "myfiles"), {
        timestamp: serverTimestamp(),
        filename: file.name,
        fileURL: url,
        size: size,
        contentType: snapshot.metadata.contentType,
      });
     // Reset state and close modal
     setUploading(false);
     setFile(null);
     setOpen(false);
   } catch (error) {
     console.error("Error uploading file:", error);
     setUploading(false);
   }
 };
  return (
    <>
    
      {/* <Modal open={open} onClose={()=>setOpen(false)}>
        <ModalPopup>
            <form onSubmit={handleUpload}>

                <ModalHeading>
                    <h3>Select the file you want to upload</h3>
                </ModalHeading>
                <ModalBody>
                    {uploading ? <UploadingPara>Uploading...</UploadingPara>:(
                        <>
                        <input type='file' className='modal__file' onChange={handleFile}/>
                        <input type='submit' className='modal__submit' />
                        </>
                    )}
                   
                </ModalBody>
            </form>
        </ModalPopup>
    
    </Modal>
    <SidebarContainer>
        <SidebarBtn>
            <button onClick={()=> setOpen(true)}>
            <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E" />
            <span>New</span>
            </button>
        </SidebarBtn>
        <SidebarOptions>
        <SidebarOption>
        <MobileScreenShareIcon />
        <span>My Drive</span>
    </SidebarOption>
    <SidebarOption>
        <DevicesIcon />
        <span>Computers</span>
    </SidebarOption>
    <SidebarOption>
        <PeopleAltOutlinedIcon />
        <span>Shared with me</span>
    </SidebarOption>
    <SidebarOption>
        <QueryBuilderOutlinedIcon />
        <span>Recent</span>
    </SidebarOption>
    <SidebarOption>
        <StarBorderOutlinedIcon />
        <span>Starred</span>
    </SidebarOption>
    <SidebarOption>
        <DeleteOutlineOutlinedIcon />
        <span>Trash</span>
    </SidebarOption>
        </SidebarOptions>
        <hr/>
        <SidebarOptions>
                <SidebarOption>
                    <CloudQueueIcon />
                    <span>Storage</span>
                </SidebarOption>
                <div className="progress_bar">
                    <progress size="tiny" value="50" max="100" />
                    <span>105 GB  of 200 GB used</span>
                </div>
            </SidebarOptions>
    </SidebarContainer> */}

    
  
    <Modal open={open} onClose={() => setOpen(false)}>
    <ModalPopup>
        <form onSubmit={handleUpload}>
            <ModalHeading>
                <h3>Select file you want to upload</h3>
            </ModalHeading>
            <ModalBody>
                {uploading ? <UploadingPara>Uploading...</UploadingPara> : (
                    <div>
                        <input type="file" className='modal__file' onChange={handleFile} />
                        <input type="submit" className='modal__submit' />
                    </div>
                )}
            </ModalBody>
        </form>
    </ModalPopup>
</Modal>
      <SidebarContainer>
        
        <SidebarBtn>
        <button onClick={() => setOpen(true)}>
            <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E" />
            <span>New</span>
        </button>
    </SidebarBtn>
        
        <SidebarOptions>
          <SidebarOption>
            {/* Replace with your own SVG or icon component */}
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="#000000"
              />
            </svg>
            <span>My Drive</span>
          </SidebarOption>
          {/* Add more SidebarOption components for other items */}
        </SidebarOptions>
        <hr />
        <SidebarOptions>
          <SidebarOption>
            {/* Replace with your own SVG or icon component */}
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="#000000"
              />
            </svg>
            <span>My Drive</span>
          </SidebarOption>
          {/* Add more SidebarOption components for other items */}
          <SidebarOption>
            {/* Replace with your own SVG or icon component */}
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="#000000"
              />
            </svg>
            <span>Computers</span>
          </SidebarOption>
          {/* Repeat the pattern for other SidebarOptions */}
        </SidebarOptions>
        <hr />
        <SidebarOptions>
          <SidebarOption>
            {/* Replace with your own SVG or icon component */}
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="#000000"
              />
            </svg>
            <span>Storage</span>
          </SidebarOption>
          <div className="progress_bar">
            <progress size="tiny" value="50" max="100" />
            <span>105 GB of 200 GB used</span>
          </div>
        </SidebarOptions>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
