"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./logger");
const logger_1 = require("./logger");
const server_1 = require("./server/server");
const dataLoaderService_1 = require("./service/data/dataLoaderService");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dataLoaderService_1.loadData();
    yield server_1.launcher();
    yield logger_1.logger.info("ready");
    console.log("ready");
}))();
//# sourceMappingURL=index.js.map