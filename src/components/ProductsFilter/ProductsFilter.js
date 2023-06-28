import React, { useRef } from "react";
import useOutSideClick from "../../hooks/useOutSideClick";
import "./ProductsFilter.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

export default function ProductsFilter(props) {
    const [openFilterDrop, setOpenFilterDrop] = React.useState(false);
    const menuRef = useRef();

    function filterDropDownHandler() {
        setOpenFilterDrop(prev => !prev);
    };

    useOutSideClick(menuRef, filterDropDownHandler, openFilterDrop);

    return (
        <div>
            <div className={`large-flex ${openFilterDrop || props.title != 'Brand' && props.title != 'Category' && props.title != "Sort" && props.title != null
                ? "open-down" : ""}`}
                onClick={filterDropDownHandler}
                ref={menuRef}>
                <p>{props.title === null ? props.defaultTitle : props.title}</p>

                {
                    openFilterDrop ?
                        <span className="arrow-span">
                            <RiArrowDropUpLine
                                className="down-arrow" /> </span> :
                        <span className="arrow-span"> <RiArrowDropDownLine
                            className="down-arrow" />
                        </span>
                }
            </div>
            {
                openFilterDrop &&
                <>
                    {props.filterDropdown}
                </>
            }
        </div>

    )
};