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

import empty from '../../../../assets/images/empty/empty.svg'

const ListCms = () => {
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const columns = [
    {
      name: "Title",
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
    // {
    //   name: "Description",
    //   sortable: true,
    //   minWidth: "550px",
    //   sortField: "description",
    //   selector: (row) => row.aboutus_description,
    //   cell: (row) => (
    //     <>
    //       <span>{row.aboutus_description.replace(/<[^>]+>/g, '')}</span>
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
      navigate("/apps/addCmsManagement");
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

  const [screenWidth, setScreenWidth] = useState({
    width: window.innerWidth
  });

  const setDimension = () => {
    setScreenWidth({
      width: window.innerWidth
    })
  }

  const [cmsContainer, setCmsContainer] = useState({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    columnGap: "20px"
  });

  const [cmsForm, setCmsForm] = useState({
    marginTop: "20px",
    width: "40%",
  });

  const [cmsList, setCmsList] = useState({
    width: "60%"
  });

  useEffect(() => {
    handleCmsData();
    window.addEventListener('resize', setDimension);

    if(screenWidth.width > 720){
      setCmsContainer({
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        columnGap: "20px"
      })
      setCmsForm({
        marginTop: "20px",
        width: "40%",
      })
      setCmsList({
        width: "60%"
      })
      
    } else{
      setCmsContainer({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        columnGap: "20px"
      })
      setCmsForm({
        marginTop: "0",
        width: "100%",
      })
      setCmsList({
        width: "100%"
      })
    }
    
    return(() => {
      window.removeEventListener('resize', setDimension);
    })
  }, [currentPage,screenWidth]);


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

  // const cmsManagement = {
  //   cmsContainer: {
  //     display: "flex",
  //     justifyContent: "center",
  //     width: "100%",
  //     height: "100%",
  //     columnGap: "20px"
  //   },

  //   cmsForm: {
  //     marginTop: "20px",
  //     width: "40%",
  //     // border: "1px solid red"
  //   },

  //   cmsList: {
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
    <div style={cmsContainer}>

      {loader ? (
        <>
          <div style={cmsForm}>
            <AddCms />
          </div>
          <div style={cmsList}>
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
          <div style={cmsForm}>
            <AddCms />
          </div>
          <div style={cmsList}>
            {/* <Button
              type="button"
              label="Add CMS"
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

export default ListCms;
