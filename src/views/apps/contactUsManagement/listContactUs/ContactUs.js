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

const ContactUs = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const columns = [
    {
      name: "Contact Name",
      sortable: true,
      minWidth: "300px",
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
      minWidth: "300px",
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
    {
      name: "City",
      sortable: true,
      minWidth: "300px",
      sortField: "City",
      selector: (row) => row.contact_city,
      cell: (row) => (
        <>
          <span>{row.contact_city}</span>
        </>
      ),
    },
    {
      name: "Country",
      sortable: true,
      minWidth: "300px",
      sortField: "Country",
      selector: (row) => row.contact_country,
      cell: (row) => (
        <>
          <span>{row.contact_country}</span>
        </>
      ),
    },
    {
      name: "Contact Email",
      sortable: true,
      minWidth: "300px",
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
            onClick={() => handleSendEmail()}
            size={17}
            id={`send-tooltip-${row.id}`}
          />
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

  const handleSendEmail = () => {
    navigate("/apps/addContactUsManagement");
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
          {/* <Button onClick={handleNavigate} label="Add User" />
          <br></br>
          <br></br> */}
          <Table
            pagination
            columns={columns}
            dataToRender={userData.data}
            CustomPagination={CustomPagination}
          />
        </>
      )}
    </div>
  );
};

export default ContactUs;
