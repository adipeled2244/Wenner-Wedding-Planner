import classes from "./Filters.module.css";
import React, { useState } from "react";

import { Select,Button } from "@mantine/core";
import { TextInput } from "@mantine/core";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

const Filters = ({ onFilterChange }) => {
  const [attendingFilter, setAttendingFilter] = useState("all");
  const [sideFilter, setSideFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [search, setSearch] = useState("");

  const attendingDropdownData = [
    { label: "All", value: "all" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
  ];

  const sideDropdownData = [
    { label: "All", value: "all" },
    { label: "Bride and Groom", value: "brideAndGroom" },
    { label: "Bride", value: "bride" },
    { label: "Groom", value: "groom" },
  ];

  const groupDropdownData = [
    { label: "All", value: "all" },
    { label: "Family", value: "family" },
    { label: "Friends", value: "friends" },
    { label: "Work", value: "work" },
  ];

  const handleAttendingFilterChange = (value) => {
    const filtersMap = new Map([
      ["attending", value],
      ["side", sideFilter],
      ["group", groupFilter],
      ["search", search],
    ]);
    onFilterChange(filtersMap);
    setAttendingFilter(value);
  };

  const handleSideFilterChange = (value) => {
    const filtersMap = new Map([
      ["attending", attendingFilter],
      ["side", value],
      ["group", groupFilter],
      ["search", search],
    ]);
    onFilterChange(filtersMap);
    setSideFilter(value);
  };
  const handleGroupFilterChange = (value) => {
    const filtersMap = new Map([
      ["attending", attendingFilter],
      ["side", sideFilter],
      ["group", value],
      ["search", search],
    ]);
    onFilterChange(filtersMap);
    setGroupFilter(value);
  };

  const handleSearchChange = (event) => {
    const filtersMap = new Map([
      ["attending", attendingFilter],
      ["side", sideFilter],
      ["group", groupFilter],
      ["search", event.target.value],
    ]);
    onFilterChange(filtersMap);
    setSearch(event.target.value);
  };

  const resetFiltersAndSearch = () => {
    const filtersMap = new Map([
      ["attending", "all"],
      ["side", "all"],
      ["group", "all"],
      ["search", ""],
    ]);
    onFilterChange(filtersMap);
    setAttendingFilter("all");
    setSideFilter("all");
    setGroupFilter("all");
    setSearch("");
  };

  const attendingDropdown = (
    <div className={classes.input}>
      <span className={classes.inputTitle}>Attending</span>
      <Select
        placeholder="All"
        styles={{
          label: { color: "#e0e0e0" },
        }}
        radius="xl"
        size="xs"
        value={attendingFilter}
        onChange={handleAttendingFilterChange}
        data={attendingDropdownData}
      />
    </div>
  );

  const sideDropdown = (
    <div className={classes.input}>
      <span className={classes.inputTitle}>Side</span>
      <Select
        placeholder="All"
        styles={{
          label: { color: "#e0e0e0" },
        }}
        radius="xl"
        size="xs"
        value={sideFilter}
        onChange={handleSideFilterChange}
        data={sideDropdownData}
      />
    </div>
  );

  const groupDropdown = (
    <div className={classes.input}>
      <span className={classes.inputTitle}>Group</span>
      <Select
        placeholder="All"
        styles={{
          label: { color: "#e0e0e0" },
        }}
        radius="xl"
        size="xs"
        value={groupFilter}
        onChange={handleGroupFilterChange}
        data={groupDropdownData}
      />
    </div>
  );

  const searchInput = (
    <div className={classes.input + " " + classes.search}>
      <TextInput
        size="xs"
        radius="xl"
        placeholder="Search"
        icon={<SearchIcon size={14} />}
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );

  const clearBtn = (
    <div className={classes.input + " " + classes.clearBtn}>
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
        onClick={resetFiltersAndSearch}
      >
        <FilterAltOffIcon />
      </Button>
    </div>
  );

  return (
    <div className={classes.filtering}>
      <div className={classes.filterMainTitle}>
        <TuneIcon /> <span>Filter by: </span>
      </div>
      <div className={classes.inputs}>
        {attendingDropdown}
        {sideDropdown}
        {groupDropdown}
        {searchInput}
        {clearBtn}
      </div>
    </div>
  );
};

export default Filters;
