import React from 'react';
import SelectSearch from "react-select-search";
import { useRef } from "react";

const Select = ({onChange}) => {
    const searchInput = useRef();
    const options = [
                { name: "Test Collection 1", value: "Test Collection 1" },
                { name: "Test Collection 2", value: "Test Collection 2" },
                { name: "Test Collection 3", value: "Test Collection 3" },
                { name: "Test Collection 4", value: "Test Collection 4" },
                { name: "Test Collection 5", value: "Test Collection 5" }
    ];

    const handleFilter = (items) => {
        return (searchValue) => {
            if (searchValue.length === 0) {
                return options;
            }
            return items.filter((item) => {
                return item.name.toLowerCase().includes(searchValue.toLowerCase());
            })
        };
    };

    return (
            <SelectSearch
                ref={searchInput}
                options={options}
                filterOptions={handleFilter}
                value=""
                name="Workshop"
                placeholder="Choose a collection"
                search
                onChange={onChange}
            />
    );
};

export default Select