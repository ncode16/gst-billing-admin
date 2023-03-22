import { Send } from "react-feather";

export const columns = [
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
          onClick={() => console.log("eee", row.id)}
          size={17}
          id={`send-tooltip-${row.id}`}
        />
      </>
    ),
  },
];
