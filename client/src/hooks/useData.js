import { useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


export default function useData() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setProducts(Object.values(categoryMap).flat());
        };
        getCategoryMap();
    }, []);

    return { products, setProducts };
}