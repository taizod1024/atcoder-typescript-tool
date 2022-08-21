import * as fs from "fs";
import child_process, { ExecFileSyncOptions } from "child_process";
const path = require("path");
import { acts } from "../AcTsExtension";
import { XExtension } from "../XExtension";
import { xexthelper } from "../XExtensionHelper";

class Java implements XExtension {
    // implements

    // prop
    extension = ".java";

    // method
    checkLang(): void {
        xexthelper.checkLang("java", "checker");
    }

    initTask(): void {
        // rewrite class name to task name
        let text = fs.readFileSync(acts.taskfile).toString();
        text = text.replace(new RegExp("class template", "g"), `class ${acts.task}`);
        fs.writeFileSync(acts.taskfile, text);
    }

    compileTask(): void {
        // replace and rewrite taskfile and tmpexecfile
        const taskfile = acts.taskfile;
        const tmptaskfile = path.normalize(`${acts.tmppath}/Main.java`);
        let text = fs.readFileSync(acts.taskfile).toString();
        text = text.replace(new RegExp(`class ${acts.task}`, "g"), "class Main");
        fs.writeFileSync(tmptaskfile, text);
        acts.taskfile = tmptaskfile;
        acts.tmpexecfile = path.normalize(`${acts.tmppath}/Main.class`);

        try {
            xexthelper.compileTask("java", "compiler", "executor");
        } catch (ex) {
            // rewrite taskfile and execfile
            if (typeof ex === "string" || ex instanceof String) {
                const err = ex.split(tmptaskfile).join(taskfile);
                throw err;
            }
            throw ex;
        }
    }

    debugTask(): any {
        throw "ERROR: debug is not supported";
    }

    testTask(): any {
        return xexthelper.testTask("java", "executor");
    }

    submitTask(): void {
        // replace and rewrite taskfile
        const tmptaskfile = path.normalize(`${acts.tmppath}/Main.java`);
        let text = fs.readFileSync(acts.taskfile).toString();
        text = text.replace(new RegExp(`class ${acts.task}`, "g"), "class Main");
        fs.writeFileSync(tmptaskfile, text);
        acts.taskfile = tmptaskfile;
    }
}
export const java = new Java();
