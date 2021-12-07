import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function useUser() {

    const context = useContext(UserContext);

    return context;
}
