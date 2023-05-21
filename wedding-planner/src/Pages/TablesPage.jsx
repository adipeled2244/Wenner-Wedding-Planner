
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import GetAppIcon from '@mui/icons-material/GetApp';
import Head from "../Components/Head/Head";

const TablesPage=(props)=>{

  const onDownload=()=>{
    console.log("download");
  }
  const onAddTable=()=>{
    console.log("add table");
  }
  
    const headerName = "Tables";
    const buttonsHeader = [
    
      <Button   variant="contained"  key="download" onClick={onDownload}  startIcon={<GetAppIcon />}  size="small" style={{
        borderRadius: 35,
        color: 'black',
        backgroundColor: "white",
        padding: "3px 14px",
        boxShadow: "none",
        border: "1px solid #E7E7EB",
        // overflowX:  "inherit",
    }} >Download CSV </Button>,
      <Button  style={{
        borderRadius: 35,
        color: 'white',
        backgroundColor: "#5F41D9",
        padding: "3px 14px",
        boxShadow: "none",
    }}  variant="contained"  key="add" onClick={onAddTable}  startIcon={<AddIcon/>} size="small">Add table </Button>,
    ];
 

   return  <>
    <Head buttonsHeader={buttonsHeader} headerName={headerName}  />
  </>
}

export default TablesPage;