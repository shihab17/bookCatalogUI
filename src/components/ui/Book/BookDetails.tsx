/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../../../redux/api/apiSlice";

const BookDetails = () => {
    const param = useParams();
    console.log("🚀 ~ file: BookDetails.tsx:5 ~ BookDetails ~ param:", param.id)
    const {data, isLoading} = useSingleBookQuery(param.id!);
    console.log("🚀 ~ file: BookDetails.tsx:8 ~ BookDetails ~ data:", isLoading, data?.data)
  return <div><h1>Details Page</h1></div>;
};

export default BookDetails;
