import { motion } from "framer-motion";
export const fade = { initial: {opacity:0, y:12}, whileInView:{opacity:1,y:0}, viewport:{ once:true, margin:"-10%"}, transition:{ duration:.5} };
export const zoomImg = "transition-transform duration-500 group-hover:scale-[1.03]";

