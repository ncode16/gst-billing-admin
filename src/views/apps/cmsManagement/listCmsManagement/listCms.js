import React, { useEffect } from "react";
import { dummyData } from "../dummyData";
import { Table, Button, Switch } from "../../../common";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Trash, Edit, Eye } from "react-feather";
import { getCmsData, deleteCmsData, activeCmsData } from "../../../../api/cmsManagement/cmsApi";
import { toast } from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";
// ** Spinner (Splash Screen)
import Spinner from "../../../../@core/components/spinner/Loading-spinner";
import AddCms from "../addCmsManagement/addCms";

import CircularProgress from "@mui/material/CircularProgress"; 
import { Box } from "@mui/material";

import empty from '../../../../assets/images/empty/empty.svg'

const ListCms = () => {
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const columns = [
    {
      name: "CMS Name",
      sortable: true,
      minWidth: "150px",
      sortField: "title",
      selector: (row) => row.aboutus_title,
      cell: (row) => (
        <>
          <span>{row.aboutus_title}</span>
        </>
      ),
    },
    {
      name: "Description",
      sortable: true,
      minWidth: "550px",
      sortField: "description",
      selector: (row) => row.aboutus_description,
      cell: (row) => (
        <>
          <span>{row.aboutus_description}</span>
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
            onClick={() => handleEdit(row.aboutus_id)}
            size={17}
            id={`send-tooltip-${row.aboutus_id}`}
          />
          &nbsp;
          <Trash
            className="cursor-pointer"
            onClick={() => window.confirm("Are you sure you want to delete") && handleDelete(row.aboutus_id)}
            size={17}
            id={`send-tooltip-${row.id}`}
          />
          &nbsp;
          <Switch
            isChecked={row.is_active}
            handleClick={(e) => handleActivation(e.target.checked, row.aboutus_id)}
          />
          {/* &nbsp;
          <Eye
            className="cursor-pointer"
            onClick={() => handleView(row.aboutus_id)}
            size={17}
            id={`send-tooltip-${row.id}`}
          /> */}
        </>
      ),
    },
  ];

  const emptyColumns = [
    {
      name: "CMS Name",
      sortable: true,
      minWidth: "150px",
      sortField: "title",
      selector: (row) => row.aboutus_title,
      cell: (row) => (
        <>
          <span>{row.aboutus_title}</span>
        </>
      ),
    },
    {
      name: "Description",
      sortable: true,
      minWidth: "550px",
      sortField: "description",
      selector: (row) => row.aboutus_description,
      cell: (row) => (
        <>
          <span>{row.aboutus_description}</span>
        </>
      ),
    },
    {
      name: "Action",
      minWidth: "110px",
      cell: (row) => (
        <>
        </>
      ),
    },
  ];

  const handleDelete = (id) => {
    setLoader(true)
    deleteCmsData(id).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false)
      }
      handleCmsData();
      navigate("/apps/cmsManagement");
    });
  };

  const handleActivation = (check, id) => {
    const body = {
      isActive: check
    }
    setLoader(true);
    activeCmsData(id, body).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false);
      }
      handleCmsData();
    })
  };

  const handleCmsData = () => {
    let body = {
      page: currentPage,
      limit: rowsPerPage
    };
    setLoader(true);
    getCmsData(body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserData(res?.data?.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log("error", err));
  };

  const handleEdit = (id) => {
    navigate(`/apps/editCmsManagement/${id}`)
  }

  const handleView = (id) => {
    navigate(`/apps/view/${id}`)
  }

  useEffect(() => {
    handleCmsData();
    setTimeout(function () {
      setIsFetching(false); 
    }, 500);

  }, [currentPage]);


  const handleNavigate = () => {
    navigate("/apps/addCmsManagement");
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };


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

  const boxContainer = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
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

  const [emptyBox, setEmptyBox] = useState(
    <div style={boxContainer}>
      <img src={empty} alt="empty" />
      <div style={emptyBoxTextContainer}>
        <span>No data found</span>
      </div>
    </div>
  );

  return (
    <div>
      {userData.data && userData.data.length === 0 ? (
        <>
          <Button
            type="button"
            label="Add CMS"
            onClick={() => handleNavigate()}
          />
          <br></br>
          <br></br>
          { isFetching ?  
            <div style={boxContainer}>     
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box></div> :
            <Table
              columns={emptyColumns}
              dataToRender={['']}
              // pagination
              CustomPagination={CustomPagination}
            />
          }
          {emptyBox}
        </>
      ) : (
        <>
            <Button
              type="button"
              label="Add CMS"
              onClick={() => handleNavigate()}
            />
            <br></br>
            <br></br>
            { isFetching ?      
              <div style={boxContainer}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
              </div>  :
              <Table
                columns={columns}
                dataToRender={userData?.data}
                pagination
                CustomPagination={CustomPagination}
              />
            }
        </>
      )}
    </div>
  );
};

export default ListCms;
