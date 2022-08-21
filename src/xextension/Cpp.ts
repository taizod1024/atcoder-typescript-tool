import { acts } from "../AcTsExtension";
import { XExtension } from "../XExtension";
import { xexthelper } from "../XExtensionHelper";

class Cpp implements XExtension {
    // implements

    // prop
    extension = ".cpp";

    // method
    checkLang(): void {
        xexthelper.checkLang("c++", "checker");
    }

    initTask(): void {}

    compileTask(): void {
        xexthelper.compileTask("c++", "compiler", "executor");
    }

    debugTask(): any {
        throw "ERROR: debug is not supported";
    }

    testTask(): any {
        return xexthelper.testTask("c++", "executor");
    }

    submitTask(): void {}
}
export const cpp = new Cpp();
