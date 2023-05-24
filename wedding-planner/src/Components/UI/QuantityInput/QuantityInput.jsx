import { useRef, useState,useEffect } from "react";
import {
  createStyles,
  NumberInput,
  NumberInputHandlers,
  ActionIcon,
  rem,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { ChevronUp, ChevronDown } from "tabler-icons-react";
const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${rem(6)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,

    "&:focus-within": {
      borderColor: theme.colors[theme.primaryColor][6],
    },
  },

  control: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3]
    }`,

    "&:disabled": {
      borderColor:
        theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[3],
      opacity: 0.8,
      backgroundColor: "transparent",
    },
  },

  input: {
    textAlign: "center",
    paddingRight: `${theme.spacing.sm} !important`,
    paddingLeft: `${theme.spacing.sm} !important`,
    height: rem(28),
    flex: 1,
  },
}));

function QuantityInput({ min = 1, max = 10, handleChange }) {
 console.log(typeof max)
  const { classes } = useStyles();
  const handlers = useRef(null);
  // let value=Number(max);
  const[value,setValue]=useState(Number(max))
  useEffect(()=>{
    setValue(Number(max))
  },[max])

  const handleInternalChange=(value) =>{
    setValue(value)
    handleChange(value)
  }

  return (
    <div  className={classes.wrapper}>
      <ActionIcon
        size={28}
        variant="transparent"
        onClick={() => handlers.current?.decrement()}
        disabled={value === min}
        onMouseDown={(event) => event.preventDefault()}
      >
        <ChevronDown size={30} strokeWidth={2}  />
      </ActionIcon>

      <NumberInput
        variant="unstyled"
        
        min={min}
        max={max}
        handlersRef={handlers}
        value={value}
        onChange={handleInternalChange}
        classNames={{ input: classes.input }}
      />

      <ActionIcon
        size={28}
        variant="transparent"
        onClick={() => handlers.current?.increment()}
        disabled={value === Number(max)}
        onMouseDown={(event) => event.preventDefault()}
      >
        <ChevronUp size={30} strokeWidth={2}  />
      </ActionIcon>
    </div>
  );
}

export { QuantityInput };
