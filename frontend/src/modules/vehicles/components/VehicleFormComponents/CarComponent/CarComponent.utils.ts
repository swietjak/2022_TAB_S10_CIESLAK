import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../store";

export const useCarHandle = () => {
    
    const handleSubmit: any (event: { target: { value: string; }; }) => (
      this.setState({value: event.target.value});
    );
    const handleChange(

    );
  
    return { handleSubmit, handleChange};
  };
  
