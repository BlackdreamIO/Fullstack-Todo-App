
export { DropDownMenu } from './dropDownMenu';
export { DropDownHeader } from './dropDownHeader';
export { DropDownContent } from './dropDownContent';

// calculate the x and y position so that element doesnt get out of bound
export const getCalculatedPosition = (value, threashold=375, minusOffset=120) => {
    const calculatedAxis =  value < threashold ? value : value - minusOffset;
    return calculatedAxis;
}
