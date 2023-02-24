import { motion } from "framer-motion";

const BlackOut = ({ app }) => {
    const animationVariants = app?.animations?.blackout?.variants;
    return (
        <motion.div
            key="0"
            variants={animationVariants}
            initial="inactive"
            animate="active"
            exit="inactive"
            className="app-blackout fixed inset-0 bg-black/30" onClick={() => { app.ModalsClose(); app.setSlideMenu(false); }}
        >
        </motion.div >
    )
}

export default BlackOut