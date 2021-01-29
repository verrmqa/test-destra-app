const convertPxToRem = (px, item) => px / parseFloat(getComputedStyle(item).fontSize);
export default convertPxToRem;
