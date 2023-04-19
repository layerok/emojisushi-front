import { WorkingHours } from "~config/app";

export function formatWorkingHours(workingHours: WorkingHours) {
  return `${workingHours[0][0]}:${"0"
    .concat(workingHours[0][1] + "")
    .slice(-2)} до ${workingHours[1][0]}:${"0"
    .concat(workingHours[1][1] + "")
    .slice(-2)}`;
}
