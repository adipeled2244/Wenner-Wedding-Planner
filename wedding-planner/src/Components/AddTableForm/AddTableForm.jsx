import { Carousel } from "@mantine/carousel";
import data from "../../Assets/Constants/Tables";
import TableOption from "../TableOption/TableOption";
import Card from "../Card/Card";
import classes from "./AddTableForm.module.css";
import { useForm } from '@mantine/form';
import { useState } from "react";
import { QuantityInput } from '../UI/QuantityInput/QuantityInput';
import {
  Button,
} from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import UserContext from "../../Store/user-context";
import { useEffect } from "react";
const AddTableForm = ({onClose}) => {
  const { addTable } = useContext(UserContext);

  // console.log(data);
  const [selectedTable, setSelectedTable] = useState(0)
  const [selectedNumber, setSelectedNumber] = useState(0)
  const form = useForm({
    initialValues: {
      tableTypeId: 1,
      tableMaxPeople: 1,
    }})

    useEffect(() => {
      handleChangeNumber(selectedTable.maxPeople)
      
    }, [selectedTable])

    const handleSelectTable=({tableId, maxPeople})=>{
      // console.log(selectedTable)
      console.log({tableId, maxPeople})
      setSelectedTable({tableId, maxPeople})
      form.setFieldValue('tableTypeId',tableId)
    }

    const handleChangeNumber=(value)=>{
      setSelectedNumber(value)
      form.setFieldValue('tableMaxPeople',value)
      console.log(form.values)
    }

  const handleSubmit = async () => {
    // event.preventDefault();  
    // console.log(form.values.tableMaxPeople)
    // console.log(selectedTable.maxPeople)
    // if(form.values.tableMaxPeople==1){
    //   console.log("1")
    //  handleChangeNumber(selectedTable.maxPeople)
    // }
    const table = form.values;
    console.log(table)
    onClose();
    try{
      await addTable(table);
       toast.success('Add table successfully!', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         });
   }
     catch(err){
       toast.error('Add table failed!', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         });

     }

  }

  const carouselOptions = data.tables.map((table) => {
    const classSelected = selectedTable.tableId===table.id? classes.selected: classes.unselected
    return (
      <div  >
      <Carousel.Slide size={100} gap={20}  >
        <TableOption
          className={ classSelected}
           onClick={() => handleSelectTable({tableId: table.id, maxPeople: table.maxPeople})}
          size={table.size}
          shape={table.shape}
          maxPeople={table.maxPeople}
          sizeDetails={table.sizeDetails}
        />
      </Carousel.Slide></div>
    );
  });
  return (
    <div>
      <div className={classes.title}>Add Table</div>
      <form onSubmit={form.onSubmit(handleSubmit)} >
      <div className={classes.internalContainer}>
        <div>Select table type:</div>
        <div className={classes.carousel}>
          <Carousel
            withIndicators
            sx={{maxWidth:400}}
            height={200}
            mx="auto"
          //  style={{
          //   control:{
          //     '&[data-inactive]':{
          //       opacity:0,
          //       cursor:'default'
          //     }
          //   }
          //  }}
            slideSize="33.333333%"
            // slideGap="xs"
            controlsOffset="xs"
            loop={true}
            align="start"
            
          >
            {carouselOptions}
            {/* ...other slides */}
          </Carousel>
        </div>
        <div className={classes.maxSeats}> <div>Max Seats</div><QuantityInput  max={selectedTable.maxPeople} value={selectedNumber}  handleChange={handleChangeNumber}  /></div>
      </div>
      <div className={classes.btnContainer}>
      <Button
            type="submit"
            mt="md"
            color="grape"
            radius="xl"
            styles={(theme) => ({
              root: {
                backgroundColor: "#5f41d9",
    
                border: 0,
                fontWeight: 220,
               
                "&:not([data-disabled])": theme.fn.hover({
                  backgroundColor: theme.fn.darken("#8069db", 0.05),
                }),
              },

              leftIcon: {
                marginRight: theme.spacing.md,
              },
            })}
          >
            Add
          </Button>
          </div>
     </form>
    </div>
  );
};

export default AddTableForm;
