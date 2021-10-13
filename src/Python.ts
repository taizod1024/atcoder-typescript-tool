import * as vscode from 'vscode';
import * as fs from "fs";
import child_process, { ExecFileSyncOptions } from "child_process";
import { actsextension, Lang } from './AcTsExtension';

class Python implements Lang {

    // implements
    checkLang(): void {

        // throw if non-zero returned
        const command = `python --version`;
        const options = { cwd: actsextension.projectpath };
        try {
            child_process.execSync(command, options);
        }
        catch (ex) {
            throw `ERROR: cannot run "${command}"`;
        }
    }

    testLang(debug: boolean): any {
        let child = null;
        if (debug) {
            const launchconfig = {
                name: actsextension.appid,
                type: "python",
                request: "launch",
                program: actsextension.taskfile,
                args: ["<", actsextension.tmptestinfile, ">", actsextension.tmptestoutfile, "2>", actsextension.tmptesterrfile],
                console: "integratedTerminal"
            };
            vscode.debug.startDebugging(actsextension.projectfolder, launchconfig);
        } else {
            const command = `python -u ${actsextension.taskfile} < ${actsextension.tmptestinfile} > ${actsextension.tmptestoutfile} 2> ${actsextension.tmptesterrfile}`;
            const options = {
                cwd: actsextension.projectpath
            };
            child = child_process.exec(command, options);
        }
        return child;
    }
}
export const python = new Python();