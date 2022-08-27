// import nodefetch from "node-fetch";
import webpack from "webpack";
import { query } from "./typing";
const address = "http://demo.vimjs.com:10006/api/builds/create?";
const PluginName = "BuildsWebpackPlugin";
import https from "http";
/**
 * 插件-打包完请求
 * @see http://demo.vimjs.com:10006
 * */
class BuildsWebpackPlugin {
    email: string;
    content: string;
    fn: () => Promise<void>;
    constructor(param: query) {
        this.content = param.content;
        this.email = param.email;
        this.fn = param.fn;
    }
    apply(compiler: webpack.Compiler) {
        compiler.hooks.done.tapAsync(PluginName, async a => {
            if (this.fn) {
                await this.fn();
                return;
            }
            const req = https.request(
                `${address}email=${this.email}&content=${this.content}`,
                res => {
                    console.log(`状态码: ${JSON.stringify(res.statusMessage)}`);

                    res.on("data", (d: Buffer) => {
                        console.log(d.toString());
                    });
                }
            );

            req.on("error", error => {
                console.log("error");
            });

            req.end();
        });
    }
}

export = BuildsWebpackPlugin;
