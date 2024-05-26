import { IoSearchOutline } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import styles from "../../style/chatHeader.module.scss";

const Comment = () => {
  return (
    <div className={styles.dropdownContent}>
      <div className={styles.subCommentBar}>
        <p>Comments</p>
        <IoMdClose
          style={{
            background: "lightgray",
            padding: "7px",
            borderRadius: "30px",
            position: "absolute",
            top: 5,
            right: 10,
            fontSize: "30px",
          }}
        />
      </div>
      <hr />
      <div className={styles.subCommentBarbody}>
        <div className={styles.subCommentBarbodyInput}>
          <IoSearchOutline className={styles.subSearchBaICons} />
          <input type="text" placeholder="Find any word!" />
          <IoFilterSharp className={styles.subSearchBaICons} />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Comment;
