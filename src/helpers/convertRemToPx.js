const convertRemToPx = (rem, item) => rem * parseFloat(getComputedStyle(item).fontSize);
export default convertRemToPx;
