import React, { useEffect } from "react";
import { Table, Button, Switch } from "../../../common";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  getCategoryData,
  deleteCategoryData,
  activeCategoryData
} from "../../../../api/categoryManagement/categoryManagement";

// ** Spinner (Splash Screen)
import Spinner from "../../../../@core/components/spinner/Loading-spinner";

import { Edit, Trash, Eye } from "react-feather";
import { ShowToast } from "../../../../utility/Utils";
import { toast } from "react-hot-toast";
import AddCategory from "../addCategoryManagement/addCategory";


const ListCategory = () => {
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const columns = [
    {
      name: "Category Name",
      sortable: true,
      minWidth: "250px",
      sortField: "category_name",
      selector: (row) => row.category_name,
      cell: (row) => (
        <>
          <span>{row.category_name}</span>
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
            onClick={() => handleEdit(row.category_id)}
            size={17}
            id={`send-tooltip-${row.category_id}`}
          />
          &nbsp;
          <Trash
            className="cursor-pointer"
            onClick={() => handleDelete(row.category_id)}
            size={17}
            id={`send-tooltip-${row.category_id}`}
          />
          &nbsp;
          <Switch
            isChecked={row.is_active}
            handleClick={(e) => handleActivation(e.target.checked, row.category_id)}
          />
          {/* &nbsp;
          <Eye
            className="cursor-pointer"
            onClick={() => handleView(row.user_id)}
            size={17}
            id={`send-tooltip-${row.id}`}
          /> */}
        </>
      ),
    },
  ];

  const handleDelete = (id) => {
    setLoader(true)
    deleteCategoryData(id).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false)
      }
      handleCategoryData();
      navigate("/apps/addCategoryManagement");
    });
  };

  const handleEdit = (id) => {
    navigate(`/apps/editCategoryManagement/${id}`)
  }

  const handleView = (id) => {
    navigate(`/apps/view/${id}`)
  }

  const handleActivation = (check, id) => {
    const body = {
      isActive: check
    }
    setLoader(true);
    activeCategoryData(id, body).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false);
      }
      handleCategoryData();
    })
  };

  const handleNavigate = () => {
    navigate("/apps/addCategoryManagement");
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleCategoryData = () => {
    let body = {
      page: currentPage,
      limit: rowsPerPage
    };
    setLoader(true);
    getCategoryData(body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserData(res?.data?.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log("error", err));
  };


  const [screenWidth, setScreenWidth] = useState({
    width: window.innerWidth
  });

  const setDimension = () => {
    setScreenWidth({
      width: window.innerWidth
    })
  }

  const [catContainer, setCatContainer] = useState({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    columnGap: "20px"
  });

  const [catForm, setCatForm] = useState({
    marginTop: "20px",
    width: "40%",
  });

  const [catList, setCatList] = useState({
    width: "60%"
  });

  useEffect(() => {
    handleCategoryData();
    window.addEventListener('resize', setDimension);

    if(screenWidth.width > 720){
      setCatContainer({
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        columnGap: "20px"
      })
      setCatForm({
        marginTop: "20px",
        width: "40%",
      })
      setCatList({
        width: "60%"
      })
      
    } else{
      setCatContainer({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        columnGap: "20px"
      })
      setCatForm({
        marginTop: "0",
        width: "100%",
      })
      setCatList({
        width: "100%"
      })
    }
    
    return(() => {
      window.removeEventListener('resize', setDimension);
    })
  }, [currentPage,screenWidth]);

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

  // const categoryManagement = {
  //   catContainer: {
  //     display: "flex",
  //     justifyContent: "center",
  //     width: "100%",
  //     height: "100%",
  //     columnGap: "20px"
  //   },

  //   catForm: {
  //     marginTop: "20px",
  //     width: "40%",
  //     // border: "1px solid red"
  //   },

  //   catList: {
  //     width: "60%",
  //   }
  // }

  return (
    <div style={catContainer}>
      {loader ? (
        <>
          <div style={catForm}>
            <AddCategory />
          </div>
          <div style={catList}>
            {/* <Button
              type="button"
              label="Add Category"
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
          <div style={catForm}>
            <AddCategory />
          </div>
          <div style={catList}>
            {/* <Button
              type="button"
              label="Add Category"
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

export default ListCategory;
