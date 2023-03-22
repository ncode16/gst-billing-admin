import { Edit, MoreVertical, Send } from "react-feather";

export const columns = [
  {
    name: "FirstName",
    sortable: true,
    minWidth: "300px",
    sortField: "first_name",
    selector: (row) => row.first_name,
    cell: (row) => (
      <>
        <span>{row.first_name}</span>
      </>
    ),
  },
  {
    name: "LastName",
    sortable: true,
    minWidth: "300px",
    sortField: "last_name",
    selector: (row) => row.last_name,
    cell: (row) => (
      <>
        <span>{row.last_name}</span>
      </>
    ),
  },
  {
    name: "Mobile No",
    sortable: true,
    minWidth: "300px",
    sortField: "mobile_number",
    selector: (row) => row.mobile_number,
    cell: (row) => (
      <>
        <span>{row.mobile_number}</span>
      </>
    ),
  },
  {
    name: "Email",
    sortable: true,
    minWidth: "300px",
    sortField: "email",
    selector: (row) => row.email,
    cell: (row) => (
      <>
        <span>{row.email}</span>
      </>
    ),
  },
  {
    name: "Action",
    minWidth: "110px",
    cell: (row) => (
      <Edit
        className="cursor-pointer"
        onClick={() => console.log("eee", row.user_id)}
        size={17}
        id={`send-tooltip-${row.id}`}
      />
    ),
  },
];
