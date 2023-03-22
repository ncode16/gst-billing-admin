import React, { useEffect } from "react";
// import { dummyData } from "../dummyData";
import { Table, Button, Switch } from "../../../common";
// import { columns } from "../columns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { getFaqData, activeFaqData, deleteFeqData } from "../../../../api/faqManagement/faqApi";
import { Trash, Edit, Eye } from "react-feather";

// ** Spinner (Splash Screen)
import Spinner from "../../../../@core/components/spinner/Loading-spinner";
import { ShowToast } from "../../../../utility/Utils";
import { toast } from "react-hot-toast";
import AddFaq from "../addFaqManagement/addFaq";

const ListFaq = () => {
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const columns = [
    {
      name: "FAQ",
      sortable: true,
      minWidth: "100px",
      sortField: "title",
      selector: (row) => row.title,
      cell: (row) => (
        <>
          <span>{row.title}</span>
        </>
      ),
    },
    // {
    //   name: "Description",
    //   sortable: true,
    //   minWidth: "600px",
    //   sortField: "desc",
    //   selector: (row) => row.description,
    //   cell: (row) => (
    //     <>
    //       <span>{row.description}</span>
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
            onClick={() => handleEdit(row.faq_id)}
            size={17}
            id={`send-tooltip-${row.id}`}
          />
          &nbsp;
          <Trash
            className="cursor-pointer"
            onClick={() => handleDelete(row.faq_id)}
            size={17}
            id={`send-tooltip-${row.faq_id}`}
          />
          &nbsp;
          <Switch
            isChecked={row.is_active}
            handleClick={(e) => handleActivation(e.target.checked, row.faq_id)}
          />
          {/* &nbsp;
          <Eye
            className="cursor-pointer"
            onClick={() => handleView(row.faq_id)}
            size={17}
            id={`send-tooltip-${row.faq_id}`}
          /> */}
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    navigate(`/apps/editFaqManagement/${id}`)
  }

  const handleFaqData = () => {
    let body = {
      page: currentPage,
      limit: rowsPerPage
    };
    setLoader(true);
    getFaqData(body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserData(res?.data?.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log("error", err));
  }

  useEffect(() => {
    handleFaqData()
  }, [currentPage]);

  const handleNavigate = () => {
    navigate("/apps/addFaqManagement");
  };
  
  const handleView = (id) => {
    navigate(`/apps/view/${id}`)
  }

  const handleDelete = (id) => {
    setLoader(true);
    deleteFeqData(id).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false);
      }
      handleFaqData();
      navigate("/apps/addFaqManagement");
    });
  };

  const handleActivation = (check, id) => {
    const body = {
      isActive: check
    }
    setLoader(true);
    activeFaqData(id, body).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false);
      }
      handleFaqData();
    })
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

  const faqManagement = {
    faqContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      columnGap: "20px"
    },

    faqForm: {
      marginTop: "20px",
      width: "40%",
      // border: "1px solid red"
    },

    faqList: {
      width: "60%",
    }
  }

  return (
    <div style={faqManagement.faqContainer}>
      {loader ? (
        <>
          <div style={faqManagement.faqForm}>
            <AddFaq />
          </div>
          <div style={faqManagement.faqList}>
            {/* <Button
              type="button"
              label="Add FAQ"
              onClick={() => handleNavigate()}
            /> */}
            <br></br>
            <br></br>
            <Table
              columns={columns}
              dataToRender={userData?.data}
              pagination
              CustomPagination={CustomPagination}
            />
          </div>
        </>
      ) : (
        <>
          <div style={faqManagement.faqForm}>
            <AddFaq />
          </div>
          <div style={faqManagement.faqList}>
            {/* <Button
              type="button"
              label="Add FAQ"
              onClick={() => handleNavigate()}
            /> */}
            <br></br>
            <br></br>
            <Table
              columns={columns}
              dataToRender={userData?.data}
              pagination
              CustomPagination={CustomPagination}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ListFaq;
