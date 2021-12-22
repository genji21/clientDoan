import React from "react";
import { CommonLoading } from "react-loadingg";
import './style.scss'
const ContainerLoading = () => (
  <>
    <div className="modal_overlay ">
      <div className="modal_content">
        <CommonLoading />
      </div>
    </div>
  </>
);
export default ContainerLoading;
