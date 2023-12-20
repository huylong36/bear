import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { memo } from "react";

const ModuleLoading = memo(() => {
  return <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
    <Spin indicator={<LoadingOutlined spin style={{ fontSize: 100 }} />} />
  </div>
})

export default ModuleLoading;