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
import { Edit, Trash } from "react-feather";
// ** Spinner (Splash Screen)
import Spinner from "../../../../@core/components/spinner/Loading-spinner";



const ListTutorial = () => {
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleNavigate = () => {
    navigate("/apps/addTutorialManagement");
  };

  const columns = [
    {
      name: "Tutorial Tittle",
      sortable: true,
      minWidth: "190px",
      sortField: "tutorial_title",
      selector: (row) => row.tutorial_title,
      cell: (row) => (
        <>
          <span>{row.tutorial_title}</span>
        </>
      ),
    },
    {
      name: "Tutorial Link",
      sortable: true,
      minWidth: "900px",
      sortField: "videoLink",
      selector: (row) => row.tutorial_link,
      cell: (row) => (
        <>
          <span>{row.tutorial_link}</span>
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
            onClick={() => handleEdit(row.tutorial_id)}
            size={17}
            id={`send-tooltip-${row.tutorial_id}`}
          /> &nbsp;
          <Trash
            className="trash-pointer"
            onClick={() => handleDelete(row.tutorial_id)}
            size={17}
            id={`send-tooltip-${row.tutorial_id}`}
          />
          &nbsp;
          <Switch
            isChecked={row.is_active}
            handleClick={(e) => handleActivation(e?.target?.checked, row?.tutorial_id)}
          />
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


  useEffect(() => {
    handleTutorialData()
  }, [])

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
          <Button
            type="button"
            label="Add Tutorial"
            onClick={() => handleNavigate()}
          />
          <br></br>
          <br></br>
          <Table
            columns={columns}
            dataToRender={userData?.data}
            pagination
            CustomPagination={CustomPagination}
          />
        </>
      )}
    </div>
  );
};

export default ListTutorial;
