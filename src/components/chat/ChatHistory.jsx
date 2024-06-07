import "../../style/chat/ChatHistory.scss";

import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Examples } from "../../utils";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

function ChatHistory() {
  const [open, cycleOpen] = useCycle(false, true);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  return (
    <main className="chat-history-container">
      <AnimatePresence>
        {!open && (
          <div className="btn-container" onClick={cycleOpen}>
            <div className="openbtn">
              <HiPlus />
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
        )}

        {open && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: 300,
            }}
            exit={{
              width: 0,
              transition: { delay: 0.5, duration: 0.5 },
            }}
          >
            <div className="NewChatContainer">
              <button className="NewChat">
                <span style={{ fontSize: "20px" }}>+</span> New Chat
              </button>
              <span onClick={cycleOpen}>
                <MdKeyboardDoubleArrowLeft />
              </span>
            </div>

            <motion.div
              className="container"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              {Examples.map(({ question, to, id }) => (
                <motion.a
                  key={id}
                  href={to}
                  whileHover={{ scale: 1.1 }}
                  variants={itemVariants}
                >
                  {truncateText(question, 30)}
                </motion.a>
              ))}
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}

export default ChatHistory