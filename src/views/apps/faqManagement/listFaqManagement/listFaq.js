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

import empty from '../../../../assets/images/empty/empty.svg'
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress"; 

const ListFaq = () => {
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

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
    {
      name: "Description",
      sortable: true,
      minWidth: "600px",
      sortField: "desc",
      selector: (row) => row.description,
      cell: (row) => (
        <>
          <span>{row.description}</span>
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
            onClick={() => handleEdit(row.faq_id)}
            size={17}
            id={`send-tooltip-${row.id}`}
          />
          &nbsp;
          <Trash
            className="cursor-pointer"
            onClick={() => window.confirm("Are you sure you want to delete") && handleDelete(row.faq_id)}
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

  const emptyColumns = [
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
    {
      name: "Description",
      sortable: true,
      minWidth: "600px",
      sortField: "desc",
      selector: (row) => row.description,
      cell: (row) => (
        <>
          <span>{row.description}</span>
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

  // const [screenWidth, setScreenWidth] = useState({
  //   width: window.innerWidth
  // });

  // const setDimension = () => {
  //   setScreenWidth({
  //     width: window.innerWidth
  //   })
  // }

  // const [faqContainer, setFaqContainer] = useState({
  //   display: "flex",
  //   justifyContent: "center",
  //   width: "100%",
  //   height: "100%",
  //   columnGap: "20px"
  // });

  // const [faqForm, setFaqForm] = useState({
  //   marginTop: "20px",
  //   width: "40%",
  // });

  // const [faqList, setFaqList] = useState({
  //   width: "60%"
  // });


  useEffect(() => {
    handleFaqData()
    // window.addEventListener('resize', setDimension);

    // if(screenWidth.width > 720){
    //   setFaqContainer({
    //     display: "flex",
    //     justifyContent: "center",
    //     width: "100%",
    //     height: "100%",
    //     columnGap: "20px"
    //   })
    //   setFaqForm({
    //     marginTop: "20px",
    //     width: "40%",
    //   })
    //   setFaqList({
    //     width: "60%"
    //   })
      
    // } else{
    //   setFaqContainer({
    //     display: "flex",
    //     flexDirection: "column",
    //     justifyContent: "center",
    //     width: "100%",
    //     height: "100%",
    //     columnGap: "20px"
    //   })
    //   setFaqForm({
    //     marginTop: "0",
    //     width: "100%",
    //   })
    //   setFaqList({
    //     width: "100%"
    //   })
    // }
    
    // return(() => {
    //   window.removeEventListener('resize', setDimension);
    // })
    setTimeout(function () {
      setIsFetching(false); 
    }, 250);

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
      navigate("/apps/faqManagement");
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

  // const faqManagement = {
  //   faqContainer: {
  //     display: "flex",
  //     justifyContent: "center",
  //     width: "100%",
  //     height: "100%",
  //     columnGap: "20px"
  //   },

  //   faqForm: {
  //     marginTop: "20px",
  //     width: "40%",
  //     // border: "1px solid red"
  //   },

  //   faqList: {
  //     width: "60%",
  //   }
  // }

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
          <div>
            <Button
              type="button"
              label="Add FAQ"
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
          </div>
        </>
      ) : (
        <>
          <Button
            type="button"
            label="Add FAQ"
            onClick={() => handleNavigate()}
          />
          <br></br>
          <br></br>
          { isFetching ?       
              <div style={boxContainer}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
              </div> :
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

export default ListFaq;
