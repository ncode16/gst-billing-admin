import React, { useEffect } from "react";
import { Table, Switch } from "../../common";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import {
  addUser,
  deleteUser,
  activeUserData
} from "../../../api/userManagement/userManagement";
import { Trash, Edit } from "react-feather";

// ** Spinner (Splash Screen)
import Spinner from "../../../@core/components/spinner/Loading-spinner";
import { ShowToast } from "../../../utility/Utils";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const UserManagement = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const columns = [
    {
      name: "FirstName",
      sortable: true,
      minWidth: "250px",
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
      minWidth: "250px",
      sortField: "last_name",
      selector: (row) => row.last_name,
      cell: (row) => (
        <>
          <span>{row.last_name}</span>
        </>
      ),
    },
    {
      name: "Mobile No",
      sortable: true,
      minWidth: "300px",
      sortField: "mobile_number",
      selector: (row) => row.mobile_number,
      cell: (row) => (
        <>
          <span>{row.mobile_number}</span>
        </>
      ),
    },
    {
      name: "Email",
      sortable: true,
      minWidth: "300px",
      sortField: "email",
      selector: (row) => row.email,
      cell: (row) => (
        <>
          <span>{row.email}</span>
        </>
      ),
    },
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
            onClick={() => handleDelete(row.user_id)}
            size={17}
            id={`send-tooltip-${row.id}`}
          />
          &nbsp;
          <Switch
            isChecked={row.is_active}
            handleClick={(e) => handleActivation(e.target.checked, row.user_id)}
          />
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
    });
  };

  const handleEdit = (id) => {
    navigate(`/apps/editUserManagement/${id}`)
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
    addUser(body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserData(res?.data?.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log("error", err));
  };

  useEffect(() => {
    handleUserData();
  }, [currentPage]);

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

  return (
    <div>
      {loader ? (
        <Spinner />
      ) : (
        <>
        <Button color="primary" onClick={() => navigate("/apps/addUserManagement")}>Add user</Button>
        <br></br>
        <br></br>
          <Table
            pagination
            columns={columns}
            dataToRender={userData?.data}
            CustomPagination={CustomPagination}
          />
        </>
      )}
    </div>
  );
};

export default UserManagement;
