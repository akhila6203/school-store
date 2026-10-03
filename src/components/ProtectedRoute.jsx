import { Navigate } from "react-router-dom"; import { useEffect } from "react"; import { useStore } from "../context/StoreContext";
export default function ProtectedRoute({children}){const {student,setLoginOpen}=useStore();useEffect(()=>{if(!student)setLoginOpen(true)},[student,setLoginOpen]);return student?children:<Navigate to="/" replace/>}
