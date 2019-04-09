import {Action} from "@ngrx/store";
import {ILoggerProcess} from "@libcomm/services/logger";
import {EActionProcess} from "./types";

export function logAction(log: Function, action: Action, logger: ILoggerProcess) {

    logger.log(log, [EActionProcess.PROCESS], `%c{color:#fa0} DISPATCH`, action);


  return action;
}
