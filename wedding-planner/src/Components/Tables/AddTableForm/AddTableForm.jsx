import classes from "./AddTableForm.module.css";
import { useContext,useEffect,useState } from "react";
import UserContext from "../../../Store/user-context";
import { toast } from "react-toastify";
import data from "../../../Assets/Constants/Tables";

import TableOption from "../TableOption/TableOption";
import { Carousel } from "@mantine/carousel";
import { useForm } from '@mantine/form';
import { QuantityInput } from '../../UI/QuantityInput/QuantityInput';
import {
  Button,
} from "@mantine/core";
const { toastConfig } = require("../../../Utils/constants");

const AddTableForm = ({onClose}) => {
  const { addTable } = useContext(UserContext);
  const [selectedTable, setSelectedTable] = useState(0)
  const [selectedNumber, setSelectedNumber] = useState(0)
  const form = useForm({
    initialValues: {
      tableTypeId: 1,
      selectedMaxSeats: 1,
    }})

    useEffect(() => {
      handleChangeMaxTable(selectedTable.tableMaxPeople)
      
    }, [selectedTable])

    const handleSelectTable=({tableId,  tableMaxPeople})=>{
      setSelectedTable({tableId, tableMaxPeople})
      form.setFieldValue('tableTypeId',tableId)
    }

    const handleChangeMaxTable=(value)=>{
      setSelectedNumber(value)
      form.setFieldValue('selectedMaxSeats',value)
    }

  const handleSubmitAddTable = async () => {
    const table = form.values;
    onClose();
    try{
      await addTable(table);
       toast.success('Add table successfully!', toastConfig);
   }
     catch(err){
       toast.error('Add table failed!',toastConfig);
     }

  }

  const carouselOptions = data.tables.map((table,index) => {
    const classSelected = selectedTable.tableId===table.id? classes.selected: classes.unselected
    return (
      <div key={index}  >
      <Carousel.Slide size={100} gap={20}  >
        <TableOption
          className={ classSelected}
           onClick={() => handleSelectTable({tableId: table.id, tableMaxPeople: table.tableMaxPeople})}
          size={table.size}
          shape={table.shape}
          maxPeople={table.tableMaxPeople}
          sizeDetails={table.sizeDetails}
        />
      </Carousel.Slide></div>
    );
  });


  return (
    <div>
      <div className={classes.title}>Add Table</div>
      <form onSubmit={form.onSubmit(handleSubmitAddTable)} >
      <div className={classes.internalContainer}>
        <div>Select table type:</div>
        <div className={classes.carousel}>
          <Carousel
            withIndicators
            sx={{maxWidth:400}}
            height={200}
            mx="auto"
            slideSize="33.333333%"
            controlsOffset="xs"
            loop={true}
            align="start"
            
          >
            {carouselOptions}
          </Carousel>
        </div>
        <div className={classes.maxSeats}> <div>Max Seats</div><QuantityInput  max={selectedTable.tableMaxPeople} value={selectedNumber}  handleChange={handleChangeMaxTable}  /></div>
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
