import classes from "./Filters.module.css";
import { Select } from "@mantine/core";
import { TextInput } from "@mantine/core";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import React, { useState } from "react";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Button } from "@mantine/core";
const Filters = ({ onFilterChange }) => {
  const [attending, setAttending] = useState("all");
  const [side, setSide] = useState("all");
  const [group, setGroup] = useState("all");

  const handleAttendingChange = (value) => {
    const filtersMap = new Map([
      ["attending", value],
      ["side", side],
      ["group", group],
    ]);
    onFilterChange(filtersMap);
    setAttending(value);
  };
  const handleSideChange = (value) => {
    const filtersMap = new Map([
      ["attending", attending],
      ["side", value],
      ["group", group],
    ]);
    onFilterChange(filtersMap);
    setSide(value);
  };
  const handleGroupChange = (value) => {
    const filtersMap = new Map([
      ["attending", attending],
      ["side", side],
      ["group", value],
    ]);
    onFilterChange(filtersMap);
    setGroup(value);
  };

  const resetFilters = () => {
    const filtersMap = new Map([
      ["attending", "all"],
      ["side", "all"],
      ["group", "all"],
    ]);
    onFilterChange(filtersMap);
    setAttending("all");
    setSide("all");
    setGroup("all");
  };
  
  return (
    <div className={classes.filtering}>
      <div className={classes.filterMainTitle}>
        <TuneIcon /> <span>Filter by: </span>
      </div>
      <div className={classes.inputs}>
        <div className={classes.input}>
          <span className={classes.inputTitle}>Attending</span>
          <Select
            // label="Edge Type"
            placeholder="All"
            styles={{
              label: { color: "#e0e0e0" },
            }}
            radius="xl"
            size="xs"
            value={attending}
            onChange={handleAttendingChange}
            // value={form.values.edgeType}
            // onChange={(value) =>
            // //   form.setFieldValue("edgeType", value.toLowerCase())
            // }
            // data={[
            //   { label: "All", value: "all" },
            //   { label: "Retweet", value: "retweet" },
            //   { label: "Quote", value: "quote" },
            // ]}
            data={[
              { label: "All", value: "all" },
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
              { label: "6", value: "6" },
            ]}
          />
        </div>
        <div className={classes.input}>
          <span className={classes.inputTitle}>Side</span>
          <Select
            // label="Edge Type"
            placeholder="All"
            styles={{
              label: { color: "#e0e0e0" },
            }}
            radius="xl"
            size="xs"
            value={side}
            onChange={handleSideChange}
            // value={form.values.edgeType}
            // onChange={(value) =>
            // //   form.setFieldValue("edgeType", value.toLowerCase())
            // }
            // data={[
            //   { label: "All", value: "all" },
            //   { label: "Retweet", value: "retweet" },
            //   { label: "Quote", value: "quote" },
            // ]}
            data={[
              { label: "All", value: "all" },
              { label: "Bride and Groom", value: "brideAndGroom" },
              { label: "Bride", value: "bride" },
              { label: "Groom", value: "groom" },
            ]}
          />
        </div>
        <div className={classes.input}>
          <span className={classes.inputTitle}>Group</span>
          <Select
            // label="Edge Type"
            placeholder="All"
            styles={{
              label: { color: "#e0e0e0" },
            }}
            radius="xl"
            size="xs"
            value={group}
            onChange={handleGroupChange}
            // value={form.values.edgeType}
            // onChange={(value) =>
            // //   form.setFieldValue("edgeType", value.toLowerCase())
            // }
            // data={[
            //   { label: "All", value: "all" },
            //   { label: "Retweet", value: "retweet" },
            //   { label: "Quote", value: "quote" },
            // ]}
            data={[
              { label: "All", value: "all" },
              { label: "Family", value: "family" },
              { label: "Friends", value: "friends" },
              { label: "Work", value: "work" },
            ]}
          />
        </div>
        <div className={classes.input + " " + classes.search}>
          <TextInput
            size="xs"
            radius="xl"
            placeholder="Search"
            icon={<SearchIcon size={14} />}
          />
        </div>
        <div className={classes.input+ " " +classes.clearBtn}>
          <Button
            size="xs"
            color="grape"
            radius="xl"
            styles={(theme) => ({
              root: {
                backgroundColor: "#5f41d9",
                border: 0,
                "&:not([data-disabled])": theme.fn.hover({
                  backgroundColor: theme.fn.darken("#5f41d9", 0.05),
                }),
              },

             
            })}
            onClick={resetFilters}
          >
            <FilterAltOffIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
