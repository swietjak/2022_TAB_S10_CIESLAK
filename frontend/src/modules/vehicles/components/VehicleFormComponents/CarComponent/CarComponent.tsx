import React from "react";
import {handleSubmit, handleChange} from './CarComponent.utils';

var BrandValue: string, ModelValue: string, VINValue: string;


const CarComponent = () =>(
    const {
        handleSubmit,
        handleChange
    } = useCarHandle();
);

return(
    <form onSubmit={handleSubmit}>
    <label>Car</label>
    <select value={BrandValue} placeholder={'Brand'} onChange={handleChange}>
        <option value={"Audi"}>Audi</option>
        <option value={"BMW"}>BMW</option>
        <option value={"Opel"}>Opel</option>
    </select>
    <input type="text" value={ModelValue} placeholder={'Model'}/>
    <input type="text" value={VINValue} placeholder={'VIN'}/>
    
  </form>
)

export default CarComponent;