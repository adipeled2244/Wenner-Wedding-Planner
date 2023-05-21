import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import classes from "./TableLayout.module.css";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Filters from "../Filters/Filters";
import { useEffect } from "react";
// const rows = [
//   {
//     name: "adi",
//     side: "groom",
//     group: "family",
//     email: "adipeeld224@gmail.com",
//     phone: "0626861776",
//     table: 1,
//     invitation: true,
//     attending: 4,
//   },
//   {
//     name: "Nofar",
//     side: "Bride",
//     group: "work",
//     email: "adipeeld224@gmail.com",
//     phone: "0626861776",
//     table: 2,
//     invitation: true,
//     attending: 4,
//   },  {
//     name: "nana",
//     side: "Bride",
//     group: "friends",
//     email: "adipeeld224@gmail.com",
//     phone: "0626861776",
//     table: 2,
//     invitation: true,
//     attending: 4,
//   },
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name", //was 'Dessert (100g serving)'
  },
  {
    id: "side",
    numeric: false, //was true
    disablePadding: false,
    label: "Side",
  },
  {
    id: "group",
    numeric: false,
    disablePadding: false,
    label: "Group",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "table",
    numeric: true,
    disablePadding: false,
    label: "Table",
  },
  {
    id: "invitation",
    numeric: false,
    disablePadding: false,
    label: "Invitaition",
  },
  {
    id: "attending",
    numeric: false,
    disablePadding: false,
    label: "Attending",
  },
  ,
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

// first line in table
import { useContext } from "react";
import UserContext from "../../Store/user-context";

function EnhancedTableHead(props) {

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            // color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all names", //was 'select all desserts'
            }}
            checkedIcon={<IndeterminateCheckBoxOutlinedIcon />}
            sx={{
              "&.Mui-checked": {
                color: "#ffffff",
              },
              "& .MuiSvgIcon-root": {
                color: "#9077F6",
              },
            }}
            // icon={<CheckBoxOutlinedIcon />}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.cell}
            key={headCell.id}
            align={"left"} //was {headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            // sx={{
            //     "&.MuiTableCell-root": {
            //       padding: "5",
            //     },
            //     "& .MuiSvgIcon-root": {
            //       color: "#9077F6",
            //     },
            //   }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <div className={classes.titleUpTable}>{headCell.label}</div>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// line for slected
function EnhancedTableToolbar(props) {
  const { numSelected,totalGuests } = props;

  return (
    // <Toolbar
    //   sx={{
    //     pl: { sm: 2 },
    //     pr: { xs: 1, sm: 1 },
    //     ...(numSelected > 0 && {
    //       bgcolor: (theme) =>
    //         alpha(
    //           theme.palette.primary.main,
    //           theme.palette.action.activatedOpacity
    //         ),
    //     }),
    //   }}
    // >
    // <div className={classes.tableTitle}>

    <div className={classes.tableTitle}>
      <div className={classes.title}>
        {" "}
        {numSelected} <span className={classes.miniTitle}>out of {totalGuests}</span>{" "}
        Guests selected
      </div>
      <Button
        variant="contained"
        size="small"
        key="send"
        onClick={() => {}}
        startIcon={<SendIcon />}
        style={{
          borderRadius: 35,
          color: "black",
          backgroundColor: "white",
          boxShadow: "none",
          border: "1px solid #E7E7EB",
        }}
      >
        Send invitation{" "}
      </Button>
    </div>

    // </div>
    //   {/*
    //   {numSelected > 0 ? (
    //     <Tooltip title="Delete">
    //       <IconButton>
    //         <DeleteIcon />
    //       </IconButton>
    //     </Tooltip>
    //   ) : (
    //     <Tooltip title="Filter list">
    //       <IconButton>
    //         <FilterListIcon />
    //       </IconButton>
    //     </Tooltip>
    //   )} */}
    // </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// main table
function EnhancedTable() {
    const {user:{
      guests
    }}=useContext(UserContext)

  const rows= guests;
  console.log(rows)
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [rowsAfterFilter, setRowsAfterFilter] = React.useState(rows);


  useEffect(() => {
    setRowsAfterFilter(rows)
  }, [rows])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

 
    //call from filter component
  const filterChange= (filtersMap)=>{
    let filteredRows=[]
    filteredRows= rows.filter(row=>{
      if(((row.attending == filtersMap.get('attending')) || filtersMap.get('attending')== "all")&&
        ((row.group == filtersMap.get('group')) || filtersMap.get('group')== "all") &&
        ((row.side == filtersMap.get('side')) || filtersMap.get('side')== "all")
      ){
        return true
      }
      return false;

  })
  setRowsAfterFilter(filteredRows)
  }

  //change table sort ,order, page
  const visibleRows = React.useMemo(
    () =>
    //changerows to rowsafterfilter
    {
      console.log("inside")
      console.log(rowsAfterFilter)
      return stableSort(rowsAfterFilter, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    },
    [order, orderBy, page, rowsPerPage,rows,rowsAfterFilter,guests]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Filters onFilterChange={filterChange} />
        <EnhancedTableToolbar numSelected={selected.length} totalGuests={rows.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, marginTop: "5px" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;
                
                return (
                  <TableRow
                    // hover
                    // onClick={(event) => handleClick(event, row.name)}
                    // role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    // sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.name)}
                        checkedIcon={<CheckBoxOutlinedIcon />}
                        sx={{
                          "&.Mui-checked": {
                            color: "#ffffff",
                          },
                          "& .MuiSvgIcon-root": {
                            color: "#9077F6",
                          },
                        }}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.side}</TableCell>
                    <TableCell align="left">{row.group}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.table}</TableCell>
                    <TableCell align="left">
                      {" "}
                      {row.invitation && (
                        <div className={classes.invitation}>
                          {" "}
                          <CheckCircleOutlineOutlinedIcon fontSize="small" />{" "}
                          <span>sent</span>
                        </div>
                      )}
                        {!row.invitation && (
                        <div className={classes.invitation}>
                          {" "}
                          {/* <CheckCircleOutlineOutlinedIcon fontSize="small" />{" "} */}
                          <span>Not sent yet</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {row.attending!==0 &&<div className={classes.invitation}>
                        {" "}
                        <CheckCircleOutlineOutlinedIcon
                          sx={{
                            color:  "#009317",
                          }}
                          fontSize="small"
                        />{" "}
                        <span 
                          style={{
                            color: "#009317",
  
                          }}
                        >
                          {row.attending}
                        </span>
                      </div>}
                       {row.attending===0 &&<div className={classes.invitation}>
                          {row.status ==="notAttending" ? "Not Attending" : "Not Replied"}
                      </div>}
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <div className={classes.actions}>
                        <Tooltip title="Send Invitation">
                          <ForwardToInboxOutlinedIcon
                            fontSize="small"
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              console.log("send");
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteOutlineOutlinedIcon
                            fontSize="small"
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              console.log("delte");
                            }}
                          />
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]} //5 10 25
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}

export default EnhancedTable;
