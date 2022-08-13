import { sum } from "utils/sum";
import { appendImgELement } from "utils/appendElement";
import { createPromise } from "utils/primise";
import { getJob } from "utils/getJob";
import "utils/getReactApp";
import "./styles/index.scss";

const num = sum(1, 2);

console.log(num);

// img 图片
const ele = appendImgELement();
document.body.appendChild(ele);

createPromise("小卡车").then((res) => {
  console.log(res, "加油啊！");
});

const jobResult = getJob("小卡车");
console.log(jobResult);
