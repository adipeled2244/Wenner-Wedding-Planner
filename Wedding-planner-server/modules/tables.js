const guests = [
  { id: "1", name: "roee", group: "family", attending: 2, status: "attending" },
  {
    id: "2",
    name: "yaeli",
    group: "family",
    attending: 0,
    status: "notAttending",
  },
  {
    id: "3",
    name: "dana ",
    group: "friends",
    attending: 5,
    status: "attending",
  },
  { id: "4", name: "orly", group: "family", attending: 6, status: "attending" },
  {
    id: "5",
    name: "shira",
    group: "friends",
    attending: 2,
    status: "attending",
  },
];

// const tables = [
//     {tableNumber:1,selectedMaxSeats:2},
//     {tableNumber:2,selectedMaxSeats:7},
//     {tableNumber:3,selectedMaxSeats:8},
//     {tableNumber:4,selectedMaxSeats:2},

// ]

const tables = [
  { tableNumber: 1, selectedMaxSeats: 2 },
  { tableNumber: 2, selectedMaxSeats: 7 },
  { tableNumber: 3, selectedMaxSeats: 6 },
  { tableNumber: 4, selectedMaxSeats: 1 },
];

const assigns = []; /// [{guest:table}]
const tablesRemaining = tables.map((table) => table.tableNumber);

function generateCombinations(array) {
  const result = [];

  function backtrack(start, currentGroup) {
    if (start === array.length) {
      result.push(JSON.parse(JSON.stringify(currentGroup)));
      return;
    }

    const currentElement = array[start];
    currentGroup.push([currentElement]);
    backtrack(start + 1, currentGroup);
    currentGroup.pop();

    for (const subgroup of currentGroup) {
      subgroup.push(currentElement);
      backtrack(start + 1, currentGroup);
      subgroup.pop();
    }
  }

  backtrack(0, []);

  return result;
}

function allocationSuccess(allocations) {
  for (const allocation of allocations) {
    if (allocation.tableId === undefined) {
      return false;
    }
  }
  return true;
}

function getClosetTableId(tables, number, takenTables) {
  tables = tables.filter((table) => !takenTables.includes(table.tableNumber));

  let closestTable = tables[0].tableNumber;
  let closestDifference = Math.abs(number - tables[0].selectedMaxSeats);

  for (let i = 1; i < tables.length; i++) {
    const currentDifference = Math.abs(number - tables[i].selectedMaxSeats);

    if (currentDifference < closestDifference) {
      closestTable = tables[i].tableNumber;
      closestDifference = currentDifference;
    }
  }

  const tableFound = tables.find((table) => table.tableNumber === closestTable);
  if (tableFound.selectedMaxSeats < number) {
    closestTable = undefined;
  }

  return closestTable;
}

function assignSeatsToTablesForGroup(groupGuests, tables) {
  console.log(tables);

  const ids = [...groupGuests.keys()];

  const combinations = generateCombinations(ids);

  combinations.sort((a, b) => a.length - b.length);

  let finalAllocations = [];
  for (const combination of combinations) {
    // from up to down- minimize tables
    let sumTableQuantity = 0;
    let bestAllocation = [];
    for (const tableCombination of combination) {
      takenTables = [];
      for (const guest of tableCombination) {
        sumTableQuantity += groupGuests.get(guest);
      }
      const tableId = getClosetTableId(tables, sumTableQuantity, takenTables);
      takenTables.push(tableId);
      bestAllocation.push({ tableId, tableCombination });
      sumTableQuantity = 0;
    }
    if (allocationSuccess(bestAllocation)) {
      finalAllocations.push(bestAllocation);
      return finalAllocations;
    }
  }

  return finalAllocations;
}
function assignSeatsToTablesForAll(guests, tables) {
  const finalAssigns = [];
  const groups = new Map();
  // only attending guests can be assigned to a table
  guests = guests.filter((guest) => guest.status === "attending");

  // Create a dictionary of groups with their respective guests
  for (const guest of guests) {
    if (!groups.has(guest.group)) {
      groups.set(guest.group, new Map());
    }
    groups.get(guest.group).set(guest.id, guest.attending);
  }

  groups.forEach((value, key) => {
    const groupType = key;
    const groupGuests = groups.get(groupType);
    const assigns = assignSeatsToTablesForGroup(groupGuests, tables);
    finalAssigns.push(assigns);
    const takenTableIds = assigns.flatMap((subArray) =>
      subArray.map((element) => element.tableId)
    );

    tables = tables.filter(
      (table) => !takenTableIds.includes(table.tableNumber)
    );
  });

  //   console.log("assigns",finalAssigns)
  //   console.log(JSON.stringify(finalAssigns, null, 2));

  return finalAssigns;
  // const ids= Array.from(groups['family'].keys())
}
// const final= assignSeatsToTablesForGroup(guests, tables)
// final.forEach(allocation=>{
//     console.log(allocation)

// })

function createMapGuestandTable(assigns) {
  console.log("assigns", JSON.parse(assigns));

  const tableCombinationMap = new Map();

  JSON.parse(assigns).forEach((subArray) => {
    subArray.forEach((combination) => {
      combination.forEach((element) => {
        const { tableId, tableCombination } = element;
        tableCombination.forEach((key) => {
          tableCombinationMap.set(key, tableId);
        });
      });
    });
  });

  return tableCombinationMap;
}

//   assignSeatsToTablesForAll(guests,tables)
//   const res = JSON.stringify(assignSeatsToTablesForAll(guests, tables), null, 2);
//   const mapGuestToTables = createMapGuestandTable(res);
//   console.log("res", mapGuestToTables);
// console.log(extractTableCombinationTableIds(assignSeatsToTablesForAll(guests,tables)))

module.exports = {
  assignSeatsToTablesForAll,
  createMapGuestandTable,
};
