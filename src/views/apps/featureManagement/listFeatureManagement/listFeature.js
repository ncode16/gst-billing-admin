import React, { useEffect } from "react";
import { Table, Button, Switch } from "../../../common";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { getFeatureData, deleteFeatureData, activeFeatureData } from "../../../../api/featureManagement/featureApi";
import { Edit, Trash, Eye } from "react-feather";

// ** Spinner (Splash Screen)
import Spinner from "../../../../@core/components/spinner/Loading-spinner";
import { ShowToast } from "../../../../utility/Utils";
import { toast } from "react-hot-toast";
import AddFeature from "../addFeatureManagement/addFeature";

import empty from '../../../../assets/images/empty/empty.svg'

const ListFeature = () => {
  const navigate = useNavigate();
  const history = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleNavigate = () => {
    navigate("/apps/addFeatureManagement");
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const columns = [
    {
      name: "Feature Name",
      sortable: true,
      minWidth: "200px",
      sortField: "feature_name",
      selector: (row) => row.feature_name,
      cell: (row) => (
        <>
          <span>{row.feature_name}</span>
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
            onClick={() => handleEdit(row.feature_id)}
            size={17}
            id={`send-tooltip-${row.feature_id}`}
          />
          &nbsp;
          <Trash
            className="cursor-pointer"
            onClick={() => window.confirm("Are you sure you want to delete") && handleDelete(row.feature_id)}
            size={17}
            id={`send-tooltip-${row.feature_id}`}
          />
          &nbsp;
          <Switch
            isChecked={row.is_active}
            handleClick={(e) => handleActivation(e.target.checked, row.feature_id)}
          />
          {/* &nbsp;
          <Eye
            className="cursor-pointer"
            onClick={() => handleView(row.feature_id)}
            size={17}
            id={`send-tooltip-${row.feature_id}`}
          /> */}
        </>
      ),
    },
  ];

  const handleFeatureData = () => {
    let body = {
      page: currentPage,
      limit: rowsPerPage
    };
    setLoader(true);
    getFeatureData(body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserData(res?.data?.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log("error", err));
  }

  const handleEdit = (id) => {
    // AddFeature(id);
    history(`/apps/editFeatureManagement/${id}`)
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

  const [featureContainer, setFeatureContainer] = useState({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    columnGap: "20px"
  });

  const [featureForm, setFeatureForm] = useState({
    marginTop: "20px",
    width: "40%",
  });

  const [featureList, setFeatureList] = useState({
    width: "60%"
  });

  useEffect(() => {
    handleFeatureData()
    window.addEventListener('resize', setDimension);

    if(screenWidth.width > 720){
      setFeatureContainer({
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        columnGap: "20px"
      })
      setFeatureForm({
        marginTop: "20px",
        width: "40%",
      })
      setFeatureList({
        width: "60%"
      })
      
    } else{
      setFeatureContainer({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        columnGap: "20px"
      })
      setFeatureForm({
        marginTop: "0",
        width: "100%",
      })
      setFeatureList({
        width: "100%"
      })
    }
    
    return(() => {
      window.removeEventListener('resize', setDimension);
    })
  }, [currentPage,screenWidth]);

  const handleDelete = (id) => {
    setLoader(true)
    deleteFeatureData(id).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false);
        navigate("/apps/addFeatureManagement");
      }
      handleFeatureData();
    });
  };

  const handleActivation = (check, id) => {
    const body = {
      isActive: check
    }
    setLoader(true);
    activeFeatureData(id, body).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false);
      }
      handleFeatureData();
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

  // const featureManagement = {
  //   featureContainer: {
  //     display: "flex",
  //     justifyContent: "center",
  //     width: "100%",
  //     height: "100%",
  //     columnGap: "20px"
  //   },

  //   featureForm: {
  //     marginTop: "20px",
  //     width: "40%",
  //     // border: "1px solid red"
  //   },

  //   featureList: {
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
    <div style={featureContainer}>
      {loader ? (
        <>
          <div style={featureForm}>
            <AddFeature />
          </div>
          <div style={featureList}>
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
          <div style={featureForm}>
            <AddFeature />
          </div>
          <div style={featureList}>
            {/* <Button
              type="button"
              label="Add Feature"
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

export default ListFeature;
