import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function flipOneZero(number: 0 | 1) {
    // 0 or 1
    const normalized = number - 0.5; // 0--> -0.5     1--> 0.5
    const flipped = normalized * -1; //    0.5           -0.5
    return flipped + 0.5 as 0 | 1;
}
function insertOrPop(arr: string[], elem: string) {
    if (arr.includes(elem)) {
        return arr.filter(e => e !== elem);
    } else {
        arr.push(elem);
        return arr;
    }
}

const initialSearch: {
    searchVal: string,
    sortAlphabetically: 1 | -1,
    sortByDate: 1 | -1,
    selectedSorter: "alphabetical" | "date",
    posFilter: string[],
    nrFilter: 0 | 1,
    tagsFilter: string[],
    diaFilter: string[],
    memoFilter: string[],
    thisSearchWasDone: boolean
} = {
    searchVal: "",
    sortAlphabetically: 1,
    sortByDate: -1,
    selectedSorter: "date",
    posFilter: [],
    nrFilter: 0,
    tagsFilter: [],
    diaFilter: [],
    memoFilter: [],
    thisSearchWasDone: false
};

const searchSlice = createSlice({
    name: 'search',
    initialState: initialSearch,
    reducers: {
        clearSearch(state) {
            state.searchVal = "";
            state.sortAlphabetically = 1;
            state.sortByDate = -1;
            state.selectedSorter = "date";
            state.posFilter = [];
            state.nrFilter = 0;
            state.tagsFilter = [];
            state.diaFilter = [];
            state.memoFilter = [];
            state.thisSearchWasDone = false;
        },
        clearSearchValOnly(state) {
            state.searchVal = "";
            state.thisSearchWasDone = false;
        },
        clearMoreFilters(state) {
            state.posFilter = [];
            state.memoFilter = [];
            state.tagsFilter = [];
            state.diaFilter = [];
            state.thisSearchWasDone = false;
        },
        updateSearchVal(state, action: PayloadAction<string>) {
            state.searchVal = action.payload;
            state.thisSearchWasDone = false;
        },
        pressSorter(state, action: PayloadAction<"alphabetical" | "date">) {
            if (state.selectedSorter === "alphabetical") {
                if (action.payload === "alphabetical") state.sortAlphabetically = state.sortAlphabetically * -1 as (1 | -1);
                if (action.payload === "date") state.selectedSorter = "date";
            } else {
                if (action.payload === "date") state.sortByDate = state.sortByDate * -1 as (1 | -1);
                if (action.payload === "alphabetical") state.selectedSorter = "alphabetical";
            }
            state.thisSearchWasDone = false;
        },
        pressNrFilter(state) {
            state.nrFilter = flipOneZero(state.nrFilter);
            state.thisSearchWasDone = false;
        },
        pressOnTag(state, action: PayloadAction<string>) {
            state.tagsFilter = insertOrPop(state.tagsFilter, action.payload);
            state.thisSearchWasDone = false;
        },
        pressOnMemo(state, action: PayloadAction<string>) {
            state.memoFilter = insertOrPop(state.memoFilter, action.payload);
            state.thisSearchWasDone = false;
        },
        pressOnPos(state, action: PayloadAction<string>) {
            state.posFilter = insertOrPop(state.posFilter, action.payload);
            state.thisSearchWasDone = false;
        },
        pressOnDia(state, action: PayloadAction<string>) {
            state.diaFilter = insertOrPop(state.diaFilter, action.payload);
            state.thisSearchWasDone = false;
        },
        markThisSearchAsDone(state) {
            state.thisSearchWasDone = true;
        },
        searchIsStale(state) {
            state.thisSearchWasDone = false;
        }
    }
});

export default searchSlice;