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
// import { Button } from "reactstrap";

// import AddUserManagement from "./addUserManagement";
// import AddUser from "./addUser";

const View = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const columns = [
    {
      name: "Title",
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
      name: "Data",
      sortable: true,
      minWidth: "200px",
      sortField: "last_name",
      selector: (row) => row.last_name,
      cell: (row) => (
        <>
          <span>{row.last_name}</span>
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

export default View;
