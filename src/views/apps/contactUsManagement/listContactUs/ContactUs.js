import React, { useEffect } from "react";
// import { Button } from "../../common";
// import { columns } from "./columns";
// import { dummyData } from "./data";
import { Table } from "../../../common";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { getContactUsData, sendEmailData } from "../../../../api/contactUs/contactUsApi";
import { Send } from "react-feather";

// ** Spinner (Splash Screen)
import Spinner from "../../../../@core/components/spinner/Loading-spinner";
import { toast } from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";
import { useNavigate, useParams } from "react-router-dom";

import empty from '../../../../assets/images/empty/empty.svg'
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress"; 

const ContactUs = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const columns = [
    {
      name: "Contact Name",
      sortable: true,
      minWidth: "190px",
      sortField: "contactName",
      selector: (row) => row.contact_name,
      cell: (row) => (
        <>
          <span>{row.contact_name}</span>
        </>
      ),
    },
    {
      name: "Contact Phone",
      sortable: true,
      minWidth: "200px",
      sortField: "contactPhone",
      selector: (row) => row.contact_phone,
      cell: (row) => (
        <>
          <span>{row.contact_phone}</span>
        </>
      ),
    },
    {
      name: "Contact Message",
      sortable: true,
      minWidth: "300px",
      sortField: "companyMessage",
      selector: (row) => row.contact_message,
      cell: (row) => (
        <>
          <span>{row.contact_message}</span>
        </>
      ),
    },
    // {
    //   name: "City",
    //   sortable: true,
    //   minWidth: "150px",
    //   sortField: "City",
    //   selector: (row) => row.contact_city,
    //   cell: (row) => (
    //     <>
    //       <span>{row.contact_city}</span>
    //     </>
    //   ),
    // },
    // {
    //   name: "Country",
    //   sortable: true,
    //   minWidth: "150px",
    //   sortField: "Country",
    //   selector: (row) => row.contact_country,
    //   cell: (row) => (
    //     <>
    //       <span>{row.contact_country}</span>
    //     </>
    //   ),
    // },
    {
      name: "Contact Email",
      sortable: true,
      minWidth: "250px",
      sortField: "  contactEmail",
      selector: (row) => row.contact_email,
      cell: (row) => (
        <>
          <span>{row.contact_email}</span>
        </>
      ),
    },
    {
      name: "Action",
      minWidth: "110px",
      cell: (row) => (
        <>
          <Send
            className="cursor-pointer"
            // onClick={() => handleSendEmail(row.contact_email)}
            onClick={() => handleSendEmail(row.contact_id)}
            size={17}
            id={`send-tooltip-${row.contact_id}`}
          />
        </>
      ),
    },
  ];

  const emptyColumns = [
    {
      name: "Contact Name",
      sortable: true,
      minWidth: "190px",
      sortField: "contactName",
      selector: (row) => row.contact_name,
      cell: (row) => (
        <>
          <span>{row.contact_name}</span>
        </>
      ),
    },
    {
      name: "Contact Phone",
      sortable: true,
      minWidth: "200px",
      sortField: "contactPhone",
      selector: (row) => row.contact_phone,
      cell: (row) => (
        <>
          <span>{row.contact_phone}</span>
        </>
      ),
    },
    {
      name: "Contact Message",
      sortable: true,
      minWidth: "300px",
      sortField: "companyMessage",
      selector: (row) => row.contact_message,
      cell: (row) => (
        <>
          <span>{row.contact_message}</span>
        </>
      ),
    },
    // {
    //   name: "City",
    //   sortable: true,
    //   minWidth: "150px",
    //   sortField: "City",
    //   selector: (row) => row.contact_city,
    //   cell: (row) => (
    //     <>
    //       <span>{row.contact_city}</span>
    //     </>
    //   ),
    // },
    // {
    //   name: "Country",
    //   sortable: true,
    //   minWidth: "150px",
    //   sortField: "Country",
    //   selector: (row) => row.contact_country,
    //   cell: (row) => (
    //     <>
    //       <span>{row.contact_country}</span>
    //     </>
    //   ),
    // },
    {
      name: "Contact Email",
      sortable: true,
      minWidth: "250px",
      sortField: "  contactEmail",
      selector: (row) => row.contact_email,
      cell: (row) => (
        <>
          <span>{row.contact_email}</span>
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

  // const handleSendEmail = (data) => {
  //   const body = {
  //     email: data
  //   }
  //   setLoader(true)
  //   sendEmailData(body).then((res) => {
  //     if (res?.data?.statusCode == 200) {
  //       toast((t) => (
  //         <ShowToast t={t} color="success" name={res?.data?.message} />
  //       ));
  //       setLoader(false)
  //     }
  //   })
  // }

  const handleSendEmail = (id) => {
    navigate(`/apps/addContactUsManagement/${id}`);
  }

  useEffect(() => {
    let body = {
      page: currentPage,
      limit: rowsPerPage
    };
    setLoader(true);
    getContactUsData(body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserData(res?.data?.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log("error", err));

    setTimeout(function () {
      setIsFetching(false); 
    }, 250);

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
      {userData.data && userData.data.length == 0 ? (
        <>
        { isFetching ?  
          <div style={boxContainer}>     
          <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
          </Box></div> :
          <Table
            // pagination
            columns={emptyColumns}
            dataToRender={['']}
            CustomPagination={CustomPagination}
          />
        }
          {emptyBox}
        </>
        
      ) : (
        <>
          {/* <Button onClick={handleNavigate} label="Add User" />
          <br></br>
          <br></br> */}
          { isFetching ?     
              <div style={boxContainer}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
              </div>   :
            <Table
              pagination
              columns={columns}
              dataToRender={userData.data}
              CustomPagination={CustomPagination}
            />
          }
        </>
      )}
    </div>
  );
};

export default ContactUs;
