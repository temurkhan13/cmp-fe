import React from "react";
import Components from "../..";
import { RxCross2 } from "react-icons/rx";
import data from "../../../data";

const Assessments = () => {
  return (
    <div className="assessmentList">
      <header>
        <Components.Feature.Text className="main--bold">
          Assessments
        </Components.Feature.Text>
        <span>
          <RxCross2 />
        </span>
      </header>
      <section>
        <Components.Feature.DropDownList
          name="Q&A Assessments"
          data={data.chat.assessmentQnaData}
        />
        <Components.Feature.DropDownList
          name="Survey"
          data={data.chat.serverData}
          link={true}
        />
        <Components.Feature.DropDownList
          name="Checks / FAQs"
          data={data.chat.faqData}
          link={true}
        />
      </section>
    </div>
  );
};

export default Assessments;
