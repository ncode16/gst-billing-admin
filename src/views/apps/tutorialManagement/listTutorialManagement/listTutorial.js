import React, { useEffect } from "react";
import { dummyData } from "../dummyData";
import { Table, Button, Switch } from "../../../common";
import { columns } from "../columns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";
import { getTutorialData, deleteTutorialData, activeTutorialData } from "../../../../api/tutorialManagement/tutorialApi";
import { Edit, Trash, Eye } from "react-feather";
// ** Spinner (Splash Screen)
import Spinner from "../../../../@core/components/spinner/Loading-spinner";
import AddTutorial from "../addTutorialManagement/addTutorial";



const ListTutorial = () => {
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleNavigate = () => {
    navigate("/apps/addTutorialManagement");
  };

  const handleView = (id) => {
    navigate(`/apps/view/${id}`)
  }

  const columns = [
    {
      name: "Tutorial Tittle",
      sortable: true,
      minWidth: "110px",
      sortField: "tutorial_title",
      selector: (row) => row.tutorial_title,
      cell: (row) => (
        <>
          <span>{row.tutorial_title}</span>
        </>
      ),
    },
    // {
    //   name: "Tutorial Link",
    //   sortable: true,
    //   minWidth: "600px",
    //   sortField: "videoLink",
    //   selector: (row) => row.tutorial_link,
    //   cell: (row) => (
    //     <>
    //       <span>{row.tutorial_link}</span>
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
            onClick={() => handleEdit(row.tutorial_id)}
            size={17}
            id={`send-tooltip-${row.tutorial_id}`}
          /> &nbsp;
          <Trash
            className="cursor-pointer"
            onClick={() => handleDelete(row.tutorial_id)}
            size={17}
            id={`send-tooltip-${row.tutorial_id}`}
          />
          &nbsp;
          <Switch
            isChecked={row.is_active}
            handleClick={(e) => handleActivation(e?.target?.checked, row?.tutorial_id)}
          />
          {/* &nbsp;
          <Eye
            className="cursor-pointer"
            onClick={() => handleView(row.tutorial_id)}
            size={17}
            id={`send-tooltip-${row.tutorial_id}`}
          /> */}
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    navigate(`/apps/editTutorialManagement/${id}`)
  }

  const handleDelete = (id) => {
    setLoader(true)
    deleteTutorialData(id).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false)
      }
      handleTutorialData();
      navigate("/apps/addTutorialManagement");
    });
  };

  const handleActivation = (check, id) => {
    const body = {
      isActive: check
    }
    setLoader(true);
    activeTutorialData(id, body).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false);
      }
      handleTutorialData();
    })
  };

  const handleTutorialData = () => {
    let body = {
      page: currentPage,
      limit: rowsPerPage
    };
    setLoader(true);
    getTutorialData(body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log('calling')
          setUserData(res?.data?.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log("error", err));
  }

  const [screenWidth, setScreenWidth] = useState({
    width: window.innerWidth
  });

  const setDimension = () => {
    setScreenWidth({
      width: window.innerWidth
    })
  }

  const [tutoContainer, setTutoContainer] = useState({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    columnGap: "20px"
  });

  const [tutoForm, setTutoForm] = useState({
    marginTop: "20px",
    width: "40%",
  });

  const [tutoList, setTutoList] = useState({
    width: "60%"
  });

  useEffect(() => {
    handleTutorialData()
    window.addEventListener('resize', setDimension);

    if(screenWidth.width > 720){
      setTutoContainer({
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        columnGap: "20px"
      })
      setTutoForm({
        marginTop: "20px",
        width: "40%",
      })
      setTutoList({
        width: "60%"
      })
      
    } else{
      setTutoContainer({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        columnGap: "20px"
      })
      setTutoForm({
        marginTop: "0",
        width: "100%",
      })
      setTutoList({
        width: "100%"
      })
    }
    
    return(() => {
      window.removeEventListener('resize', setDimension);
    })
  }, [screenWidth])

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

  // const tutorialManagement = {
  //   tutoContainer: {
  //     display: "flex",
  //     justifyContent: "center",
  //     width: "100%",
  //     height: "100%",
  //     columnGap: "20px"
  //   },

  //   tutoForm: {
  //     marginTop: "20px",
  //     width: "40%",
  //     // border: "1px solid red"
  //   },

  //   tutoList: {
  //     width: "60%",
  //   }
  // }

  return (
    <div style={tutoContainer}>
      {loader ? (
        <>
          <div style={tutoForm}>
            <AddTutorial />
          </div>
          <div style={tutoList}>
            {/* <Button
              type="button"
              label="Add Tutorial"
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
          <div style={tutoForm}>
            <AddTutorial />
          </div>
          <div style={tutoList}>
            {/* <Button
              type="button"
              label="Add Tutorial"
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

export default ListTutorial;
