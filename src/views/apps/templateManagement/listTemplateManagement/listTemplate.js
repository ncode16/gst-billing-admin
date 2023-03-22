import React, { useEffect } from "react";
import { dummyData } from "../dummyData";
import { Table, Button, Switch } from "../../../common";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Trash, Edit } from "react-feather";
import { toast } from "react-hot-toast";
import { ShowToast } from "../../../../utility/Utils";
import { getTemplateData, deleteTemplateData, activeTemplateData } from "../../../../api/templateManagement/template";
// ** Spinner (Splash Screen)
import Spinner from "../../../../@core/components/spinner/Loading-spinner";

const ListTemplate = () => {
  const navigate = useNavigate();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleNavigate = () => {
    navigate("/apps/addTemplateManagement");
  };

  const columns = [
    {
      name: "Image Link",
      sortable: true,
      minWidth: "500px",
      sortField: "imageLink",
      selector: (row) => row.template_image,
      cell: (row) => (
        <>
          <span>{row.template_image}</span>
        </>
      ),
    },
    {
      name: "Image Name",
      sortable: true,
      minWidth: "600px",
      sortField: "imageLink",
      selector: (row) => row.template_name,
      cell: (row) => (
        <>
          <span>{row.template_name}</span>
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
            onClick={() => handleEdit(row.template_id)}
            size={17}
            id={`send-tooltip-${row.template_id}`}
          />
          &nbsp;
          <Trash
            className="trash-pointer"
            onClick={() => handleDelete(row.template_id)}
            size={17}
            id={`send-tooltip-${row.id}`}
          />
          &nbsp;
          <Switch
            isChecked={row.is_active}
            handleClick={(e) => handleActivation(e.target.checked, row.template_id)}
          />
        </>
      ),
    },
  ];


  const handleDelete = (id) => {
    deleteTemplateData(id).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
      }
      handleTemplateData();
    });
  };

  const handleActivation = (check, id) => {
    const body = {
      isActive: check
    }
    setLoader(true);
    activeTemplateData(id, body).then((res) => {
      if (res?.data?.statusCode == 200) {
        toast((t) => (
          <ShowToast t={t} color="success" name={res?.data?.message} />
        ));
        setLoader(false);
      }
      handleTemplateData();
    })
  };

  const handleTemplateData = () => {
    let body = {
      page: currentPage,
      limit: rowsPerPage
    };
    setLoader(true);
    getTemplateData(body)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserData(res?.data?.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log("error", err));
  };

  const handleEdit = (id) => {
    navigate(`/apps/editTemplateManagement/${id}`)
  }

  useEffect(() => {
    handleTemplateData();
  }, [currentPage]);




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
        // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        // onPageChange={(page) => handlePagination(page)}
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
            label="Add Template"
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

export default ListTemplate;
