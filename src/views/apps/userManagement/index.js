import React, { useEffect } from "react";
import { Table, Switch } from "../../common";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import {
  deleteUser,
  activeUserData,
  listUser
} from "../../../api/userManagement/userManagement";
import { Trash, Edit, Eye } from "react-feather";

// ** Spinner (Splash Screen)
import Spinner from "../../../@core/components/spinner/Loading-spinner";
import { ShowToast } from "../../../utility/Utils";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import AddUserManagement from "./addUserManagement";
import AddUser from "./addUser";

import {ConfirmDialog} from "../../../@core/components/confirmDialog/ConfirmDialog";
import { useLocation } from 'react-router-dom';

import empty from '../../../assets/images/empty/empty.svg'

const UserManagement = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    {
      name: "FirstName",
      sortable: true,
      minWidth: "100px",
      sortField: "first_name",
      selector: (row) => row.first_name,
      cell: (row) => (
        <>
          <span>{row.first_name}</span>
        </>
      ),
    },
    {
      name: "LastName",
      sortable: true,
      minWidth: "100px",
      sortField: "last_name",
      selector: (row) => row.last_name,
      cell: (row) => (
        <>
          <span>{row.last_name}</span>
        </>
      ),
    },
    // {
    //   name: "Mobile No",
    //   sortable: true,
    //   minWidth: "150px",
    //   sortField: "mobile_number",
    //   selector: (row) => row.mobile_number,
    //   cell: (row) => (
    //     <>
    //       <span>{row.mobile_number}</span>
    //     </>
    //   ),
    // },
    // {
    //   name: "Email",
    //   sortable: true,
    //   minWidth: "300px",
    //   sortField: "email",
    //   selector: (row) => row.email,
    //   cell: (row) => (
    //     <>
    //       <span>{row.email}</span>
    //     </>
    //   ),
    // },
    {
      name: "Action",
      minWidth: "110px",
      cell: (row) => (
        <>
           <Edit
            className="cursor-pointer"
            onClick={() => handleEdit(row.user_id)}
            size={17}
            id={`send-tooltip-${row.id}`}
          />
          &nbsp;
          <Trash
            className="cursor-pointer"
            onClick={() => window.confirm("Are you sure you want to delete") && handleDelete(row.user_id)}
            // onClick={() => ConfirmDialog() }
            size={17}
            id={`send-tooltip-${row.id}`}
          />
          &nbsp;
          <Switch
            isChecked={row.is_active}
            handleClick={(e) => handleActivation(e.target.checked, row.user_id)}
          />
          {/* &nbsp;
          <Eye
            className="cursor-pointer"
            onClick={() => handleView(row.user_id)}
            size={17}
            id={`send-tooltip-${row.id}`}
          /> */}
        </>
      ),
    },
  ];

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleDelete = (id) => {
    setLoader(true);
    deleteUser(id).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false);
      }
      handleUserData();
      navigate("/apps/addUserManagement");
    });
  };

  const handleEdit = (id) => {
    navigate(`/apps/editUserManagement/${id}`)
  }

  const handleView = (id) => {
    navigate(`/apps/view/${id}`)
  }

  const handleActivation = (check,id) => {
    const body = {
      isActive: check
    }
    setLoader(true);
    activeUserData(id, body).then((res)=>{
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false);
      }
      handleUserData();
    })
  };

  const handleUserData = () => {
    let body = {
      page: currentPage,
      limit: rowsPerPage
    };
    setLoader(true);
    listUser(body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserData(res?.data?.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log("error", err));
  };

    const [screenWidth, setScreenWidth] = useState({
    width: window.innerWidth
  });

  const setDimension = () => {
    setScreenWidth({
      width: window.innerWidth
    })
  }

  const [userContainer, setUserContainer] = useState({
      display: "flex",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      columnGap: "20px"
  });

  const [userForm, setUserForm] = useState({
    marginTop: "20px",
    width: "40%",
  });

  const [userList, setUserList] = useState({
    width: "60%"
  });

  useEffect(() => {
    handleUserData();
    window.addEventListener('resize', setDimension);

    if(screenWidth.width > 720){
      setUserContainer({
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        columnGap: "20px"
      })
      setUserForm({
        marginTop: "20px",
        width: "40%",
      })
      setUserList({
        width: "60%"
      })
      
    } else{
      setUserContainer({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        columnGap: "20px"
      })
      setUserForm({
        marginTop: "0",
        width: "100%",
      })
      setUserList({
        width: "100%"
      })
    }
    
    return(() => {
      window.removeEventListener('resize', setDimension);
    })

  }, [currentPage,screenWidth]);

  const CustomPagination = () => {
    const count = Number(Math.ceil(userData?.total / rowsPerPage));
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // const userManagement = {
  //   userContainer: {
  //     display: "flex",
  //     justifyContent: "center",
  //     width: "100%",
  //     height: "100%",
  //     columnGap: "20px"
  //   },

  //   userForm: {
  //     marginTop: "20px",
  //     width: "40%",
  //   },

  //   userList: {
  //     width: "60%",
  //   }
  // }

  const boxContainer = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }

  const emptyImage = {
    width: "30%",
    height: "30%"
  }

  const emptyBoxTextContainer = {
    fontSize: "15px",
    color: "rgba(0,0,0,0.87)"
  }

  return (
    <div style={userContainer} className='index'>
      {loader ? (
        <>
          <AddUser userForm={userForm} />
          <div style={userList}>
            <div style={boxContainer}>
              <img src={empty} alt="empty" />
              <div style={emptyBoxTextContainer}>
                <span>No data found</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <AddUser userForm={userForm} />
          <div style={userList}>
            {/* <Button color="primary" >Add user</Button>
            onClick={() => navigate("/apps/addUserManagement")} */}
            <br></br>
            <br></br>
            <Table
              pagination
              columns={columns}
              dataToRender={userData?.data}
              CustomPagination={CustomPagination}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
