import "./logger";
import { logger } from "./logger";
import { launcher } from "./server/server";
import { loadData } from "./service/data/dataLoaderService";

(async () => {
  await loadData();
  await launcher();
  await logger.info("ready");
  console.log("ready");
})();
